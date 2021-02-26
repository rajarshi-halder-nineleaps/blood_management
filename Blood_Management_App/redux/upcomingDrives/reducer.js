/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {
  DRIVE_FIND_REQ,
  DRIVE_FIND_FAILURE,
  DRIVE_FIND_SUCCESS,
  DRIVE_REGISTER_SUCCESS,
  UPDATE_FIELDS_DRIVE_FILTER,
  BLUR_FIELDS_DRIVE_FILTER,
  STATE_CLEANUP,
} from './actionTypes';

const initialState = {
  loading: false,
  upcomingDrivesList: [],
  error: '',
  gotData: false,
  registerSuccess: false,
};

const upcomingDrivesReducer = (state = initialState, action) => {
  switch (action.type) {
    case DRIVE_FIND_REQ: {
      return {...state, loading: true, registerSuccess: false};
    }
    case DRIVE_FIND_FAILURE: {
      console.log('Drive find failure reached reducer.');
      Alert.alert('Invalid action', action.error);
      return {...state, error: action.error, loading: false};
    }
    case DRIVE_FIND_SUCCESS: {
      console.log('upcomingDrives data reached reducer.');
      return {
        ...state,
        upcomingDrivesList: action.upcomingDrivesList,
        error: '',
        gotData: true,
        loading: false,
      };
    }
    case DRIVE_REGISTER_SUCCESS: {
      Alert.alert(
        'Success',
        'You have successsfully registered for this drive!',
      );
      return {...state, loading: false, registerSuccess: true};
    }

    case STATE_CLEANUP: {
      console.log('state cleanup performed!');
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default upcomingDrivesReducer;
