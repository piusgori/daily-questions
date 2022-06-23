import { View, Text, StyleSheet, ScrollView, ImageBackground, Pressable, VirtualizedList } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { CATEGORIES } from '../utils/categories';
import { Ionicons } from '@expo/vector-icons';
import Title from '../components/Title';
import Card from '../components/Card';
import { baseStyles } from '../utils/styles';
import { QuestionsContext } from '../services/questions/questions-context';
import LottieView from 'lottie-react-native';

const HomeScreen = ({ navigation }) => {
    const { allQuestions, isLoading, errors, getQuestions } = useContext(QuestionsContext);

    const keyExtract = (item) => (item.id);
    const getItem = (data, index) => {return data[index]};
    const showQuestions = (itemData) => (<Card question={itemData.item}></Card>);
    const goToCategoriesHandler = () => { navigation.navigate('CategoriesTabScreen') };
    const topCategories = CATEGORIES.filter((category) => CATEGORIES.indexOf(category) < 5);
    const sortbyAttempts = (a, b) => {return parseInt(b.attempts) - parseInt(a.attempts);}
    const popularQuestions = allQuestions.sort(sortbyAttempts);

    useEffect(() => {
        getQuestions();
    }, [])


  return (
    <View style={styles.rootContainer}>
      <ScrollView horizontal style={styles.categoryContainer}>
          {topCategories.map((category, index) => {
              return(
                  <View key={index} style={styles.eachCategoryView}>
                    <Pressable onPress={() => {navigation.navigate('CategoryQuestions', {categoryName: category.name})}} style={({ pressed }) => [styles.categoriesPressable, pressed && styles.pressed]}>
                      <ImageBackground source={{uri: category.image}} style={styles.background}>
                          <Text style={styles.text}>{category.name}</Text>
                      </ImageBackground>
                    </Pressable>
                  </View>
              )
          })}
          <View style={styles.lastContainer}>
              <Pressable onPress={goToCategoriesHandler} android_ripple={{color: '#ccc'}} style={styles.pressable}>
                <Text style={styles.lastText}>All Categories </Text>
                <Ionicons style={styles.icon} name='arrow-forward' size={20}></Ionicons>
              </Pressable>
          </View>
      </ScrollView>
      <View style={styles.questionContainer}>
          <Title style={styles.title}>Popular Questions</Title>
          <View style={styles.questionsView}>
            {isLoading && <View style={styles.animationContainer}>
                    <LottieView style={styles.animation} autoPlay={true} loop={true} resizeMode='cover' key='animation' source={require('../assets/loading.json')}></LottieView>
                </View>}
                {!isLoading && <VirtualizedList
                    data={popularQuestions}
                    initialNumToRender={2}
                    keyExtractor={keyExtract}
                    renderItem={showQuestions}
                    getItemCount={data => data.length}
                    getItem={getItem}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Title>There are questions added yet</Title>}
                >
                </VirtualizedList>}
          </View>
      </View>
    </View>
  )
}

export default HomeScreen;

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
    },
    background: {
        height: '100%',
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryContainer: {
        flex: 1,
        paddingBottom: 20,
    },
    categoriesPressable: {
        height: '100%',
        widht: '100%'
    },
    eachCategoryView: {
        height: '100%',
        width: 200,
        elevation: 5,
        borderRadius: 15,
        overflow: 'hidden',
        marginRight: 20
    },
    icon: {
        marginTop: 5
    },
    lastContainer: {
        height: '100%',
        width: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lastText: {
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'anton'
    },
    pressable: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: baseStyles.colors.white
    },
    pressed: {
        opacity: 0.65,
    },
    questionContainer: {
        flex: 3
    },
    questionsView: {
        flex: 1,
        marginVertical: 5,
        alignItems: 'center'
    },
    rootContainer: {
        padding: 20,
        flex: 1,
        backgroundColor: baseStyles.colors.backgroundGrey,
    },
    text: {
        fontSize: 18,
        fontWeight: '400',
        color: 'white',
        fontFamily: 'anton'
    },
    title: {
        textAlign: 'center'
    },
})