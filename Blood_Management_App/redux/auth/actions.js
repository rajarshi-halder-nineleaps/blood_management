import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  RETRIEVE_TOKEN,
  REQ,
  REQ_SUCCESS,
  REQ_FAILURE,
  LOGOUT,
} from './actionTypes';

export const req = () => ({
  type: REQ,
});

export const reqSuccess = (userId, userToken) => ({
  type: REQ_SUCCESS,
  userId: userId,
  userToken: userToken,
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
        'http://192.168.43.89:5000/login',
        loginData,
      );
      console.log('COMPLETE RESPONSE DATA: ', response.data);

      if (response.data.error) {
        dispatch(reqFailure(response.data.error));
        console.log(response.data.error);
      } else {
        //? SAVING USER DATA TO ASYNC STORAGE ON SUCCESSFUL LOGIN.
        const userData = JSON.stringify({
          userToken: response.data.userToken,
          userId: response.data.userId,
        });
        await AsyncStorage.setItem('redBankAuthObj', userData);
        console.log('Saved data to async storage!');

        dispatch(reqSuccess(response.data.userId, response.data.userToken));
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
      const response = await axios.post(
        'http://192.168.43.89:5000/login',
        regData,
      );
      console.log('COMPLETE RESPONSE DATA: ', response.data);
      if (response.data.error) {
        dispatch(reqFailure(response.data.error));
        console.log(response.data.error);
      } else {
        const userData = JSON.stringify({
          userToken: response.data.userToken,
          userId: response.data.userId,
        });
        await AsyncStorage.setItem('redBankAuthObj', userData);
        console.log('Saved data to async storage!');
        dispatch(reqSuccess(response.data.userId, response.data.userToken));
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
        dispatch(reqSuccess(loggedData.userId, loggedData.userToken));
      } else {
        //TODO MAKE AN ACTION TO SET LOADING STATE TO FALSE.
        reqFailure("ok");
      }
    } catch (err) {
      //? ERROR RETRIEVING ASYNC STORAGE DATA.
      //TODO DOUBT: SHOULD WE REDIRECT TO LOGIN FROM HERE AS WELL? YES.
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
      //TODO SET ISLOGGEDIN TO FALSE AS WELL.
    } catch (err) {
      //? ERROR RETRIEVING ASYNC STORAGE DATA.
      console.log('unable to logout: ', err.message);
      //? here, the loginFailure action sets the loading to false automatically.
      dispatch(reqFailure(err.message));
    }
  };
};
