import { ImageBackground, View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { baseStyles } from '../utils/styles';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { AuthenticationContext } from '../services/authentication/authentication-context';
import { loadInterstitial } from '../utils/adverts';


const SetingsScreen = ({ navigation }) => {
  const authenticationContext = useContext(AuthenticationContext);
  const { logoutHandler } = authenticationContext;
  loadInterstitial();

  const goToHomeHandler = () => {navigation.navigate('HomeTabScreen')}
  const goToProfileHandler = () => {navigation.navigate('Profile')}
  const goToAboutHandler = () => {navigation.navigate('AboutScreen')};

  return (
    <ImageBackground style={styles.background} source={{uri: 'https://cdn.pixabay.com/photo/2020/03/30/14/34/mountains-4984418__340.png'}}>
      <View style={styles.container}>
        <View style={styles.animation}>
          <LottieView style={styles.animatedContainer} autoPlay={true} loop={true} resizeMode='cover' key='animation' source={require('../assets/robot-says-hello.json')}></LottieView>
        </View>
        <View style={styles.optionsMenu}>
          <Pressable onPress={goToHomeHandler} android_ripple={{color: '#CCC'}} style={styles.eachOtpionView}><Ionicons name='home' size={20}></Ionicons><Text style={styles.text}>Home</Text></Pressable>
          <Pressable onPress={goToProfileHandler} android_ripple={{color: '#CCC'}} style={styles.eachOtpionView}><Ionicons name='person' size={20}></Ionicons><Text style={styles.text}>Profile</Text></Pressable>
          <Pressable onPress={goToAboutHandler} android_ripple={{color: '#CCC'}} style={styles.eachOtpionView}><Ionicons name='md-information-circle' size={20}></Ionicons><Text style={styles.text}>About</Text></Pressable>
          <Pressable onPress={logoutHandler} android_ripple={{color: '#CCC'}} style={styles.eachOtpionView}><Ionicons name='md-log-out' size={20}></Ionicons><Text style={styles.text}>Logout</Text></Pressable>
        </View>
      </View>
    </ImageBackground>
  )
}

export default SetingsScreen;


const styles = StyleSheet.create({
  animation: {
    flex: 1,
  },
  animatedContainer: {
    flex: 1,
  },
  background: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: baseStyles.colors.white,
    marginHorizontal: 50,
    marginVertical: 150,
    borderRadius: 10,
    elevation: 5,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  eachOtpionView: {
    marginVertical: 12,
    backgroundColor: baseStyles.colors.backgroundGrey,
    width: '60%',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
  },
  optionsMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: 'prata',
    marginLeft: 12,
  }
})