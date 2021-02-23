/* eslint-disable prettier/prettier */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {REQ, REQ_SUCCESS, REQ_FAILURE, LOGOUT} from './actionTypes';

export const req = () => ({
  type: REQ,
});

export const reqSuccess = (userId, userToken, userType) => ({
  type: REQ_SUCCESS,
  userId: userId,
  userToken: userToken,
  userType: userType,
});

export const reqFailure = (error) => ({
  type: REQ_FAILURE,
  error: error,
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const logUserIn = (loginData) => {
  return async (dispatch) => {
    dispatch(req());
    console.log('login works');
    try {
      const response = await axios.post(
        'http://192.168.43.217:8080/authenticate',
        loginData,
      );
      console.log('COMPLETE RESPONSE DATA: ', response.headers);

      if (response.headers.error) {
        dispatch(reqFailure('Invalid login credentials! Please try again.'));
        console.log(response.headers.error);
      } else if (response.headers.success) {
        console.log('saving to async storage');
        //? SAVING USER DATA TO ASYNC STORAGE ON SUCCESSFUL LOGIN.
        const userData = JSON.stringify({
          userToken: response.data.userToken,
          userId: response.data.userId,
          userType: response.data.userType,
        });
        await AsyncStorage.setItem('redBankAuthObj', userData);
        console.log('Saved data to async storage!');

        dispatch(
          reqSuccess(
            response.data.userId,
            response.data.userToken,
            response.data.userType,
          ),
        );
      } else {
        dispatch(
          reqFailure(
            "Something's not right! Please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const regUserUp = (regData) => {
  return async (dispatch) => {
    dispatch(req());
    console.log('regsiter works');
    try {
      console.log('USER TYPE: ', regData.userType);

      let response = {};

      if (regData.userType === 1) {
        // regData.formData.dob = regData.formData.dob.toLocaleDateString();
        const requestObject = {
          name: regData.formData.name,
          email: regData.formData.email,
          phone: regData.formData.phone,
          dob: regData.formData.dob.toLocaleDateString(),
          bloodGroup: regData.formData.bloodgroup,
          address: regData.formData.address,
          state: regData.formData.selectedState,
          district: regData.formData.selectedDistrict,
          pincode: regData.formData.pincode,
          password: regData.formData.password,
        };

        response = await axios.post(
          'http://192.168.43.217:8080/registerind',
          requestObject,
        );
      } else if (regData.userType === 2) {
        const requestObject = {
          name: regData.formData.name,
          email: regData.formData.email,
          phone: regData.formData.phone,
          licenseNumber: regData.formData.license,
          address: regData.formData.address,
          state: regData.formData.selectedState,
          district: regData.formData.selectedDistrict,
          pincode: regData.formData.pincode,
          password: regData.formData.password,
        };

        response = await axios.post(
          'http://192.168.43.217:8080/registerhos',
          requestObject,
        );
      } else {
        const requestObject = {
          name: regData.formData.name,
          email: regData.formData.email,
          phone: regData.formData.phone,
          licenseNumber: regData.formData.license,
          address: regData.formData.address,
          state: regData.formData.selectedState,
          district: regData.formData.selectedDistrict,
          pincode: regData.formData.pincode,
          password: regData.formData.password,
        };

        response = await axios.post(
          'http://192.168.43.217:8080/registerbb',
          requestObject,
        );
      }

      console.log('COMPLETE RESPONSE DATA: ', response.data);
      if (response.headers.error) {
        dispatch(reqFailure(response.headers.error));
        console.log(response.headers.error);
      } else if (response.headers.success) {
        const userData = JSON.stringify({
          userToken: response.data.userToken,
          userId: response.data.userId,
          userType: response.data.userType,
        });
        await AsyncStorage.setItem('redBankAuthObj', userData);
        console.log('Saved data to async storage!');
        dispatch(
          reqSuccess(
            response.data.userId,
            response.data.userToken,
            response.data.userType,
          ),
        );
      } else {
        dispatch(
          reqFailure(
            "Something's not right! Please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//* this will give out either the user details or null. to be called at the begining of code execution to check if user is logged in or not.
export const tokenRetriever = () => {
  return async (dispatch) => {
    dispatch(req());
    try {
      const userData = await AsyncStorage.getItem('redBankAuthObj');
      const loggedData = userData != null ? JSON.parse(userData) : null;
      if (loggedData != null) {
        dispatch(
          reqSuccess(
            loggedData.userId,
            loggedData.userToken,
            loggedData.userType,
          ),
        );
      } else {
        //TODO MAKE AN ACTION TO SET LOADING STATE TO FALSE.
        reqFailure('ok');
      }
    } catch (err) {
      //? ERROR RETRIEVING ASYNC STORAGE DATA.
      console.log('token retriever error: ', err.message);
      //? here, the loginFailure action sets the loading to false automatically.
      dispatch(reqFailure(err.message));
    }
  };
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const logout = () => ({type: LOGOUT});

export const logUserOut = () => {
  console.log('logging out');
  return async (dispatch) => {
    dispatch(req());
    try {
      await AsyncStorage.removeItem('redBankAuthObj');
      dispatch(reqSuccess('', ''));
      dispatch(logout());
      console.log('Async Storage emptied!');
    } catch (err) {
      //? ERROR RETRIEVING ASYNC STORAGE DATA.
      console.log('unable to logout: ', err.message);
      //? here, the loginFailure action sets the loading to false automatically.
      dispatch(reqFailure(err.message));
    }
  };
};
