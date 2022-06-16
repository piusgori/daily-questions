import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import React, { useContext } from 'react';
import Title from './Title';
import { Ionicons } from '@expo/vector-icons';
import { baseStyles } from '../utils/styles';
import { AuthenticationContext } from '../services/authentication/authentication-context';
import { QuestionsContext } from '../services/questions/questions-context';

const Card = ({ question }) => {
    const { user, updateUser } = useContext(AuthenticationContext);
    const { updateQuestion } = useContext(QuestionsContext);

    const validateAnswerHandler = (choicePicked) => {
        if(!user.questionsAnswered){
            if(choicePicked !== question.answer){
                const updatedArrayOfAnsweredQuestions = [];
                updatedArrayOfAnsweredQuestions.push(question.id);
                const updatedUser = {
                    name: user.name,
                    email: user.email,
                    id: user.id,
                    token: user.token,
                    points: user.points,
                    questionsAnswered: updatedArrayOfAnsweredQuestions
                };
                 const updatedQuestion = {
                    id: question.id,
                    position: question.position,
                    question: question.question,
                    choices: question.choices,
                    answer: question.answer,
                    category: question.category,
                    attempts: (question.attempts + 1),
                }
                updateUser(user.id, updatedUser)
                updateQuestion(question.id, updatedQuestion)
                Alert.alert('Wrong', 'You Have picked the wrong answer, You have lost the points for this question');
            } else {
                const updatedArrayOfAnsweredQuestions = [];
                updatedArrayOfAnsweredQuestions.push(question.id);
                const updatedUser = {
                    name: user.name,
                    email: user.email,
                    id: user.id,
                    token: user.token,
                    points: (user.points + 5),
                    questionsAnswered: updatedArrayOfAnsweredQuestions
                };
                 const updatedQuestion = {
                    id: question.id,
                    position: question.position,
                    question: question.question,
                    choices: question.choices,
                    answer: question.answer,
                    category: question.category,
                    attempts: (question.attempts + 1),
                 }
                updateUser(user.id, updatedUser)
                updateQuestion(question.id, updatedQuestion)
                Alert.alert('Congratulations', 'You Have picked the correct answer. You have been awarded 3 points');
            }
        } else {
            const alreadyAnsweredQuestion = user.questionsAnswered.find((answered) => question.id === answered);
            if(alreadyAnsweredQuestion){
                Alert.alert('Already attempted', 'You have already attempted this question. Please attempt another one');
            } else {
                if(choicePicked !== question.answer){
                    const updatedArrayOfAnsweredQuestions = [...user.questionsAnswered, question.id];
                    const updatedUser = {
                        name: user.name,
                        email: user.email,
                        id: user.id,
                        token: user.token,
                        points: user.points,
                        questionsAnswered: updatedArrayOfAnsweredQuestions
                    };
                    const updatedQuestion = {
                        id: question.id,
                        position: question.position,
                        question: question.question,
                        choices: question.choices,
                        answer: question.answer,
                        category: question.category,
                        attempts: (question.attempts + 1),
                    }
                    updateUser(user.id, updatedUser)
                    updateQuestion(question.id, updatedQuestion)
                    Alert.alert('Wrong', 'You Have picked the wrong answer, You have lost the points for this question');
                } else {
                    const updatedArrayOfAnsweredQuestions = [...user.questionsAnswered, question.id];
                    const updatedUser = {
                        name: user.name,
                        email: user.email,
                        id: user.id,
                        token: user.token,
                        points: (user.points + 5),
                        questionsAnswered: updatedArrayOfAnsweredQuestions
                    };
                    const updatedQuestion = {
                        id: question.id,
                        position: question.position,
                        question: question.question,
                        choices: question.choices,
                        answer: question.answer,
                        category: question.category,
                        attempts: (question.attempts + 1),
                    }
                    updateUser(user.id, updatedUser)
                    updateQuestion(question.id, updatedQuestion)
                    Alert.alert('Congratulations', 'You Have picked the correct answer. You have been awarded 3 points');
                }
            }
        }
    }

  return (
    <View style={styles.contentQuestion}>
        <View style={styles.topQuestion}>
            <Title style={styles.title}>{question.question}</Title>
        </View>
        <View style={styles.choices}>
            {question.choices.map((each, index) => {
                const individualValidation = () => {validateAnswerHandler(each.choice);}

                return (
                <Pressable onPress={individualValidation} android_ripple={{color: '#CCC'}} key={index} style={styles.eachChoice}>
                    <Text style={styles.alphabet}>{each.choice}</Text>
                    <Text style={styles.option}>{each.value}</Text>
                </Pressable>
            )})}
        </View>
        <View style={styles.bottomOfQuestions}>
            <View style={styles.attempts}>
                <Ionicons style={styles.eyeIcon} name='eye-outline' size={20}></Ionicons>
                <Text style={styles.attemptNumber}> {question.attempts}</Text>
            </View>
            <Text style={styles.categoryIndicator}>{question.category}</Text>
        </View>  
    </View>
  )
}

export default Card;

const styles = StyleSheet.create({
    alphabet: {
        fontWeight: '800',
        fontSize: 15,
        flex: 1,
    },
    attempts: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    attemptNumber: {
        fontSize: 15,
        fontFamily: 'prata'
    },
    bottomOfQuestions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    categoryIndicator: {
        fontFamily: 'prata'
    },
    choices: {
        width: '100%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentQuestion: {
        maxWidth: '100%',
        padding: 16,
        elevation: 2,
        borderRadius: 3,
        marginVertical: 20,
        backgroundColor: baseStyles.colors.white
    },
    eachChoice: {
        backgroundColor: '#eeeee4',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        elevation: 4,
        marginBottom: 15,
    },
    option: {
        fontSize: 15,
        flex: 5,
        fontFamily: 'prata'
    },
    title: {
        textAlign: 'center'
    },
    topQuestion: {
        height: 150,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
})