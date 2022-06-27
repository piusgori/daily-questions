
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import GeneralNavigation from './GeneralNavigation';
import CategoryQuestionsScreen from '../screens/CategoryQuestionsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import WithdrawalScreen from '../screens/WithdrawalScreen';
import AboutScreen from '../screens/AboutScreen';
import ExitApp from '../utils/exit-app';
import { loadRewarded } from '../utils/adverts';

const Stack = createNativeStackNavigator();

const QuestionsStackNavigation = () => {

  ExitApp();
  loadRewarded();

  return (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleStyle: {fontFamily: 'lobster', fontSize: 24},
          }}
        >
            <Stack.Screen
                name='HomeScreen'
                component={GeneralNavigation}
                options={{headerShown: false}}
            ></Stack.Screen>
            <Stack.Screen
                name='CategoryQuestions'
                component={CategoryQuestionsScreen}
                
            >
            </Stack.Screen>
            <Stack.Screen
              name='Profile'
              component={ProfileScreen}
            ></Stack.Screen>
            <Stack.Screen
              name='EditProfile'
              component={EditProfileScreen}
              options={{title: 'Edit Profile'}}
            ></Stack.Screen>
            <Stack.Screen
              name='RequestWithdrawal'
              component={WithdrawalScreen}
              options={{title: 'Request Withdrawal'}}
            ></Stack.Screen>
            <Stack.Screen
              name='AboutScreen'
              component={AboutScreen}
              options={{title: 'About'}}
            >
            </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default QuestionsStackNavigation