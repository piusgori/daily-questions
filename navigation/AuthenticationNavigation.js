import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Account from '../screens/authentication/Account';
import LoginScreen from '../screens/authentication/LoginScreen';
import RegisterScreen from '../screens/authentication/RegisterScreen';
import ExitApp from '../utils/exit-app';

const Stack = createNativeStackNavigator();

const AuthenticationNavigation = () => {
    ExitApp();

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name='AccountScreen'
                component={Account}
            ></Stack.Screen>
            <Stack.Screen
                name='LoginScreen'
                component={LoginScreen}
            >
            </Stack.Screen>
            <Stack.Screen
                name='RegisterScreen'
                component={RegisterScreen}
            ></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthenticationNavigation;