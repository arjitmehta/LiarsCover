import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import * as Papa from 'papaparse';

export default function PlayerSetupScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const uploadedFile = route.params?.categoryFile;

  const [players, setPlayers] = useState([{name: ''}]);
  const [roles, setRoles] = useState({
    civilians: 3,
    undercovers: 1,
    mrWhites: 1,
  });

  const handleAddPlayer = () => setPlayers([...players, {name: ''}]);

  const handleChangeName = (text, index) => {
    const newPlayers = [...players];
    newPlayers[index].name = text;
    setPlayers(newPlayers);
  };

  const loadCSV = async () => {
    try {
      let csvData = '';

      if (uploadedFile) {
        const fileUri = uploadedFile.uri;
        csvData = await RNFS.readFile(fileUri, 'utf8');
      } else {
        csvData = [{'word':'mehta','similar':'arjit'},{'word':'mehta1','similar':'arjit1'},{'word':'mehta2','similar':'arjit2'}]
        // const pathIOS = `${RNFS.MainBundlePath}/yourfile.csv`; // iOS
    //     const pathAndroid = `file://default-words.csv`; // Android
    //     // const defaultUri = Asset.fromModule(require('../assets/data/default-words.csv')).uri;
    //     csvData = await RNFS.readFile(pathAndroid,'utf8');
    //     console.log(csvData);
        
      }

    //     const parsed = Papa.parse(csvData, {
    //       header: true,
    //       skipEmptyLines: true,
    //     });

        return csvData;
    } catch (error) {
      console.error('Error reading CSV:', error);
      Alert.alert('CSV Error', 'Failed to load word list.');
      return [];
    }
  };

  const handleContinue = async () => {
    const nameList = players.map(p => p.name.trim()).filter(Boolean);
    const totalRoles = roles.civilians + roles.undercovers + roles.mrWhites;

    if (nameList.length < totalRoles) {
      Alert.alert(
        'Too Few Players',
        `You need at least ${totalRoles} named players.`,
      );
      return;
    }

    const words = await loadCSV();
    if (words.length === 0) return;
    console.log('words --- ',words);
    
    navigation.navigate('RoleAssignment', {
      players: nameList,
      roles,
      words,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Enter Player Names</Text>

      {players.map((player, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Player ${index + 1}`}
          value={player.name}
          onChangeText={text => handleChangeName(text, index)}
        />
      ))}

      <TouchableOpacity onPress={handleAddPlayer} style={styles.addButton}>
        <Text style={styles.addText}>+ Add Player</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Set Roles</Text>
      {['civilians', 'undercovers', 'mrWhites'].map(role => (
        <View key={role} style={styles.roleRow}>
          <Text style={styles.roleLabel}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Text>
          <TextInput
            style={styles.roleInput}
            keyboardType="number-pad"
            value={roles[role].toString()}
            onChangeText={text =>
              setRoles({...roles, [role]: parseInt(text || '0')})
            }
          />
        </View>
      ))}

      <TouchableOpacity onPress={handleContinue} style={styles.startButton}>
        <Text style={styles.startText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#12131a',
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#1e1e2e',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#282838',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 10,
  },
  addText: {
    color: '#aaa',
  },
  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e1e2e',
    borderRadius: 8,
    marginBottom: 10,
    padding: 12,
  },
  roleLabel: {
    color: '#fff',
    fontSize: 16,
  },
  roleInput: {
    color: '#fff',
    backgroundColor: '#2a2a3b',
    paddingHorizontal: 10,
    borderRadius: 6,
    width: 60,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#3a3a5e',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  startText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
