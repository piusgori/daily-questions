import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'

const EditProfileScreen = () => {
  const [isOldPasswordHidden, setIsOldPasswordHidden] = useState(true);
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState('eye');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState('eye');
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState('eye');

  const changePasswordVisibilityHandler = () => {
    setIsPasswordHidden(!isPasswordHidden);
    if(!isPasswordHidden){
      setIsPasswordVisible('eye');
    } else {
      setIsPasswordVisible('eye-off');
    }
  };

  const changeOldPasswordVisibilityHandler = () => {
    setIsOldPasswordHidden(!isOldPasswordHidden);
    if(!isOldPasswordHidden){
      setIsOldPasswordVisible('eye');
    } else {
      setIsOldPasswordVisible('eye-off');
    }
  };

  const changeConfirmPasswordVisibilityHandler = () => {
    setIsConfirmPasswordHidden(!isConfirmPasswordHidden);
    if(!isConfirmPasswordHidden){
      setIsConfirmPasswordVisible('eye')
    } else {
      setIsConfirmPasswordVisible('eye-off');
    }
  }


  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <TextInput style={styles.input} label='Name' textContentType='name' keyboardType='default' autoCapitalize='words'></TextInput>
        <TextInput style={styles.input} label='E-Mail' textContentType='emailAddress' keyboardType='email-address' autoCapitalize='none'></TextInput>
        <TextInput style={styles.input} label='Old Password' textContentType='password' secureTextEntry={isOldPasswordHidden} autoCapitalize='none' right={<TextInput.Icon name={isOldPasswordVisible} onPress={changeOldPasswordVisibilityHandler}></TextInput.Icon>}></TextInput>
        <TextInput style={styles.input} label='New Password' textContentType='password' secureTextEntry={isPasswordHidden} autoCapitalize='none' right={<TextInput.Icon name={isPasswordVisible} onPress={changePasswordVisibilityHandler}></TextInput.Icon>}></TextInput>
        <TextInput style={styles.input} label='Confirm Password' textContentType='password' secureTextEntry={isConfirmPasswordHidden} autoCapitalize='none' right={<TextInput.Icon name={isConfirmPasswordVisible} onPress={changeConfirmPasswordVisibilityHandler}></TextInput.Icon>}></TextInput>
        <Pressable android_ripple={{color: '#CCC'}} style={styles.button}><Text style={styles.buttonText}>Update</Text></Pressable>
      </View>
    </View>
  )
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    width: '60%',
    paddingHorizontal: 24,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blueviolet',
    borderRadius: 5,
    elevation: 2,
  },
  buttonText: {
    fontFamily: 'prata',
    fontSize: 16,
    color: 'white'
  },
  container: {
    padding: 24,
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5
  },
  input: {
    marginVertical: 10,
    width: '80%',
  },
  rootContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 36,
    alignItems: 'center'
  }
})