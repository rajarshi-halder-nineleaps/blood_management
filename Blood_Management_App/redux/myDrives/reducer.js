/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {
  FETCH_DRIVES_REQ,
  FETCH_DRIVES_SUCCESS,
  FETCH_DRIVES_FAILURE,
  DONATION_VERIFICATION,
  RESET_DONE_STATE,
  DRIVE_CANCEL_SUCCESS,
} from './actionTypes';

const initialState = {
  myDrivesData: [],
  loading: false,
  error: '',
  gotData: false,
};

const myDrivesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DRIVES_REQ: {
      return {...state, loading: true};
    }

    case FETCH_DRIVES_SUCCESS: {
      console.log('GET DATA REACHED REDUCER');
      return {
        ...state,
        loading: false,
        error: '',
        myDrivesData: action.myDrivesData,
        gotData: true,
      };
    }

    case FETCH_DRIVES_FAILURE: {
      console.log('failure message reached reducer');
      Alert.alert('error', action.error);
      return {
        ...state,
        loading: false,
        error: action.error,
        myDrivesData: [],
        gotData: false,
      };
    }

    case RESET_DONE_STATE: {
      console.log('reset done state reached reducer!');
      return {
        ...state,
        gotData: false,
      };
    }

    // case DONATION_VERIFICATION: {
    //   console.log('button click to update state reached reducer');
    //   const newState = {...state};
    //   newState.myDrivesData
    //     .filter((val) => val.driveId === action.drive)[0]
    //     .acceptedDonors.filter(
    //       (val) => val.donorId === action.donor,
    //     )[0].hasGivenBlood = true;
    //   console.log('NEWSTATE(()): ', newState.myDrivesData[0].acceptedDonors[0]);
    //   return newState;
    // }

    default:
      return state;
  }
};

export default myDrivesReducer;
