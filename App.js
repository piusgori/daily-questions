import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, View, StatusBar as AndroidBar } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { AuthenticationContextProvider } from './services/authentication/authentication-context';
import OverallNavigation from './navigation/OverallNavigation';
import { QuestionsContextProvider } from './services/questions/questions-context';


export default function App() {
  const [fontsLoaded] = useFonts({
    'anton': require('./assets/fonts/Anton-Regular.ttf'),
    'lobster': require('./assets/fonts/Lobster-Regular.ttf'),
    'prata': require('./assets/fonts/Prata-Regular.ttf')
  })


  if(!fontsLoaded){
    return null;
  }

  return (
    <View style={styles.overallContainer}>
      <AuthenticationContextProvider>
        <QuestionsContextProvider>
          <OverallNavigation></OverallNavigation>
          <StatusBar style="auto" />
        </QuestionsContextProvider>
      </AuthenticationContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  overallContainer: {
    marginTop: Platform.OS === 'android' ? AndroidBar.currentHeight : 30,
    flex: 1,
  }
});
