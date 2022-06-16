import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { TextInput } from 'react-native-paper';
import Title from '../components/Title';

const paymentMethods = ['PayPal', 'PayTm', 'GooglePay', 'International Account Transfer', 'Other Methods']

const WithdrawalScreen = () => {
    const [selectedMethod, setSelectedMethod] = useState('');



  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <Title>You have 155 points which are worth $5</Title>
        <SelectDropdown
            data={paymentMethods}
            defaultButtonText='Select a payment Method'
            buttonStyle={styles.input}
            buttonTextStyle={styles.headerText}
            buttonTextAfterSelection={(selectedItem) => {return selectedItem}}
            onSelect={(selectedItem) => {setSelectedMethod(selectedItem)}}
        ></SelectDropdown>
        <TextInput style={styles.input} label='Payment Information' textContentType='creditCardNumber' keyboardType='default' autoCapitalize='none'></TextInput>
        <Pressable android_ripple={{color: '#CCC'}} style={styles.button}><Text style={styles.buttonText}>Send Request</Text></Pressable>
      </View>
    </View>
  )
}

export default WithdrawalScreen;

const styles =  StyleSheet.create({
    button: {
        marginTop: 12,
        width: '60%',
        paddingHorizontal: 24,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B3CDD8',
        borderRadius: 5,
        elevation: 2,
    },
    buttonText: {
        fontFamily: 'prata',
        fontSize: 16
    },
    container: {
        padding: 24,
        alignItems: 'center',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5
    },
    headerText: {
        fontSize: 16,
        fontFamily: 'prata',
        textAlign: 'left',
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
    },
})