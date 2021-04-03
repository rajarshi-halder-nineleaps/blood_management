/* eslint-disable prettier/prettier */
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  REQ,
  REQ_SUCCESS,
  SET_NEW_AUTH_TOKEN,
  REQ_FAILURE,
  LOGOUT,
} from './actionTypes';
import messaging from '@react-native-firebase/messaging';

//? INITIAL STATE.

const initialState = {
  isLoggedIn: false,
  userId: '',
  userToken: '',
  userType: 0,
  authTokenExpiry: '',
  refreshToken: '',
  refreshTokenExpiry: '',
  loading: false,
  error: '',
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//? REDUCER FUNCTION.
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQ: {
      console.log('auth request started!');
      return {...state, loading: true};
    }

    case REQ_SUCCESS: {
      //* here, we are getting the payload data.

      // messaging()
      //   .subscribeToTopic(action.userId)
      //   .then(() => console.log('Subscribed to userID!'));

      return {
        ...state,
        loading: false,
        userId: action.userId,
        userToken: action.userToken,
        userType: action.userType,
        authTokenExpiry: action.authTokenExpiry,
        refreshToken: action.refreshToken,
        refreshTokenExpiry: action.refreshTokenExpiry,
        isLoggedIn: true,
        error: '',
      };
    }

    case SET_NEW_AUTH_TOKEN: {
      return {
        ...state,
        userToken: action.newAuthToken,
        authTokenExpiry: action.newAuthTokenExpiry,
      };
    }

    case REQ_FAILURE: {
      //* here, we are getting the payload data.
      if (action.error) {
        showMessage({
          message: 'Error',
          description: action.error,
          type: 'error',
        });
      }
      return {
        ...initialState,
      };
    }
    case LOGOUT: {
      const currUserId = state.userId;
      // messaging()
      //   .unsubscribeFromTopic(currUserId)
      //   .then(() => console.log('Unsubscribed fom the topic!'));
      console.log('logout request at reducer');
      return {...initialState};
    }
    default:
      return state;
  }
};

export default authReducer;
