import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [categoryFile, setCategoryFile] = useState(null);

  const handleFilePick = async () => {
    try {
      const result = await RNFS.pickFile();
      if (result) {
        setCategoryFile(result);
        console.log('File selected:', result);
      }
    } catch (error) {
      console.error('File pick error:', error);
    }
  };

  const goToPlayerSetup = () => {
    navigation.navigate('PlayerSetup', {
      categoryFile,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to LiarsCover</Text>

      <TouchableOpacity style={styles.button} onPress={goToPlayerSetup}>
        <Text style={styles.buttonText}>Start New Game</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleFilePick}>
        <Text style={styles.buttonText}>Upload Word CSV</Text>
      </TouchableOpacity>

      {categoryFile && (
        <View style={styles.fileInfo}>
          <Text style={styles.fileText}>File: {categoryFile.name}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#12131a',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#2f2f3f',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ffffff20',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  fileInfo: {
    marginTop: 20,
  },
  fileText: {
    color: '#aaa',
    fontSize: 14,
  },
});
