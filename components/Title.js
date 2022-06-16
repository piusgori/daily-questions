import { Text, StyleSheet } from 'react-native'
import React from 'react'

const Title = ({ children, style }) => {
  return (
    <Text style={[styles.title, style]}>{children}</Text>
  )
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '400',
        marginVertical: 10,
        fontFamily: 'anton',
    }
})