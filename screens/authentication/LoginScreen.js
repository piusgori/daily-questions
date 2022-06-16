import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState, useContext } from 'react'
import { baseStyles } from '../../utils/styles';
import { TextInput, ActivityIndicator } from 'react-native-paper';
import { AuthenticationContext } from '../../services/authentication/authentication-context';

const LoginScreen = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState('eye');
  const authenticationContext = useContext(AuthenticationContext);
  const { isLoading, errors, loginHandler } = authenticationContext;

  const onLogin = () => {
    const logProfile = { email: emailInput, password: passwordInput}
    loginHandler(logProfile);
  }

  const changePasswordVisibilityHandler = () => {
    setIsPasswordHidden(!isPasswordHidden);
    if(!isPasswordHidden){
      setIsPasswordVisible('eye');
    } else {
      setIsPasswordVisible('eye-off');
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.inputContainer}>
        <TextInput value={emailInput} onChangeText={(input) => {setEmailInput(input)}} style={styles.input} label='E-Mail' textContentType='emailAddress' keyboardType='email-address' autoCapitalize='none'></TextInput>
        <TextInput value={passwordInput} onChangeText={(input) => {setPasswordInput(input)}} style={styles.input} label='Password' textContentType='password' secureTextEntry={isPasswordHidden} autoCapitalize='none' right={<TextInput.Icon name={isPasswordVisible} onPress={changePasswordVisibilityHandler}></TextInput.Icon>}></TextInput>
        {errors && <Text style={styles.errortext}>{errors}</Text>}
        {!isLoading && <Pressable onPress={onLogin} android_ripple={{color: '#CCC'}} style={styles.button}><Text style={styles.buttonText}>Login</Text></Pressable>}
        {isLoading && <ActivityIndicator size={30}></ActivityIndicator>}
      </View>
    </View>
  )
}

export default LoginScreen;

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