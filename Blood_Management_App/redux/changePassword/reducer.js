/* eslint-disable prettier/prettier */
import {Alert, ToastAndroid, Platform, AlertIOS} from 'react-native';
import {
  UPDATE_FIELDS_CHANGE,
  CHANGE_REQ,
  CHANGE_REQ_SUCCESS,
  CHANGE_REQ_FAILURE,
  BLUR_FIELDS_CHANGE,
  STATE_CLEANUP_CHANGE,
  RESET_DONE_STATE,
} from './actionTypes';

const initialState = {
  inputValues: {
    currPassword: '',
    password: '',
    cpassword: '',
  },
  inputValidity: {
    currPassword: false,
    password: false,
    cpassword: false,
  },
  isTouched: {
    currPassword: false,
    otp: false,
    password: false,
    cpassword: false,
  },
  loading: false,
  error: '',
  passwordSent: false,
  passwordReset: false,
};

const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELDS_CHANGE: {
      const newInputValue = {
        ...state.inputValues,
        [action.fieldId]: action.val,
      };
      const newInputValidity = {
        ...state.inputValidity,
        [action.fieldId]: action.isValid,
      };
      return {
        ...state,
        inputValues: newInputValue,
        inputValidity: newInputValidity,
      };
    }
    case BLUR_FIELDS_CHANGE: {
      const newInputIsTouched = {...state.isTouched, [action.fieldId]: true};
      return {...state, isTouched: newInputIsTouched};
    }
    case STATE_CLEANUP_CHANGE: {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Password Updated!', ToastAndroid.SHORT);
      } else {
        AlertIOS.alert('Password Updated!');
      }
      console.log('flushing state');
      return initialState;
    }

    ////////////////////////////////////////////////////////////////////////

    case CHANGE_REQ: {
      return {...state, loading: true};
    }

    case CHANGE_REQ_SUCCESS: {
      console.log('change password success response recieved!');
      console.log({
        ...state,
        loading: false,
        error: '',
        [action.successReq]: true,
      });
      return {...state, loading: false, error: '', [action.successReq]: true};
    }

    case CHANGE_REQ_FAILURE: {
      Alert.alert('Error', action.error);
      return {...state, loading: false, error: action.error};
    }

    case RESET_DONE_STATE: {
      const newState = {
        ...state,
        passwordSent: false,
        passwordReset: false,
      };

      if (action.currScreen === 'currPassword') {
        newState.inputValues.currPassword = '';
        newState.isTouched.currPassword = false;
      } else {
        newState.inputValues.password = '';
        newState.inputValues.cpassword = '';
        newState.isTouched.password = false;
        newState.isTouched.cpassword = false;
      }

      return newState;
    }

    default: {
      return state;
    }
  }
};

export default changePasswordReducer;
