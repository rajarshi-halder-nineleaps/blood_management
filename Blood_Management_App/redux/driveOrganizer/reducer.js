/* eslint-disable prettier/prettier */
import {showMessage, hideMessage} from 'react-native-flash-message';

import {
  UPDATE_FIELDS_ORGANIZER,
  BLUR_FIELDS_ORGANIZER,
  STATE_CLEANUP,
  ORGANIZE_REQ,
  ORGANIZE_SUCCESS,
  ORGANIZE_FAILURE,
  SET_DATE,
} from './actionTypes';

//? INITIAL STATE
const initialState = {
  start: new Date(),
  inputValues: {
    startDate: new Date(),
    endDate: new Date(),
    bloodgroup: [],
    address: '',
    selectedState: '',
    selectedDistrict: '',
    pincode: '',
    message: '',
  },
  inputValidity: {
    startDate: false,
    endDate: false,
    bloodgroup: false,
    address: false,
    selectedState: false,
    selectedDistrict: false,
    pincode: false,
    message: true,
  },
  isTouched: {
    startDate: false,
    endDate: false,
    bloodgroup: false,
    address: false,
    selectedState: false,
    selectedDistrict: false,
    pincode: false,
    message: false,
  },
  finalFormState: false,
  loading: false,
  driveId: '',
  error: '',
};

///////////////////////////////////////////////////////////////////////////////////////

//? REDUCER FUNCTION.
const driveOrganizerReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELDS_ORGANIZER: {
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

    case BLUR_FIELDS_ORGANIZER: {
      const newInputIsTouched = {...state.isTouched, [action.fieldId]: true};
      return {...state, isTouched: newInputIsTouched};
    }

    case STATE_CLEANUP: {
      console.log('Cleaning state');
      return initialState;
    }

    case ORGANIZE_REQ: {
      return {...state, loading: true};
    }
    case ORGANIZE_SUCCESS: {
      showMessage({
        message: 'Success',
        description: 'Drive organized successfully.',
        type: 'success',
      });
      return {...state, loading: false, error: ''};
    }
    case ORGANIZE_FAILURE: {
      showMessage({
        message: 'Error',
        description: action.error,
        type: 'error',
      });
      return {...state, loading: false, error: action.error, driveId: ''};
    }
    case SET_DATE: {
      console.log('setting date');
      return {
        ...state,
        start: action.date,
      };
    }

    default:
      return state;
  }
};

export default driveOrganizerReducer;
