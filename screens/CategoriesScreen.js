import { Text, StyleSheet, ScrollView, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import { CATEGORIES } from '../utils/categories';
import { baseStyles } from '../utils/styles';
import { useNavigation } from '@react-navigation/native';

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const goToCategoryHandler = (categoryName) => {
    navigation.navigate('CategoryQuestions', {categoryName});
  }

  return (
    <ScrollView contentContainerStyle={styles.rootContainer}>
      {CATEGORIES.map((category, index) => {
        return (
          <Pressable onPress={goToCategoryHandler.bind(this, category.name)} android_ripple={{color: '#ccc'}} key={index} style={({ pressed }) => [styles.background, pressed && styles.pressed]}>
            <ImageBackground style={styles.backgroundImage} source={{uri: category.image}}>
              <Text style={styles.text}>{category.name}</Text>
            </ImageBackground>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  background: {
    height: 300,
    width: '90%',
    marginVertical: 24,
    borderRadius: 10,
    elevation: 5,
    overflow: 'hidden'
  },
  backgroundImage: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  pressed: {
    opacity: 0.65
  },
  rootContainer: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '400',
    fontSize: 20,
    color: baseStyles.colors.white,
    fontFamily: 'anton'
  }
})