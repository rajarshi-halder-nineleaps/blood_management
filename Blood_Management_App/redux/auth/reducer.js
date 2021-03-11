/* eslint-disable prettier/prettier */
import {showMessage, hideMessage} from 'react-native-flash-message';
import {REQ, REQ_SUCCESS, REQ_FAILURE, LOGOUT} from './actionTypes';

//? INITIAL STATE.

const initialState = {
  isLoggedIn: false,
  userId: '',
  userToken: '',
  userType: '',
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
      showMessage({
        message: 'Error',
        description: action.error,
        type: 'error',
      });
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
    case LOGOUT: {
      console.log('logout request at reducer');
      return {...state, isLoggedIn: false};
    }
    default:
      return state;
  }
};

export default authReducer;
