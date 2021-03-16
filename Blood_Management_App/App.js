//! CURRENTLY PUSH NOTIFICATIONS ARE ONLY CONFIGURED FOR ANDROID,
//! BUT IF IN THE FUTURE, CONFIGURED FOR IOS, THE BOILER PLATE JS CODE IS WRITTEN.

import React, {useState, useEffect} from 'react';
import Config from './src/config';
import {Provider} from 'react-redux';
import {Platform, PermissionsAndroid} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import store from './redux/store';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification from 'react-native-push-notification';
var PushNotification = require('react-native-push-notification');
import Firebase from '@react-native-firebase/app';

import * as options from './android/app/google-services.json';
import * as secrets from './secrets.json';
import Geolocation from '@react-native-community/geolocation';

const App = () => {
  //? METHOD TO GET THE FCM TOKEN.
  // const getFCMToken = async () => {
  //   const fcmToken = await Firebase.messaging().getToken();
  //   console.log('TOKEN FCM: ', fcmToken);
  // };

  useEffect(() => {
    // getFCMToken();

    //* 1.

    const firebaseOptions = {
      apiKey: options.client[0].api_key[0].current_key,
      projectId: options.project_info.project_id,
      storageBucket: options.project_info.storage_bucket,
      appId: secrets.appId,
      databaseURL: secrets.databaseURL,
      messagingSenderId: secrets.messagingSenderId,
    };

    Firebase.initializeApp(firebaseOptions, 'RedBank54');

    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION_ACTUAL:', notification);

        //* 2.

        if (Platform.OS === 'android') {
          PushNotification.localNotification(notification);
          // notification.finish(PushNotification.FetchResult.NoData);
        } else {
          PushNotificationIOS.localNotification(notification);
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <Config />
      </PaperProvider>
    </Provider>
  );
};

export default App;
