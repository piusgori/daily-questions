import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import CategoriesScreen from '../screens/CategoriesScreen';
import SettingsScreen from '../screens/SetingsScreen';

const GeneralNavigation = () => {
    const BottomTab = createBottomTabNavigator();

  return (
        <BottomTab.Navigator screenOptions={{
            tabBarActiveTintColor: 'green',
            tabBarLabelStyle: {marginBottom: 2, fontFamily: 'prata', fontSize: 13},
            headerTitleStyle: {fontFamily: 'lobster', fontSize: 24}
        }}>
            <BottomTab.Screen 
            name='HomeTabScreen' 
            component={HomeScreen}
            options={{
                title: 'Home',
                tabBarIcon: ({ color, size }) => {
                    return (
                        <Ionicons name='home' color={color} size={size}></Ionicons>
                    )
                }
            }}
            >
            </BottomTab.Screen>
            <BottomTab.Screen
            name='CategoriesTabScreen'
            component={CategoriesScreen}
            options={{
                title: 'Categories',
                tabBarIcon: ({ color, size }) => {
                    return (
                        <Ionicons name='options' color={color} size={size}></Ionicons>
                    )
                }
            }}
            >
            </BottomTab.Screen>
            <BottomTab.Screen
            name='SettingsTabScreen'
            component={SettingsScreen}
            options={{
                title: 'Settings',
                tabBarIcon: ({ color, size }) => {
                    return (
                        <Ionicons name='settings' color={color} size={size}></Ionicons>
                    )
                }
            }}
            >
            </BottomTab.Screen>
        </BottomTab.Navigator>
      
  )
}

export default GeneralNavigation