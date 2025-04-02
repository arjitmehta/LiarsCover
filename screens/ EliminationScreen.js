import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EliminationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { eliminated, remaining } = route.params;

  const [guess, setGuess] = useState('');
  const [guessMode, setGuessMode] = useState(eliminated.role === 'Mr. White');

  const getCivilianWord = () => {
    const civilian = remaining.find(p => p.role === 'Civilian');
    return civilian?.word?.trim().toLowerCase();
  };

  const getRoleCounts = () => {
    const roles = {
      Civilian: 0,
      Undercover: 0,
      'Mr. White': 0,
    };
    remaining.forEach((p) => roles[p.role]++);
    return roles;
  };

  const checkWinCondition = () => {
    const { Civilian, Undercover, 'Mr. White': white } = getRoleCounts();
    const total = Civilian + Undercover + white;

    if (Undercover === 0 && white === 0) {
      return { winner: 'Civilians' };
    }

    if ((Undercover >= 1 && total <= 2)) {
      return { winner: 'Undercover' };
    }

    if (white === 1 && Undercover === 0 && Civilian === 0) {
      return { winner: 'Mr. White' };
    }

    return null;
  };

  const handleContinue = () => {
    const result = checkWinCondition();

    if (result) {
      navigation.navigate('Winner', {
        winner: result.winner,
      });
    } else {
      navigation.navigate('Game', {
        players: remaining,
      });
    }
  };

  const handleGuessSubmit = () => {
    const correctWord = getCivilianWord();

    if (!guess.trim()) {
      Alert('Enter a word');
      return;
    }

    if (guess.trim().toLowerCase() === correctWord) {
      navigation.navigate('Winner', {
        winner: 'Mr. White',
      });
    } else {
      Alert('Wrong Guess', 'Game will continue...');
      setGuessMode(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eliminated:</Text>
      <Text style={styles.name}>{eliminated.name}</Text>
      <Text style={styles.role}>Role: {eliminated.role}</Text>

      {guessMode ? (
        <>
          <Text style={styles.guessPrompt}>Guess the word to win:</Text>
          <TextInput
            value={guess}
            onChangeText={setGuess}
            placeholder="Enter guess..."
            placeholderTextColor="#888"
            style={styles.input}
          />
          <TouchableOpacity onPress={handleGuessSubmit} style={styles.guessButton}>
            <Text style={styles.buttonText}>Submit Guess</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={handleContinue} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12131a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#aaa',
    marginBottom: 10,
  },
  name: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  role: {
    fontSize: 18,
    color: '#00f0ff',
    marginBottom: 30,
  },
  guessPrompt: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#1e1e2e',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    textAlign: 'center',
    marginBottom: 20,
  },
  guessButton: {
    backgroundColor: '#4e4e70',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#2f2f3f',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderColor: '#ffffff20',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
