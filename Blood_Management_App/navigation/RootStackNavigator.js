import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

//? screens:
import SplashScreen from '../src/Login Stack/SplashScreen';
import IntroSlider from '../src/Login Stack/IntroSlider';
import LoginScreen from '../src/Login Stack/LoginScreen';
import findaccount from '../src/Login Stack/Find_account';
import enterotp from '../src/Login Stack/Enter_Otp';
import resetpassword from '../src/Login Stack/ResetPassword';
import RegisterSelectScreen from '../src/RegisterStack/RegisterSelectScreen';
import RegisterBbScreen from '../src/RegisterStack/RegisterBbScreen';
import RegisterHosScreen from '../src/RegisterStack/RegisterHosScreen';
import RegisterIndScreen from '../src/RegisterStack/RegisterIndScreen';
import OtpScreen from '../src/RegisterStack/VerifyEmailOwnership';
import FlashMessage from 'react-native-flash-message';

const RootStack = createStackNavigator();

const RootStackNavigator = () => {
  return (
    <>
      <RootStack.Navigator headerMode="none" initialRouteName="SplashScreen">
        <RootStack.Screen name="IntroSlider" component={IntroSlider} />
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
        <RootStack.Screen name="OtpScreen" component={OtpScreen} />
      </RootStack.Navigator>
      <FlashMessage
        position="top"
        textStyle={{fontFamily: 'Montserrat-Regular'}}
        titleStyle={{fontFamily: 'Montserrat-Bold'}}
      />
    </>
  );
};

export default RootStackNavigator;
