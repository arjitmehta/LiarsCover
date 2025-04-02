import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import PlayerSetupScreen from './screens/PlayerSetupScreen';
import RoleAssignmentScreen from './screens/RoleAssignmentScreen';
import GameScreen from './screens/GameScreen';
import EliminationScreen from './screens/ EliminationScreen';
import WinnerScreen from './screens/WinnerScreen';
import RNFS from 'react-native-file-access';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PlayerSetup" component={PlayerSetupScreen} />
        <Stack.Screen name="RoleAssignment" component={RoleAssignmentScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Elimination" component={EliminationScreen} />
        <Stack.Screen name="Winner" component={WinnerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}