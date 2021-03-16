/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

import {StatusBar, Platform} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import Home from '../src/MainTabs/Individual/Home';
import About from '../src/MainTabs/About';
import Notifications from '../src/MainTabs/Notifications';
import ProfileStackNavigator from './ProfileNavigator';
import ServicesStackNavigator from './ServicesNavigator';
import {useSelector, useDispatch} from 'react-redux';
import {fetchNotifications} from '../redux/notifications/actions';
import {LogBox} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';
import {setDonorStatus} from '../redux/profile/actions';
import {setDonationEligibilityNotification} from '../redux/notifications/actions';
import {getUserData} from '../redux/profile/actions';
import {getProfileData} from '../redux/profile/actions';

//! if u need to use this, install it first.
// import BackgroundTimer from 'react-native-background-timer';

const Tab = createMaterialBottomTabNavigator();

const MainNavigator = () => {
  const notificationsState = useSelector((state) => state.notificationsState);
  const authState = useSelector((state) => state.authState);
  const profileState = useSelector((state) => state.profileState);
  const dispatch = useDispatch();

  const [oldNotificationsLength, setOldNotificationsLength] = useState(0);
  const [everOffline, setEverOffline] = useState(0);

  //* CHECKING IF USER IS CONNECTED TO THE INTERNET.
  const netInfo = useNetInfo();

  // todo change if u get a better solution and also, remove in prod.
  LogBox.ignoreLogs(['Setting a timer', 'Cannot update during']);

  //? LOGIC TO VIEW A FLASH MESSAGE IN CASE OF A NEW NOTIFICATION.

  const newNotificationsLength = notificationsState.notifications.filter(
    (val) => !val.status,
  ).length;

  if (
    newNotificationsLength > 0 &&
    newNotificationsLength - oldNotificationsLength > 0
  ) {
    //* ALSO INCLUDING THE LOGIC TO SET PLURAL (NOTIFICATIONS) IN CASE OF MULTIPLE NEW NOTIFICATIONS.
    showMessage({
      message: `${newNotificationsLength} new notification${
        newNotificationsLength === 1 ? null : 's'
      }.`,
      type: 'success',
    });
    setOldNotificationsLength(newNotificationsLength);
  } else {
    console.log('No new notifications');
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch(getProfileData(authState.userToken));

    console.log('PROFILE RENDERED!');
  }, [dispatch]);

  useEffect(() => {
    messaging()
      .subscribeToTopic(authState.userId)
      .then(() => console.log('Subscribed to userID!'));
    return () =>
      messaging()
        .unsubscribeFromTopic(authState.userId)
        .then(() => console.log('Unsubscribed fom the topic!'));
  }, []);
  useEffect(() => {
    console.log('EVER OFFLINE: ' + everOffline);
    if (netInfo.isConnected && everOffline > 1) {
      showMessage({
        message: `Back online, connection type: ${netInfo.type}`,
        type: 'success',
      });
    } else {
      setEverOffline((prevState) => prevState + 1);
      if (everOffline > 1) {
        showMessage({
          message: 'No Internet',
          description: 'Please check your network connection.',
        });
      }
    }
  }, [netInfo.isConnected, netInfo.type]);

  useEffect(() => setOldNotificationsLength(newNotificationsLength), [
    newNotificationsLength,
  ]);

  useEffect(() => {
    //* 1.

    let timeout;
    function dispatchNotificationAction() {
      dispatch(fetchNotifications(authState.userToken));
      timeout = setTimeout(dispatchNotificationAction, 1000 * 60 * 5);
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

  useEffect(() => {
    dispatch(getUserData(authState.userToken));
    console.log('got user data');
  }, [dispatch]);

  useEffect(() => {
    if (
      authState.userType === 1 &&
      profileState.userData &&
      profileState.userData.lastDonationDate &&
      profileState.userData.donorStatus === 2
    ) {
      const lastDonationDate = profileState.userData.lastDonationDate;

      //? CONVERTING MILLISECONDS TO DAYS.
      //* 56 days is the minimum required number of days between blood donations
      const eligible =
        (new Date().getTime() -
          new Date(lastDonationDate.split('T')[0]).getTime()) /
          (1000 * 60 * 60 * 24) >
        56;
      if (eligible) {
        dispatch(setDonorStatus(authState.userToken, 0));
        dispatch(setDonationEligibilityNotification(authState.userType, true));
        console.log('Changing donor status to: ' + eligible);
      }
    }
    console.log("It's fine if printed once");
    //! DO NOT CHANGE DEPENDENCY ARRAY HERE OR ANYWHERE IN THE APP.
  }, [authState.userType, dispatch, profileState.userData.name]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  const notificationOptions = {
    tabBarLabel: 'Notifications',
    tabBarIcon: ({color}) => <Feather name="bell" color={color} size={20} />,
  };

  if (newNotificationsLength > 0) {
    notificationOptions.tabBarBadge = newNotificationsLength;
  }

  return (
    <>
      {
        //* REMOVE THIS LINE TO MAKE NATIVE STATUS BAR VISIBLE IN MAIN NAVIGATOR SCREENS.
      }
      <StatusBar animated backgroundColor={colors.primary} />
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
      <FlashMessage
        position="top"
        textStyle={{fontFamily: 'Montserrat-Regular'}}
        titleStyle={{fontFamily: 'Montserrat-Bold'}}
      />
    </>
  );
};
export default MainNavigator;
