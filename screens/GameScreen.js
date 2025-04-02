import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';


export default function GameScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const initialPlayers = route.params.players;

  const [players, setPlayers] = useState(initialPlayers);
  const [votes, setVotes] = useState({});
  const [voted, setVoted] = useState(false);

  const handleVote = (votedName) => {
    if (voted) return;

    setVotes((prev) => ({
      ...prev,
      [votedName]: (prev[votedName] || 0) + 1,
    }));

    setVoted(true);

    Alert.alert('Vote Registered', `You voted for ${votedName}`);
  };

  const handleReveal = () => {
    const voteCounts = Object.entries(votes);
    if (voteCounts.length === 0) {
      Alert.alert('No votes cast', 'At least one player must vote.');
      return;
    }

    const maxVotes = Math.max(...voteCounts.map(([_, count]) => count));
    const candidates = voteCounts.filter(([_, count]) => count === maxVotes);

    const eliminatedName =
      candidates[Math.floor(Math.random() * candidates.length)][0];

    const eliminatedPlayer = players.find((p) => p.name === eliminatedName);
    const remainingPlayers = players.filter((p) => p.name !== eliminatedName);

    navigation.navigate('Elimination', {
      eliminated: eliminatedPlayer,
      remaining: remainingPlayers,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.playerCard}
      onPress={() => handleVote(item.name)}
      disabled={voted}
    >
      <Text style={styles.playerName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vote for who you think is suspicious</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        numColumns={2}
      />
      <TouchableOpacity style={styles.revealButton} onPress={handleReveal}>
        <Text style={styles.revealText}>Reveal Who's Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12131a',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  list: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerCard: {
    backgroundColor: '#1e1e2e',
    paddingVertical: 20,
    paddingHorizontal: 30,
    margin: 10,
    borderRadius: 10,
    borderColor: '#2a2a3f',
    borderWidth: 1,
    minWidth: 120,
    alignItems: 'center',
  },
  playerName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  revealButton: {
    backgroundColor: '#30304d',
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  revealText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
