import React, {useEffect, useReducer, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import axios from 'axios';
// import {Provider} from 'react-redux';
// import store from '../redux/store';

import SplashScreen from './Login Stack/SplashScreen';
import LoginScreen from './Login Stack/LoginScreen';
import findaccount from './Login Stack/Find_account';
import enterotp from './Login Stack/Enter_Otp';
import resetpassword from './Login Stack/ResetPassword';
import RegisterSelectScreen from './Register Stack/RegisterSelectScreen';
import RegisterBbScreen from './Register Stack/RegisterBbScreen';
import RegisterHosScreen from './Register Stack/RegisterHosScreen';
import RegisterIndScreen from './Register Stack/RegisterIndScreen';
// import {checkUserLogin} from "../redux/isLoggedIn/actions";
import {View, ActivityIndicator, Alert} from 'react-native';
import {AuthContext} from '../components/context';
import Home from './MainStack/Home';

import Feather from 'react-native-vector-icons/Feather';
import colors from '../constants/Colors';
const RootStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const config = () => {
  const initialLoginState = {
    isLoggedIn: false,
    userToken: '',
    isLoading: false,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(
    () => ({
      signIn: (userName, password) => {
        var userToken = userName;

        dispatch({type: 'LOGIN', token: userToken});
      },
      signOut: async () => {
        try {
          console.log('removed');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: (userDetails) => {
        let userToken = "";
        //* HERE, WE POST REGISTRATION DATA.
        axios
          .post('', userDetails)
          .then(function (response) {
            console.log(response);
            if (response.status == true) {
              console.log(response.data);
              userToken = response.data.user_id;
              console.log(userToken);
              setToken(userToken);
              Alert.alert('Alert', response.data.massage);
              // dispatch({type: 'LOGIN', id: email, token: userToken});
            } else {
              console.log(response.data);
              console.log(response.data.massage);
              Alert.alert('Alert', response.data.massage);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    }),
    [],
  );

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken != null ? (
          <Tab.Navigator
            barStyle={{backgroundColor: colors.primary, height: 65, paddingTop: 5}}
            initialRouteName="home">
            <Tab.Screen
              name=" home "
              component={Home}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => (
                  <Feather name="home" color={color} size={20} />
                ),
              }}
            />
            
          </Tab.Navigator>
        ) : (
          <RootStack.Navigator
            headerMode="none"
            initialRouteName="SplashScreen">
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
            <RootStack.Screen
              name="RegisterInd"
              component={RegisterIndScreen}
            />
            <RootStack.Screen
              name="RegisterHos"
              component={RegisterHosScreen}
            />
          </RootStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default config;
