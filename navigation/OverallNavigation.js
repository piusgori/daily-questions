import React, { useContext, useState } from 'react'
import { AuthenticationContext } from '../services/authentication/authentication-context'
import QuestionsStackNavigation from './QuestionsStackNavigation';
import AuthenticationNavigation from './AuthenticationNavigation';
import AppLoading from 'expo-app-loading';

const OverallNavigation = () => {
    const authenticationContext = useContext(AuthenticationContext);

    const { user, isLoading, firstTimeLoading } = authenticationContext;

    const [delay, setDelay] = useState(true);

    setTimeout(() => {
      setDelay(false)
    }, 3000)

    let whatToDisplay = <AuthenticationNavigation></AuthenticationNavigation>

    if(user){
      whatToDisplay = <QuestionsStackNavigation></QuestionsStackNavigation>
    } else if(!user){
      whatToDisplay = <AuthenticationNavigation></AuthenticationNavigation>
    }

    return (
      <>
        {firstTimeLoading && delay && null}
        {!firstTimeLoading && !delay && whatToDisplay}
      </>
    )
}

export default OverallNavigation;