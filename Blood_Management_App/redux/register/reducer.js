import {Alert} from 'react-native';
import {
  UPDATE_FIELDS_REG,
  BLUR_FIELDS_REG,
  ADD_PHONE_STATE,
  PHONE_STATE_SET,
  PHONE_TOUCH_SET,
  STATE_CLEANUP,
  REMOVE_PHONE,
  UPDATE_OTP,
  BLUR_OTP,
  REQ_VERIFICATION_SUCCESS,
  REQ_VERIFICATION_FAILURE,
  REQ_VERIFICATION,
  SET_VALID_EMAIL,
  SET_USER_VERIFIED,
  RESET_OTP_STATE,
} from './actionTypes';
import {phoneRegex} from '../../constants/Regexes';

const initialState = {
  loading: false,
  error: '',
  inputValues: {
    name: '',
    email: '',
    phone: [''],
    license: '',
    address: '',
    selectedState: '',
    selectedDistrict: '',
    pincode: '',
    password: '',
    cpassword: '',
    tnc: false,
  },
  inputValidity: {
    name: false,
    email: false,
    phone: [false],
    license: false,
    address: false,
    selectedState: false,
    selectedDistrict: false,
    pincode: false,
    password: false,
    cpassword: false,
    tnc: false,
  },
  isTouched: {
    name: false,
    email: false,
    phone: [false],
    license: false,
    address: false,
    selectedState: false,
    selectedDistrict: false,
    pincode: false,
    password: false,
    cpassword: false,
    tnc: false,
  },
  otp: {
    value: '',
    validity: false,
    touched: false,
  },
  finalFormState: false,
  userVerified: 0,
};

const regIndReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELDS_REG: {
      const newInputValue = {
        ...state.inputValues,
        [action.fieldId]: action.val,
      };
      const newInputValidity = {
        ...state.inputValidity,
        [action.fieldId]: action.isValid,
      };

      let newFinalFormState = true;

      for (const key in newInputValidity.phone) {
        newFinalFormState = newFinalFormState && newInputValidity.phone[key];
      }

      for (const key in newInputValidity) {
        if (typeof newInputValidity[key] === 'boolean') {
          newFinalFormState = newFinalFormState && newInputValidity[key];
        }
      }

      return {
        ...state,
        inputValues: newInputValue,
        inputValidity: newInputValidity,
        finalFormState: newFinalFormState,
      };
    }

    case BLUR_FIELDS_REG: {
      const newInputIsTouched = {...state.isTouched, [action.fieldId]: true};
      return {...state, isTouched: newInputIsTouched};
    }

    case ADD_PHONE_STATE: {
      const newValPhoneState = [...state.inputValues.phone, ''];
      const newisValidPhoneState = [...state.inputValidity.phone, false];
      const newisTouchedPhoneState = [...state.isTouched.phone, false];
      return {
        ...state,
        inputValues: {...state.inputValues, phone: newValPhoneState},
        inputValidity: {...state.inputValidity, phone: newisValidPhoneState},
        isTouched: {...state.isTouched, phone: newisTouchedPhoneState},
      };
    }

    case PHONE_STATE_SET: {
      const newValPhoneState = [...state.inputValues.phone];
      const newisValidPhoneState = [...state.inputValidity.phone];

      if (!phoneRegex.test(String(action.val))) {
        newisValidPhoneState[action.idx] = false;
      } else {
        newisValidPhoneState[action.idx] = true;
      }

      newValPhoneState[action.idx] = action.val;

      const newInputValidity = {
        ...state.inputValidity,
        phone: newisValidPhoneState,
      };

      let newFinalFormState = true;

      for (const key in newInputValidity.phone) {
        newFinalFormState = newFinalFormState && newInputValidity.phone[key];
      }

      for (const key in newInputValidity) {
        if (typeof newInputValidity[key] === 'object') {
          newFinalFormState = newFinalFormState && newInputValidity[key];
        }
      }

      return {
        ...state,
        inputValues: {...state.inputValues, phone: newValPhoneState},
        inputValidity: newInputValidity,
        finalFormState: newFinalFormState,
      };
    }

    case PHONE_TOUCH_SET: {
      const newisTouchedPhoneState = [...state.isTouched.phone];
      newisTouchedPhoneState[action.idx] = true;
      return {
        ...state,
        isTouched: {...state.isTouched, phone: newisTouchedPhoneState},
      };
    }

    case REMOVE_PHONE: {
      console.log('REMOVING PHONE');
      const newPhoneInputs = [...state.inputValues.phone];
      const newPhoneValidity = [...state.inputValidity.phone];
      const newPhoneTouched = [...state.isTouched.phone];
      newPhoneInputs.pop();
      newPhoneValidity.pop();
      newPhoneTouched.pop();
      return {
        ...state,
        inputValues: {...state.inputValues, phone: newPhoneInputs},
        inputValidity: {...state.inputValidity, phone: newPhoneValidity},
        isTouched: {...state.isTouched, phone: newPhoneTouched},
      };
    }

    case STATE_CLEANUP: {
      console.log('Cleaning state');
      return initialState;
    }

    case REQ_VERIFICATION: {
      return {...state, loading: true};
    }

    case REQ_VERIFICATION_SUCCESS: {
      return {...state, loading: false};
    }

    case REQ_VERIFICATION_FAILURE: {
      const newOtp = {...state.otp};
      newOtp.validity = false;
      newOtp.touched = true;
      Alert.alert('Error', action.error);
      return {...state, loading: false, error: action.error, otp: newOtp};
    }

    case UPDATE_OTP: {
      const newOtp = {...state.otp};
      newOtp.value = action.val;
      newOtp.validity = action.validity;
      return {...state, otp: newOtp};
    }

    case BLUR_OTP: {
      const newOtp = {...state.otp};
      newOtp.touched = true;
      return {...state, otp: newOtp};
    }

    case SET_VALID_EMAIL: {
      return {...state, validEmail: action.validity};
    }

    case SET_USER_VERIFIED: {
      console.log('THE USER VERIFIED: ', action.verified);
      return {...state, userVerified: action.verified};
    }

    case RESET_OTP_STATE: {
      return {...state, otp: {...initialState.otp}};
    }

    default:
      return state;
  }
};

export default regIndReducer;
