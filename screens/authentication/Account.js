import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const Account = ({ navigation }) => {
  return (
    <ImageBackground source={require('../../assets/mountain.png')} style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.animationContainer}>
          <LottieView style={styles.animation} autoPlay={true} loop={true} resizeMode='cover' key='animation' source={require('../../assets/welcome-blue.json')}></LottieView>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => {navigation.navigate('LoginScreen')}} android_ripple={{color: '#CCC'}} style={styles.button}><Text style={styles.buttonText}>Login</Text></Pressable>
          <Pressable onPress={() => {navigation.navigate('RegisterScreen')}} android_ripple={{color: '#CCC'}} style={styles.button}><Text style={styles.buttonText}>Register</Text></Pressable>
        </View>
      </View>
    </ImageBackground>
  )
}

export default Account;

const styles = StyleSheet.create({
  animation: {
    width: 150,
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    minWidth: '50%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 10,
    borderRadius: 3,
    elevation: 1,
    backgroundColor: 'blueviolet',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: 'prata',
    fontSize: 15,
    color: 'white'
  },
  container: {
    paddingVertical: 36,
    paddingHorizontal: 24,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: 'white',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rootContainer: {
    padding: 36,
    flex: 1,
    justifyContent: 'center'
  }
})