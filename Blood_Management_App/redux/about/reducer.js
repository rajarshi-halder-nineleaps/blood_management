/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {
  UPDATE_FIELDS,
  STATE_CLEANUP,
  CONTACT_REQ,
  CONTACT_SUCCESS,
  CONTACT_FAILURE,
} from './actionTypes';

const initialState = {
  loading: false,
  error: '',
  inputValues: {
    subject: '',
    message: '',
  },
};

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
      Alert.alert(
        'Success',
        'Thankyou for the feedback, we will reach out to you soon.',
      );
      console.log('contacted successfully!');
      return {...state, loading: false, error: ''};
    }
    case CONTACT_FAILURE: {
      Alert.alert('Error', action.error);
      return {...state, loading: false, error: action.error};
    }

    default: {
      return state;
    }
  }
};

export default aboutReducer;
