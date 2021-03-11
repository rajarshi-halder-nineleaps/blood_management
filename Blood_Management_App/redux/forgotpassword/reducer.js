/* eslint-disable prettier/prettier */
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  UPDATE_FIELDS_FORGOT,
  FORGOT_REQ,
  FORGOT_REQ_SUCCESS,
  FORGOT_REQ_FAILURE,
  BLUR_FIELDS_FORGOT,
  STATE_CLEANUP_FORGOT,
  RESET_DONE_STATE,
} from './actionTypes';

const initialState = {
  inputValues: {
    email: '',
    otp: '',
    password: '',
    cpassword: '',
  },
  inputValidity: {
    email: false,
    otp: false,
    password: false,
    cpassword: false,
  },
  isTouched: {
    email: false,
    otp: false,
    password: false,
    cpassword: false,
  },
  loading: false,
  error: '',
  emailSent: false,
  otpVerified: false,
  passwordReset: false,
  resentOtp: 0,
};

const forgotReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELDS_FORGOT: {
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
    case BLUR_FIELDS_FORGOT: {
      const newInputIsTouched = {...state.isTouched, [action.fieldId]: true};
      return {...state, isTouched: newInputIsTouched};
    }
    case STATE_CLEANUP_FORGOT: {
      showMessage({
        message: 'Success',
        description: 'New password set successfully.',
        type: 'success',
      });
      console.log('flushing state');
      return initialState;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    case FORGOT_REQ: {
      return {...state, loading: true};
    }
    case FORGOT_REQ_SUCCESS: {
      let newResentOtp = state.resentOtp;
      if (action.successReq === 'emailSent') {
        newResentOtp += 1;
      }

      console.log('forgotpassword success response recieved!');
      console.log({
        ...state,
        loading: false,
        error: '',
        [action.successReq]: true,
        resentOtp: newResentOtp,
      });
      return {...state, loading: false, error: '', [action.successReq]: true};
    }
    case FORGOT_REQ_FAILURE: {
      showMessage({
        message: 'Error',
        description: action.error,
        type: 'danger',
      });
      return {...state, loading: false, error: action.error};
    }

    case RESET_DONE_STATE: {
      let newState = {
        ...state,
        emailSent: false,
        otpVerified: false,
        passwordReset: false,
      };

      if (action.resettable === 'otp') {
        newState.inputValues.otp = '';
        newState.isTouched.otp = false;
      } else {
        newState.inputValues.password = '';
        newState.inputValues.cpassword = '';
        newState.isTouched.password = false;
        newState.isTouched.cpassword = false;
      }

      return newState;
    }

    default:
      return state;
  }
};

export default forgotReducer;
