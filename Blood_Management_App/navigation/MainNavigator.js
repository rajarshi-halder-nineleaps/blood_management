/* eslint-disable prettier/prettier */
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

import Home from '../src/MainTabs/Individual/Home';
import About from '../src/MainTabs/About';
import Notification from '../src/MainTabs/Individual/Notification';
import Profile from '../src/MainTabs/Individual/Profile';
import ServicesStackNavigator from './ServicesNavigator';

const Tab = createMaterialBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      barStyle={{
        backgroundColor: colors.primary,
        height: 65,
        paddingTop: 5,
        elevation: 5,
      }}
      initialRouteName="home"
      activeColor="white"
      inactiveColor={colors.darkPrimary}>
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
      <Tab.Screen
        name=" profile "
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Feather name="user" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name=" services "
        component={ServicesStackNavigator}
        options={{
          tabBarLabel: 'Services',
          tabBarIcon: ({color}) => (
            <Feather name="droplet" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name=" notiication "
        component={Notification}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({color}) => (
            <Feather name="bell" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name=" about "
        component={About}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({color}) => (
            <Feather name="alert-circle" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MainNavigator;
