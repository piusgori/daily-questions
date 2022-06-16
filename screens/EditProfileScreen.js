import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState, useContext } from 'react'
import { TextInput, ActivityIndicator } from 'react-native-paper'
import { AuthenticationContext } from '../services/authentication/authentication-context'

const EditProfileScreen = () => {
  const { isLoading, errors, updateUserCredentials } = useContext(AuthenticationContext);

  const [nameInput, setNameInput] = useState('');
  const [firstTimeLoading, setFirstTimeLoading] = useState(true);

  const submitUpdatedCredentials = () => {
    setFirstTimeLoading(false);
    updateUserCredentials(nameInput);
  }


  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <TextInput onChangeText={(input) => {setNameInput(input)}} value={nameInput} style={styles.input} label='Name' textContentType='name' keyboardType='default' autoCapitalize='words'></TextInput>
        {!firstTimeLoading && !isLoading && !errors && <Text style={[styles.errortext, styles.successText]}>Your name has been updated successfully</Text>}
        {!firstTimeLoading && !isLoading && errors && <Text style={styles.errortext}>{errors}</Text>}
        {!isLoading && <Pressable onPress={submitUpdatedCredentials} android_ripple={{color: '#CCC'}} style={styles.button}><Text style={styles.buttonText}>Update</Text></Pressable>}
        {isLoading && <ActivityIndicator size={30}></ActivityIndicator>}
      </View>
    </View>
  )
}

export default EditProfileScreen;

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
  container: {
    padding: 24,
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5
  },
  errortext: {
    color: 'red',
    marginVertical: 10,
    fontSize: 16,
    fontFamily: 'prata',
    textTransform: 'capitalize'
  },
  successText: {
    color: 'green',
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