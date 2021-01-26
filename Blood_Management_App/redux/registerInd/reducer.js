import {UPDATE_FIELDS_REG, BLUR_FIELDS_REG, STATE_CLEANUP} from './actionTypes';

const initialState = {
  inputValues: {
    name: '',
    email: '',
    phone: '',
    dob: new Date(),
    bloodgroup: '',
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
    phone: false,
    dob: false,
    bloodgroup: false,
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
    phone: false,
    dob: false,
    bloodgroup: false,
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

const regReducer = (state = initialState, action) => {
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
      for (const key in newInputValidity) {
        newFinalFormState = newFinalFormState && newInputValidity[key];
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

    case STATE_CLEANUP: {
      console.log('Cleaning state');
      return initialState;
    }

    default:
      return state;
  }
};

export default regReducer;
