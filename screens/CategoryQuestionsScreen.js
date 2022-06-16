import { View, StyleSheet, FlatList } from 'react-native'
import React, { useLayoutEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import Card from '../components/Card';
import Title from '../components/Title';
import { QuestionsContext } from '../services/questions/questions-context';
import LottieView from 'lottie-react-native';

const CategoryQuestionsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { isLoading, getQuestions, errors, questions } = useContext(QuestionsContext);

  useLayoutEffect(() => {
    navigation.setOptions({title: route.params.categoryName});
    getQuestions();
  }, []);

  const categoryQuestions = questions.filter((question) => question.category === route.params.categoryName);
  const keyExtract = (item) => (item.id);
  const showQuestions = (itemData) => (<Card question={itemData.item}></Card>);

  return (
    <View style={styles.rootContainer}>
      {isLoading && <View style={styles.animationContainer}>
          <LottieView style={styles.animation} autoPlay={true} loop={true} resizeMode='cover' key='animation' source={require('../assets/loading.json')}></LottieView>
      </View>}
      {!isLoading && categoryQuestions.length === 0 && <Title>There are no questions for this category yet</Title>}
      {!isLoading && categoryQuestions.length > 0 && <FlatList
        data={categoryQuestions}
        keyExtractor={keyExtract}
        renderItem={showQuestions}
        showsVerticalScrollIndicator={false}
      ></FlatList>}
    </View>
  )
}

export default CategoryQuestionsScreen;

const styles = StyleSheet.create({
  animation: {
    width: 150,
    height: 150,
  },
  animationContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      marginTop: 36
  },
  rootContainer: {
    marginVertical: 24,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  }
})