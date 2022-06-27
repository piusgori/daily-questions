import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Title from '../components/Title';

const AboutScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <Title style={styles.title}>About This App</Title>
      <Text style={styles.text}>Challenge your thinking with a number of questions we have provided for you. Questions are divided into categories to answer the category you like and know best. With this application, you can gain more knowledge as well as earning points</Text>
      <Title style={styles.title}>Terms</Title>
      <Text style={[styles.text, styles.textMargin]}>1. Each question when correctly answered awards you 5 points</Text>
      <Text style={[styles.text, styles.textMargin]}>2. You can only attempt a question once. If you provide the wrong answer you will not be awarded</Text>
      <Text style={[styles.text, styles.textMargin]}>3. The points awarded can be withdrawn. $1 is equivalent to 1000 points. However, withdrawal request cannot be made until you have a minimum of 5000 points</Text>
      <Text style={[styles.text, styles.textMargin]}>4. Withdrawal requests are made via paypal. therefore, it is required that you have a paypal account for you to request withdrawal</Text>
      <Text style={[styles.text, styles.textMargin]}>5. While making a withdrawal request, you will be redirected to the paypal request withdrawal page where you will request the from <Title>dbstudioinc@gmail.com</Title> and the amount is the equivalent to the points you have earned. Your request will be reviewed for up to 12 hours</Text>
      <Text style={[styles.text, styles.textMargin]}>6. Notice that if you enter the wrong email and/or amount you will lose all you points besides not getting rewarded.</Text>
      <Text style={[styles.text, styles.textMargin]}>7. Once you make a request your points and questions are reset.</Text>
    </View>
  )
}

export default AboutScreen;

const styles = StyleSheet.create({

  rootContainer: {
    flex: 1,
    padding: 36,
  },
  text: {
    fontSize: 16,
    fontFamily: 'prata'
  },
  textMargin: {
    marginVertical: 5
  },
  title: {
    textAlign: 'center'
  },
})