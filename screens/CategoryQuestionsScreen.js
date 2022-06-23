import { View, StyleSheet, VirtualizedList } from 'react-native'
import React, { useLayoutEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import Card from '../components/Card';
import Title from '../components/Title';
import { QuestionsContext } from '../services/questions/questions-context';
import LottieView from 'lottie-react-native';
import { loadInterstitial } from '../utils/adverts';

const CategoryQuestionsScreen = ({ route }) => {
  loadInterstitial();
  const navigation = useNavigation();
  const { isLoading, getQuestionsOfEachCategory, isQuestionsEmpty, questions } = useContext(QuestionsContext);

  useLayoutEffect(() => {
    navigation.setOptions({title: route.params.categoryName});
    getQuestionsOfEachCategory(route.params.categoryName);

  }, []);

  const getItem = (data, index) => {return data[index]};
  const keyExtract = (item) => (item.id);
  const showQuestions = (itemData) => (<Card question={itemData.item}></Card>);

  return (
    <View style={styles.rootContainer}>
      {isLoading && <View style={styles.animationContainer}>
          <LottieView style={styles.animation} autoPlay={true} loop={true} resizeMode='cover' key='animation' source={require('../assets/loading.json')}></LottieView>
      </View>}
      {!isLoading && questions.length === 0 && isQuestionsEmpty && <Title>There are no questions for this category yet</Title>}
      {!isLoading && !isQuestionsEmpty && questions.length === 0 && <Title>You have already answered all the questions in this category. We'll add some more soon!</Title>}
      {!isLoading && questions.length > 0 && !isQuestionsEmpty && <VirtualizedList
        data={questions}
        initialNumToRender={2}
        keyExtractor={keyExtract}
        renderItem={showQuestions}
        getItemCount={data => data.length}
        getItem={getItem}
        showsVerticalScrollIndicator={false}
      ></VirtualizedList>}
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