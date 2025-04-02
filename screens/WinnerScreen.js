import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function WinnerScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { winner } = route.params;

  const handleRestart = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>The winners are...</Text>
      <Text style={styles.winnerText}>{winner}</Text>

      <Text style={styles.subheading}>Thanks for playing!</Text>

      <TouchableOpacity onPress={handleRestart} style={styles.button}>
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12131a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 20,
    color: '#aaa',
    marginBottom: 10,
  },
  winnerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00f0ff',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 40,
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
