import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './Login Stack/SplashScreen'
import LoginScreen from './Login Stack/LoginScreen'

const RootStack = createStackNavigator();

const config = () => {
    return(
        <NavigationContainer>
        <RootStack.Navigator   headerMode= 'none' initialRouteName="SplashScreen">
            <RootStack.Screen name= 'SplashScreen' component={SplashScreen}  />
            <RootStack.Screen name= 'LoginScreen' component={LoginScreen}  />
            
        </RootStack.Navigator>
        </NavigationContainer>
    );
}

export default config