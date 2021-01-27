import {Alert} from 'react-native';

import {
  RETRIEVE_TOKEN,
  REQ,
  REQ_SUCCESS,
  REQ_FAILURE,
  REGISTER_REQ,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from './actionTypes';

const initialState = {
  isLoggedIn: false,
  userId: '',
  userToken: '',
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
        isLoggedIn: true,
        error: '',
      };
    }

    case REQ_FAILURE: {
      //* here, we are getting the payload data.
      Alert.alert("Error", action.error);
      console.log(action.error);
      console.log('loading: false');
      return {
        ...state,
        loading: false,
        error: action.error,
        userId: '',
        userToken: '',
      };
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    default:
      return state;
  }
};

export default authReducer;
