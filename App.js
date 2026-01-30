import React, { useEffect } from 'react';
import { useFonts, Jersey25_400Regular } from '@expo-google-fonts/jersey-25';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { initDatabase } from './services/database';

enableScreens();

import Launcher from './assets/PAGE/launcher';
import SelectionBinomage from './assets/PAGE/selection_binomage';
import ReglageLancementBinomage from './assets/PAGE/reglagelancementbinomage';
import RandomBinomage from './assets/PAGE/randombinomage';
import ResultatBinomage from './assets/PAGE/resultatbinomage';
import EndBinomage from './assets/PAGE/end_binomage';
import ReglageAjoutBinomage from './assets/PAGE/reglageajoutbinomage';
import AjoutPersonneBinomage from './assets/PAGE/ajout_personne_binomage';

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Jersey25: Jersey25_400Regular,
  });

  useEffect(() => {
    initDatabase();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Launcher"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Launcher" component={Launcher} />
        <Stack.Screen name="SelectionBinomage" component={SelectionBinomage} />
        <Stack.Screen name="ReglageLancementBinomage" component={ReglageLancementBinomage} />
        <Stack.Screen name="RandomBinomage" component={RandomBinomage} />
        <Stack.Screen name="ResultatBinomage" component={ResultatBinomage} />
        <Stack.Screen name="EndBinomage" component={EndBinomage} />
        <Stack.Screen name="ReglageAjoutBinomage" component={ReglageAjoutBinomage} />
        <Stack.Screen name="AjoutPersonneBinomage" component={AjoutPersonneBinomage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

