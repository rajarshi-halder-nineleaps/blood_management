/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

import Home from '../src/MainTabs/Individual/Home';
import About from '../src/MainTabs/About';
import Notifications from '../src/MainTabs/Notifications';
import Profile from '../src/MainTabs/ProfileStack/Profile';
import ProfileStackNavigator from './ProfileNavigator';
import ServicesStackNavigator from './ServicesNavigator';
import {useSelector, useDispatch} from 'react-redux';
import {fetchNotifications} from '../redux/notifications/actions';
import {LogBox} from 'react-native';

//! if u need to use it, install it first.
// import BackgroundTimer from 'react-native-background-timer';

const Tab = createMaterialBottomTabNavigator();

const MainNavigator = () => {
  const notificationsState = useSelector((state) => state.notificationsState);
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  // todo change if u get a better solution.
  LogBox.ignoreLogs(['Setting a timer']);

  useEffect(() => {
    //* 1.

    let timeout;
    function dispatchNotificationAction() {
      dispatch(fetchNotifications(authState.userToken));
      timeout = setTimeout(dispatchNotificationAction, 20000);
    }
    dispatchNotificationAction();

    return () => {
      clearTimeout(timeout);
    };

    //* 2.

    // dispatch(fetchNotifications(authState.userToken));
    // const notificationFetcher = setInterval(() => {
    //   dispatch(fetchNotifications(authState.userToken));
    // }, 1000 * 60 * 5);
    // return () => {
    //   clearInterval(notificationFetcher);
    // };
  }, []);

  const newNotificationsLength = notificationsState.notifications.filter(
    (val) => !val.status,
  ).length;

  const notificationOptions = {
    tabBarLabel: 'Notifications',
    tabBarIcon: ({color}) => <Feather name="bell" color={color} size={20} />,
  };

  newNotificationsLength > 0
    ? (notificationOptions.tabBarBadge = newNotificationsLength)
    : null;

  return (
    <Tab.Navigator
      barStyle={{
        backgroundColor: colors.primary,
        height: 65,
        paddingTop: 5,
        elevation: 5,
      }}
      tabBarSelectedItemStyle={{
        borderBottomWidth: 2,
        borderBottomColor: 'red',
      }}
      initialRouteName="home"
      activeColor="white"
      // shifting={false}
      inactiveColor={colors.black}>
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
        component={ProfileStackNavigator}
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
        name=" notiications"
        component={Notifications}
        options={notificationOptions}
      />
      <Tab.Screen
        name=" about "
        component={About}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({color}) => (
            <Feather name="info" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MainNavigator;
