/* eslint-disable prettier/prettier */
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  UPDATE_FIELDS,
  STATE_CLEANUP,
  CONTACT_REQ,
  CONTACT_SUCCESS,
  CONTACT_FAILURE,
} from './actionTypes';

//? INITIAL STATE.
const initialState = {
  loading: false,
  error: '',
  inputValues: {
    subject: '',
    message: '',
  },
};

//? REDUCER FUNCTION.
const aboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELDS: {
      const newInputValues = {
        ...state.inputValues,
        [action.fieldId]: action.val,
      };
      return {...state, inputValues: newInputValues};
    }

    case STATE_CLEANUP: {
      console.log('flushing state');
      return initialState;
    }

    case CONTACT_REQ: {
      return {...state, loading: true};
    }
    case CONTACT_SUCCESS: {
      showMessage({
        message: 'Success',
        description:
          'Thankyou for your feedback, we will reach out to you soon.',
        type: 'success',
      });
      console.log('contacted successfully!');
      return {...state, loading: false, error: ''};
    }
    case CONTACT_FAILURE: {
      showMessage({
        message: 'Error',
        description: action.error,
        type: 'error',
      });
      return {...state, loading: false, error: action.error};
    }

    default: {
      return state;
    }
  }
};

export default aboutReducer;
