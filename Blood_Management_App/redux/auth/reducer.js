/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';

import {REQ, REQ_SUCCESS, REQ_FAILURE, LOGOUT} from './actionTypes';

const initialState = {
  isLoggedIn: false,
  userId: '',
  userToken: '',
  userType: '',
  loading: false,
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQ: {
      console.log('login request started!');
      return {...state, loading: true};
    }

    case REQ_SUCCESS: {
      //* here, we are getting the payload data.
      console.log('loading: false');
      return {
        ...state,
        loading: false,
        userId: action.userId,
        userToken: action.userToken,
        userType: action.userType,
        isLoggedIn: true,
        error: '',
      };
    }

    case REQ_FAILURE: {
      //* here, we are getting the payload data.
      Alert.alert('Error', action.error);
      console.log(action.error);
      console.log('loading: false');
      return {
        ...state,
        isLogggedIn: false,
        loading: false,
        error: action.error,
        userId: '',
        userToken: '',
        userType: '',
      };
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    case LOGOUT: {
      console.log('logout request at reducer');
      return {...state, isLoggedIn: false};
    }
    default:
      return state;
  }
};

export default authReducer;
