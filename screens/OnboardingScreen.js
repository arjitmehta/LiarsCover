import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Sound from 'react-native-sound';
import {useNavigation} from '@react-navigation/native';
// import {LinearGradient} from 'expo-linear-gradient';
import Animated, {FadeInDown} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [bgMusic, setBgMusic] = useState(null);
  const clickSound = useRef(null);

  useEffect(() => {
    const loadSounds = async () => {
      const sound = new Sound(
        require('../assets/sounds/bg-music.mp3'),
        Sound.MAIN_BUNDLE,
        error => {
          if (!error) {
            sound.setNumberOfLoops(-1); // Loop indefinitely
            sound.play();
          } else {
            console.error('Sound loading failed:', error);
          }
        },
      );
    };

    loadSounds();

    return () => {
      bgMusic && bgMusic.unloadAsync();
      clickSound.current && clickSound.current.unloadAsync();
    };
  }, []);

  const handleStart = async () => {
    if (clickSound.current) await clickSound.current.replayAsync();
    bgMusic && (await bgMusic.stopAsync());
    navigation.navigate('Home');
  };

  return (
    <View
      // colors={['#0f0c29', '#302b63', '#24243e']}
      style={styles.container}>
      <View
        // entering={FadeInDown.delay(100).duration(1000)}
        style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')} // Add a logo image in assets
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome Liar</Text>
        <Text style={styles.tagline}>Deceive. Deduce. Survive.</Text>
      </View>

      <View
        // entering={FadeInDown.delay(600).duration(800)}
        style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleStart} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
    backgroundColor: '#000000'
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 18,
    color: '#ccc',
    marginTop: 10,
  },
  buttonContainer: {
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#ffffff10',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ffffff50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
