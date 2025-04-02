import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Sound from 'react-native-sound';

export default function RoleAssignmentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { players, roles, words } = route.params;

  const [shuffledPlayers, setShuffledPlayers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRole, setShowRole] = useState(false);

  useEffect(() => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    const wordPair = words[Math.floor(Math.random() * words.length)];

    const rolePool = [
      ...Array(roles.civilians).fill({ role: 'Civilian', word: wordPair.word }),
      ...Array(roles.undercovers).fill({ role: 'Undercover', word: wordPair.similar }),
      ...Array(roles.mrWhites).fill({ role: 'Mr. White', word: null }),
    ].sort(() => Math.random() - 0.5);

    const playEliminationSound = () => {
        const eliminationSound = new Sound(require('../assets/sounds/elimination.mp3'), Sound.MAIN_BUNDLE, (error) => {
          if (!error) {
            eliminationSound.play();
          } else {
            console.error('Failed to play sound:', error);
          }
        });
      };

    const playersWithRoles = shuffled.map((name, i) => ({
      name,
      ...rolePool[i],
    }));

    setShuffledPlayers(playersWithRoles);
  }, []);

  const handleNext = () => {
    if (currentIndex + 1 < shuffledPlayers.length) {
      setCurrentIndex(currentIndex + 1);
      setShowRole(false);
    } else {
      navigation.navigate('Game', { players: shuffledPlayers });
    }
  };

  const current = shuffledPlayers[currentIndex];

  if (!current) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.playerName}>{current.name}, it's your turn</Text>

      {!showRole ? (
        <TouchableOpacity onPress={() => setShowRole(true)} style={styles.button}>
          <Text style={styles.buttonText}>Reveal Word</Text>
        </TouchableOpacity>
      ) : (
        <>
          {/* <Text style={styles.revealLabel}>You are:</Text>
          <Text style={styles.roleText}>{current.role}</Text> */}

          {current.word ? (
            <>
              <Text style={styles.revealLabel}>Your word:</Text>
              <Text style={styles.wordText}>{current.word}</Text>
            </>
          ):(
            <>
              <Text style={styles.revealLabel}>Your are:</Text>
              <Text style={styles.wordText}>Mr. White</Text>
            </>
          )}

          <TouchableOpacity onPress={handleNext} style={styles.button}>
            <Text style={styles.buttonText}>
              {currentIndex + 1 === shuffledPlayers.length ? 'Start Game' : 'Next Player'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12131a',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  playerName: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2f2f3f',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  revealLabel: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 20,
  },
  roleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00f0ff',
    marginTop: 5,
  },
  wordText: {
    fontSize: 24,
    color: '#fff',
    marginTop: 5,
    fontStyle: 'italic',
  },
});
