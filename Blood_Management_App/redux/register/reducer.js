import {
  UPDATE_FIELDS_REG,
  BLUR_FIELDS_REG,
  ADD_PHONE_STATE,
  PHONE_STATE_SET,
  PHONE_TOUCH_SET,
  STATE_CLEANUP,
} from './actionTypes';
import {phoneRegex} from '../../constants/Regexes';

const initialState = {
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
  finalFormState: false,
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
        console.log('new input validity: ', newInputValidity.phone[key]);
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
      console.log('ok blurred');
      const newInputIsTouched = {...state.isTouched, [action.fieldId]: true};
      console.log(newInputIsTouched);
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
        console.log('new input validity: ', newInputValidity.phone[key]);
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

    case STATE_CLEANUP: {
      console.log('Cleaning state');
      return initialState;
    }

    default:
      return state;
  }
};

export default regIndReducer;
