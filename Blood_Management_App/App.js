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
//TODO REMOVE AFTER IMPLEMENTING IT IN REDUX.
import axios from 'axios';

const App = () => {
  //TODO SET THEM IN STORE.

  // const [currentLongitude, setCurrentLongitude] = useState('...');
  // const [currentLatitude, setCurrentLatitude] = useState('...');
  // const [locationStatus, setLocationStatus] = useState('');

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

    Firebase.initializeApp(firebaseOptions, 'RedBank45');
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // // //? SETTING UP GEOLOCATION
  // let watchID;

  // useEffect(() => {
  //   //TODO MAKE THIS CALL IN AN ACTION CREATOR.
  //   const requestLocationPermission = async () => {
  //     if (Platform.OS === 'ios') {
  //       getOneTimeLocation();
  //       subscribeLocationLocation();
  //     } else {
  //       try {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //           {
  //             title: 'Location Access Required',
  //             message: 'This App needs to Access your location',
  //           },
  //         );
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           getOneTimeLocation();
  //           subscribeLocationLocation();
  //         } else {
  //           setLocationStatus('Permission Denied');
  //         }
  //       } catch (err) {
  //         console.warn(err);
  //       }
  //     }
  //   };
  //   requestLocationPermission();
  //   return () => {
  //     Geolocation.clearWatch(watchID);
  //   };
  // }, []);

  // const getOneTimeLocation = () => {
  //   setLocationStatus('Getting Location ...');
  //   Geolocation.getCurrentPosition(
  //     //? GETS THE CURRENT POSITION
  //     (position) => {
  //       setLocationStatus('You are Here');
  //       const currentLong = JSON.stringify(position.coords.longitude);
  //       const currentLat = JSON.stringify(position.coords.latitude);
  //       setCurrentLongitude(currentLong);
  //       setCurrentLatitude(currentLat);
  //       reverseGeoCoding(currentLat, currentLong);
  //     },
  //     (error) => {
  //       setLocationStatus(error.message);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 5000,
  //       maximumAge: 10000,
  //     },
  //   );
  // };

  // const subscribeLocationLocation = () => {
  //   watchID = Geolocation.watchPosition(
  //     (position) => {
  //       //Will give the location on location change

  //       setLocationStatus('You are Here');
  //       console.log(position);
  //       const currentLongitude = JSON.stringify(position.coords.longitude);
  //       const currentLatitude = JSON.stringify(position.coords.latitude);
  //       setCurrentLongitude(currentLongitude);
  //       setCurrentLatitude(currentLatitude);
  //       reverseGeoCoding(currentLatitude, currentLongitude);
  //     },
  //     (error) => {
  //       setLocationStatus(error.message);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       maximumAge: 1000,
  //     },
  //   );
  // };

  // //? NOW, FOR REVERSE GEOCODING,

  // const reverseGeoCoding = async (lat, long) => {
  //   const response = await axios.get(
  //     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`,
  //   );

  //   //? extracting state and district froom the reverse geolocation API.
  //   const state = response.data.localityInfo.administrative[1].name;
  //   const district = response.data.localityInfo.administrative[2].name.split(
  //     ' ',
  //   )[0];

  //   console.log('WORKS');

  //   console.log(state, district);

  //   console.log(response.data);

  //   const geocodingResponse = await axios.get(
  //     `http://open.mapquestapi.com/geocoding/v1/address?key=q7YsoAGYBnAfH0vhwRLpa6pWGYDgDq5g&location=${district},${state}`,
  //   );

  //   console.log('WORKS2');

  //   console.log(geocodingResponse.data.results[0].locations[0].postalCode);
  // };

  /* <Text style={styles.boldText}>{locationStatus}</Text>
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
          }}>
          Longitude: {currentLongitude}
        </Text>
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
          }}>
          Latitude: {currentLatitude}
        </Text>
        <View style={{marginTop: 20}}>
          <Button title="Button" onPress={getOneTimeLocation} />
        </View> */

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Provider store={store}>
      <PaperProvider>
        <Config />
      </PaperProvider>
    </Provider>
  );
};

export default App;
