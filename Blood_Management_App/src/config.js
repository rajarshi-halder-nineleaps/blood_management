import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from '../redux/store';

import SplashScreen from './Login Stack/SplashScreen';
import LoginScreen from './Login Stack/LoginScreen';
import findaccount from './Login Stack/Find_account';
import enterotp from './Login Stack/Enter_Otp';
import resetpassword from './Login Stack/ResetPassword';

const RootStack = createStackNavigator();

const config = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator headerMode="none" initialRouteName="SplashScreen">
          <RootStack.Screen name="SplashScreen" component={SplashScreen} />
          <RootStack.Screen name="LoginScreen" component={LoginScreen} />
          <RootStack.Screen name="FindAccount" component={findaccount} />
          <RootStack.Screen name="EnterOTP" component={enterotp} />
          <RootStack.Screen name="ResetPassword" component={resetpassword} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default config;
