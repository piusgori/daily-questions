import React , { createContext, useState } from 'react';
import { urls } from '../../utils/backend-urls';

export const QuestionsContext = createContext();

export const QuestionsContextProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const getQuestions = () => {
        setIsLoading(true);
        setErrors(null);
        fetch(`${urls.database}/questions.json`).then(response => {
            return response.json();
        }).then(responseData => {
            const receivedQuestions = [];
            for (const key in responseData){
                const questionObject = {
                    id: key,
                    question: responseData[key].question,
                    position: responseData[key].position,
                    attempts: responseData[key].attempts,
                    answer: responseData[key].answer,
                    choices: responseData[key].choices,
                    category: responseData[key].category
                };
                receivedQuestions.push(questionObject);
            }
            return receivedQuestions;
        }).then(theQuestions => {
            setQuestions(theQuestions);
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            console.log(err);
        })
    }

    const fecthWithoutLoading = () => {
        setErrors(null);
        fetch(`${urls.database}/questions.json`).then(response => {
            return response.json();
        }).then(responseData => {
            const receivedQuestions = [];
            for (const key in responseData){
                const questionObject = {
                    id: key,
                    question: responseData[key].question,
                    position: responseData[key].position,
                    attempts: responseData[key].attempts,
                    answer: responseData[key].answer,
                    choices: responseData[key].choices,
                    category: responseData[key].category
                };
                receivedQuestions.push(questionObject);
            }
            return receivedQuestions;
        }).then(theQuestions => {
            setQuestions(theQuestions);
        }).catch(err => {
            console.log(err);
        })
    }

    const updateQuestion = (id, data) => {
        fetch(`${urls.database}/questions/${id}.json`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }).then(response => {
            return response.json();
        }).then(responseData => {
            if(responseData.error){
                console.log('error');
                return setErrors('An Unexpected error occured')
            }
            fecthWithoutLoading();
        }).catch(err => {
            console.log(err);
        })
    }

    const value = { questions, isLoading, errors, getQuestions, updateQuestion }

    return (
        <QuestionsContext.Provider value={value}>{children}</QuestionsContext.Provider>
    )
}