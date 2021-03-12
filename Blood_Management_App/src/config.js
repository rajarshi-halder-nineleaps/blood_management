/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from '../navigation/MainNavigator';
import RootStackNavigator from '../navigation/RootStackNavigator';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import colors from '../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {tokenRetriever} from '../redux/auth/actions';
import {requestLocationPermission} from '../redux/geolocation/actions';
import Geolocation from '@react-native-community/geolocation';

const Config = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);

  console.log(authState);
  useEffect(() => {
    dispatch(tokenRetriever());
  }, [dispatch]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // //? SETTING UP GEOLOCATION
  const geolocationState = useSelector((state) => state.geolocationState);
  let watchID;

  useEffect(() => {
    dispatch(requestLocationPermission(watchID));
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  return (
    <>
      {authState.isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={colors.primary}
            size="large"
          />
        </View>
      ) : (
        <NavigationContainer>
          {authState.isLoggedIn ? <MainNavigator /> : <RootStackNavigator />}
        </NavigationContainer>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Config;

//! /////////////////////// NEEDED CODE | DO NOT DELETE | ANANDHU /////////////////////////////

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
//   //! CLEANUP AFTER EVERY USEEFFECT CALL.
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

//   const geocodingResponse = await axios.get(
//     `http://open.mapquestapi.com/geocoding/v1/address?key=q7YsoAGYBnAfH0vhwRLpa6pWGYDgDq5g&location=${district},${state}`,
//   );
//   const pincode = geocodingResponse.data.results[0].locations[0].postalCode;

//   console.log(pincode);
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

//! ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
