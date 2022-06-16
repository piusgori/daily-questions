import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';
import { urls } from '../../utils/backend-urls';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [firstTimeLoading, setFirstTimeLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);


    const saveUser = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@user', jsonValue);
        } catch (e) {
            console.log(e);
        }
    }

    const removeUser = async () => {
        try {
            await AsyncStorage.removeItem('@user');
        } catch (e) {
            console.log(e);
        }
    }

    const loadUser = async () => {
        setFirstTimeLoading(false);
        try {
            const value = await AsyncStorage.getItem('@user');
            if(value !== null){
                setUser(JSON.parse(value));
            } else {
                setUser(null);
            }
            setFirstTimeLoading(false);
        } catch (e) {
            setFirstTimeLoading(false);
        }
    }

    useEffect(() => {
        loadUser();
    }, [])

    const loginHandler = ({ email, password }) => {
        setIsLoading(true);
        setErrors(null);
        if(!email.includes('@')){
            return setErrors('Please provide a valid Email Address');
        }
        fetch(urls.signIn, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, returnSecureToken: true})
        }).then(response => {
            return response.json();
        }).then(responseData => {
            if(responseData.error){
                setIsLoading(false);
                return setErrors(responseData.error.errors[0].message)
            }
            fetch(`${urls.database}/users.json`).then(databaseResponse => {
                return databaseResponse.json();
            }).then(databaseResponseData => {
                if(databaseResponseData.error){
                    setIsLoading(false);
                    return setErrors('An Unhandled error occured');
                }
                const allUsers = [];
                for (const key in databaseResponseData){
                    const userObject = {
                        id: key, 
                        name: databaseResponseData[key].name, 
                        email: databaseResponseData[key].email, 
                        questionsAnswered: databaseResponseData[key].questionsAnswered, 
                        points: databaseResponseData[key].points,
                        token: responseData.idToken
                    }
                    allUsers.push(userObject);
                }
                return allUsers;
            }).then(databaseUsers => {
                const loggedUser = databaseUsers.find((eachUser) => eachUser.email === email);
                setUser(loggedUser);
                saveUser(loggedUser);
                setIsLoading(false);
            }).catch(databaseError => {
                setIsLoading(false);
            })
        })
    }

    const registerHandler = ({ name, email, password, confirmPassword }) => {
        setIsLoading(true);
        setErrors(null);
        if(name.length === 0 ){
            setIsLoading(false);
            return setErrors('Please provide a name');
        } else if(!email.includes('@')){
            setIsLoading(false);
            return setErrors('Please provide a valid Email Address');
        } else if(confirmPassword !== password){
            setIsLoading(false);
            return setErrors('Passwords have to match');
        } 
        fetch(urls.signUp, {
            method: 'POST',
            body: JSON.stringify({email, password, returnSecureToken: true}),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then(responseData => {
            if(responseData.error){
                setIsLoading(false);
                return setErrors(responseData.error.errors[0].message)
            }
            fetch(`${urls.database}/users.json`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, email, questionsAnswered: [], points: 0})
            }).then(databaseResponse => {
                return databaseResponse.json();
            }).then(databaseResponseData => {
                const newUser = {name, email, questionsAnswered: [], points: 0, token: responseData.idToken, id: databaseResponseData.name};
                setUser(newUser);
                saveUser(newUser);
                setIsLoading(false);
            }).catch(databaseErr => {
                setIsLoading(false);
            })
        }).catch(err => {
            setIsLoading(false);
        })
    }

    const updateUserCredentials = (name) => {
        setIsLoading(true);
        setErrors(null);
        if(name.length === 0){
            setIsLoading(false);
            return setErrors('You cannot update to no name!');
        }
        const userToSend = user;
        userToSend.name = name;
        updateUser(user.id, userToSend);
        setIsLoading(false);
    }

    const updateUser = (id, data) => {
        fetch(`${urls.database}/users/${id}.json`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).then(responseData => {
            if(responseData.error){
                setIsLoading(false);
                console.log('error');
                return setErrors('An unexpected error occured')
            }
            setUser(data);
            saveUser(data);
        }).catch(err => {
            console.log(err);
        })
    }

    const logoutHandler = () => {
        setUser(null);
        removeUser();
    }

    const value = {updateUserCredentials, user, isLoading, errors, loginHandler, logoutHandler, registerHandler, firstTimeLoading, updateUser }

    return(
        <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
    )
}