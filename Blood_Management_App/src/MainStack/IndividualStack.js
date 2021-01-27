import React from 'react'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

import Home from '../MainStack/Individual/Home'
import About from '../MainStack/Individual/About'
import Notification from '../MainStack/Individual/Notification'
import Profile from '../MainStack/Individual/Profile'
import Services from '../MainStack/Individual/Services'

const Tab = createMaterialBottomTabNavigator();

const IndividualStack = () => {
    return(
        <Tab.Navigator
            barStyle={{backgroundColor: colors.primary, height: 65, paddingTop: 5}}
            initialRouteName="home"
            activeColor="#f0edf6"
            inactiveColor="#3e2465">
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
              component={Services}
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

}
export default IndividualStack