import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState, useContext } from 'react'
import { baseStyles } from '../../utils/styles';
import { TextInput, ActivityIndicator } from 'react-native-paper';
import { AuthenticationContext } from '../../services/authentication/authentication-context';

const RegisterScreen = () => {
  const authenticationContext = useContext(AuthenticationContext);

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState('eye');
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState('eye');
  const { isLoading, errors, registerHandler} = authenticationContext;

  const registrationHandler = () => {
    const newProfile = {name: nameInput, email: emailInput, password: passwordInput, confirmPassword: confirmPasswordInput};
    registerHandler(newProfile);
  }

  const changePasswordVisibilityHandler = () => {
    setIsPasswordHidden(!isPasswordHidden);
    if(!isPasswordHidden){
      setIsPasswordVisible('eye');
    } else {
      setIsPasswordVisible('eye-off');
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
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} label='Name' value={nameInput} onChangeText={(input) => {setNameInput(input)}} textContentType='name' keyboardType='default' autoCapitalize='words'></TextInput>
        <TextInput style={styles.input} label='E-Mail' value={emailInput} onChangeText={(input) => {setEmailInput(input)}} textContentType='emailAddress' keyboardType='email-address' autoCapitalize='none'></TextInput>
        <TextInput style={styles.input} label='New Password' value={passwordInput} onChangeText={(input) => {setPasswordInput(input)}} textContentType='password' secureTextEntry={isPasswordHidden} autoCapitalize='none' right={<TextInput.Icon name={isPasswordVisible} onPress={changePasswordVisibilityHandler}></TextInput.Icon>}></TextInput>
        <TextInput style={styles.input} label='Confirm Password' value={confirmPasswordInput} onChangeText={(input) => {setConfirmPasswordInput(input)}} textContentType='password' secureTextEntry={isConfirmPasswordHidden} autoCapitalize='none' right={<TextInput.Icon name={isConfirmPasswordVisible} onPress={changeConfirmPasswordVisibilityHandler}></TextInput.Icon>}></TextInput>
        {errors && <Text style={styles.errortext}>{errors}</Text>}
        {!isLoading && <Pressable onPress={registrationHandler} android_ripple={{color: '#CCC'}} style={styles.button}><Text style={styles.buttonText}>Register</Text></Pressable>}
        {isLoading && <ActivityIndicator size={30}></ActivityIndicator>}
      </View>
    </View>
  )
}

export default RegisterScreen;

const styles = StyleSheet.create({
  button: {
    marginVertical: 12,
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
  errortext: {
    color: 'red',
    marginVertical: 10,
    fontSize: 16,
    fontFamily: 'prata',
    textTransform: 'capitalize'
  },
  input: {
    marginVertical: 10,
    width: '90%',
  },
  inputContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 5,
    elevation: 4,
    marginTop: 100,
    alignItems: 'center',
  },
  rootContainer: {
    backgroundColor: baseStyles.colors.backgroundGrey,
    padding: 36,
    flex: 1,
  }
})