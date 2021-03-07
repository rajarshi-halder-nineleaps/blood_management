/* eslint-disable prettier/prettier */
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

import Home from '../src/MainTabs/Individual/Home';
import About from '../src/MainTabs/About';
import Notifications from '../src/MainTabs/Notifications';
import Profile from '../src/MainTabs/ProfileStack/Profile';
import ProfileStackNavigator from './ProfileNavigator';
import ServicesStackNavigator from './ServicesNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator

      initialRouteName="home"
      tabBarOptions={{
        style: { height: 70 },

        activeTintColor: colors.primary,
        keyboardHidesTabBar: true,
        activeBackgroundColor: colors.additional2,
        inactiveBackgroundColor: colors.primary,
        inactiveTintColor: colors.additional2,
        labelPosition: 'below-icon',
        allowFontScaling: true,
        labelStyle: {
          fontSize: 11,
          fontFamily: 'Montserrat-Regular',
          paddingBottom: 10
        }
      }}

    >
      <Tab.Screen
        name=" home "
        component={Home}
        //options={{ title: 'Home', paddingVertical: 20, fontSize: 20 }}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
          tabBarBadgeStyle: {
            fontSize: 30
          }

        }}
      />
      <Tab.Screen
        name=" profile "
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name=" services "
        component={ServicesStackNavigator}
        options={{
          tabBarLabel: 'Services',
          tabBarIcon: ({ color }) => (
            <Icon name="tint" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name=" notiications"
        component={Notifications}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color }) => (
            <Icon name="bell" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name=" about "
        component={About}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({ color }) => (
            <Icon name="info" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MainNavigator;
