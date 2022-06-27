import React , { createContext, useContext, useState } from 'react';
import { urls } from '../../utils/backend-urls';
import { AuthenticationContext } from '../authentication/authentication-context';

export const QuestionsContext = createContext();

export const QuestionsContextProvider = ({ children }) => {
    const { user } = useContext(AuthenticationContext);

    const [questions, setQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const [isQuestionsEmpty, setIsQuestionsEmpty] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [catName, setCatName] = useState();

    const getQuestionsOfEachCategory = (categoryName = null) => {
        setCatName(categoryName);
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
            if(theQuestions.length === 0){
                setIsQuestionsEmpty(true);
            } else if(theQuestions.length > 0){
                setIsQuestionsEmpty(false);
            }
            if(!categoryName){
                setIsLoading(false);
                return setAllQuestions(theQuestions);
            }
            const categoryQuestions = theQuestions.filter((categoryQuestion) => categoryQuestion.category === categoryName);
            if(categoryQuestions.length === 0){
                setQuestions(categoryQuestions);
                setIsQuestionsEmpty(true);
            } else if(categoryQuestions.length > 0){
                setIsQuestionsEmpty(false);
                const newArray = [];
                const newSecondArray = categoryQuestions;
                for(const a of user.questionsAnswered){
                    for(const b of categoryQuestions){
                        if(a === b.id){
                            newArray.push(b);
                        }
                    }
                }
                for (const c of newArray){
                    for (const d of newSecondArray){
                        if(c.id === d.id){
                            newSecondArray.splice(newSecondArray.indexOf(d), 1);
                        }
                    }
                }
                setQuestions(newSecondArray);
            }
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            console.log(err);
        })
    }

    const fecthWithoutLoading = (categoryName) => {
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
            if(theQuestions.length === 0){
                setIsQuestionsEmpty(true);
            } else if(theQuestions.length > 0){
                setIsQuestionsEmpty(false);
            }
            if(!categoryName){
                return setAllQuestions(theQuestions);
            }
            const categoryQuestions = theQuestions.filter((categoryQuestion) => categoryQuestion.category === categoryName);
            if(categoryQuestions.length === 0){
                setQuestions(categoryQuestions);
                setIsQuestionsEmpty(true);
            } else if(categoryQuestions.length > 0){
                setIsQuestionsEmpty(false);
                const newArray = [];
                const newSecondArray = categoryQuestions;
                for(const a of user.questionsAnswered){
                    for(const b of categoryQuestions){
                        if(a === b.id){
                            newArray.push(b);
                        }
                    }
                }
                for (const c of newArray){
                    for (const d of newSecondArray){
                        if(c.id === d.id){
                            newSecondArray.splice(newSecondArray.indexOf(d), 1);
                        }
                    }
                }
                setQuestions(newSecondArray);
            }
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
            fecthWithoutLoading(catName);
        }).catch(err => {
            console.log(err);
        })
    }

    const value = { allQuestions, questions, isLoading, errors, updateQuestion, isQuestionsEmpty, getQuestionsOfEachCategory }

    return (
        <QuestionsContext.Provider value={value}>{children}</QuestionsContext.Provider>
    )
}