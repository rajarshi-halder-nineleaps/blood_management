/* eslint-disable prettier/prettier */
import React, {useEffect, useReducer, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import IndividualStack from './MainStack/IndividualStack';

import SplashScreen from './Login Stack/SplashScreen';
import LoginScreen from './Login Stack/LoginScreen';
import findaccount from './Login Stack/Find_account';
import enterotp from './Login Stack/Enter_Otp';
import resetpassword from './Login Stack/ResetPassword';
import RegisterSelectScreen from './Register Stack/RegisterSelectScreen';
import RegisterBbScreen from './Register Stack/RegisterBbScreen';
import RegisterHosScreen from './Register Stack/RegisterHosScreen';
import RegisterIndScreen from './Register Stack/RegisterIndScreen';
import {View, ActivityIndicator} from 'react-native';

import colors from '../constants/Colors';

import {useSelector, useDispatch} from 'react-redux';
import {tokenRetriever} from '../redux/auth/actions';

const RootStack = createStackNavigator();

const Config = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);

  console.log(authState);
  useEffect(() => {
    dispatch(tokenRetriever());
  }, [dispatch]);

  console.log(authState);

  if (authState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {authState.isLoggedIn ? (
        <IndividualStack />
      ) : (
        <RootStack.Navigator headerMode="none" initialRouteName="SplashScreen">
          <RootStack.Screen name="SplashScreen" component={SplashScreen} />
          <RootStack.Screen name="LoginScreen" component={LoginScreen} />
          <RootStack.Screen name="FindAccount" component={findaccount} />
          <RootStack.Screen name="EnterOTP" component={enterotp} />
          <RootStack.Screen name="ResetPassword" component={resetpassword} />
          <RootStack.Screen
            name="RegisterScreen"
            component={RegisterSelectScreen}
          />
          <RootStack.Screen name="RegisterBb" component={RegisterBbScreen} />
          <RootStack.Screen name="RegisterInd" component={RegisterIndScreen} />
          <RootStack.Screen name="RegisterHos" component={RegisterHosScreen} />
        </RootStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Config;
