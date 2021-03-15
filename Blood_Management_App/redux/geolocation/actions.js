import axios from 'axios';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import * as secrets from '../../secrets.json';
import {
  REVERSE_GEOCODING_SUCCESS,
  LOCATION_REQ,
  LOCATION_SUCCESS,
  LOCATION_FAILURE,
  STATE_CLEANUP,
} from './actionTypes';

export const LocationReq = () => ({
  type: LOCATION_REQ,
});

export const LocationFailure = (error) => ({
  type: LOCATION_FAILURE,
  error,
});

export const reverseGeoCodingSuccess = (address, state, district, pincode) => ({
  type: REVERSE_GEOCODING_SUCCESS,
  address,
  state,
  district,
  pincode,
});

export const LocationSuccess = (lat, long) => ({
  type: LOCATION_SUCCESS,
  lat,
  long,
});

export const stateCleanup = () => ({
  type: STATE_CLEANUP,
});
////////////////////////////////////////////////////////////////////////////////////////

//? SUPPORT FUNCTIONS

const getOneTimeLocation = (dispatch) => {
  dispatch(LocationReq());
  Geolocation.getCurrentPosition(
    //* GETS THE CURRENT POSITION
    (position) => {
      const currentLong = JSON.stringify(position.coords.longitude);
      const currentLat = JSON.stringify(position.coords.latitude);

      dispatch(LocationSuccess(currentLat, currentLong));

      //* REVERSE GEO CODING ACTION TO GET THE ACTUAL NAMES FROM LAT AND LONG.
      dispatch(reverseGeoCoding(currentLat, currentLong));
    },
    (err) => {
      dispatch(LocationFailure(err.message));
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 10000,
    },
  );
};

const subscribeLocationLocation = (dispatch, watchID) => {
  watchID = Geolocation.watchPosition(
    (position) => {
      //Will give the location on location change

      console.log(position);
      const currentLong = JSON.stringify(position.coords.longitude);
      const currentLat = JSON.stringify(position.coords.latitude);
      dispatch(LocationSuccess(currentLat, currentLong));

      //* REVERSE GEO CODING ACTION TO GET THE ACTUAL NAMES FROM LAT AND LONG.
      dispatch(reverseGeoCoding(currentLat, currentLong));
    },
    (err) => {
      dispatch(LocationFailure(err.message));
    },
    {
      enableHighAccuracy: false,
      maximumAge: 1000,
    },
  );
};

////////////////////////////////////////////////////////////////////////////////////////

//? ASYNC ACTION CREATORS.

export const requestLocationPermission = (watchID) => {
  return async (dispatch) => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation(dispatch);
      subscribeLocationLocation(dispatch, watchID);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getOneTimeLocation(dispatch);
          subscribeLocationLocation(dispatch, watchID);
        } else {
          dispatch(LocationFailure('Permission denied!'));
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
};

export const reverseGeoCoding = (lat, long) => {
  return async (dispatch) => {
    dispatch(LocationReq());
    try {
      const response = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`,
      );

      //? extracting state and district froom the reverse geolocation API.
      let address = '';
      response.data.localityInfo.administrative.map((val, idx) => {
        if (idx !== 0 && idx !== 1 && idx !== 2) {
          if (address === '') {
            address = val.name + address;
          } else {
            address = val.name + ', ' + address;
          }
        }
      });

      const state = response.data.localityInfo.administrative[1].name;
      const district = response.data.localityInfo.administrative[2].name.split(
        ' ',
      )[0];

      if (state && district) {
        //! UNCOMMENT IT BEFORE DEMO, COMMENTED BECAUSE OF LIMITED REQUESTS PER MONTH.
        // const geocodingResponse = await axios.get(
        //   `http://open.mapquestapi.com/geocoding/v1/address?key=${secrets.geocodingApiKey}&location=${district},${state}`,
        // );
        // const pincode =
        //   geocodingResponse.data.results[0].locations[0].postalCode;

        const pincode = '689645';

        console.log(pincode);

        if (pincode) {
          dispatch(reverseGeoCodingSuccess(address, state, district, pincode));
        } else {
          dispatch(
            LocationFailure(
              'Unable to get your pincode, please enter it manually',
            ),
          );
        }
      } else {
        dispatch(LocationFailure('Unable to get your geolocation right now!'));
      }
    } catch (err) {
      dispatch(LocationFailure(err.message));
    }
  };
};
