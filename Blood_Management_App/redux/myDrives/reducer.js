/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {
  FETCH_DRIVES_REQ,
  FETCH_DRIVES_SUCCESS,
  DRIVE_CANCEL_SUCCESS,
  FETCH_LIST_SUCCESS,
  FETCH_DRIVES_FAILURE,
  DONATION_VERIFICATION,
} from './actionTypes';

const initialState = {
  myDrivesData: [],
  donorsList: [],
  loading: false,
  error: '',
};

const myDrivesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DRIVES_REQ: {
      return {...state, loading: true};
    }

    case FETCH_DRIVES_FAILURE: {
      console.log('failure message reached reducer');
      Alert.alert('error', action.error);
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case FETCH_DRIVES_SUCCESS: {
      console.log('GET DATA REACHED REDUCER');
      return {
        ...state,
        loading: false,
        error: '',
        myDrivesData: action.myDrivesData,
      };
    }

    case FETCH_LIST_SUCCESS: {
      console.log('Donors list reached reducer!');
      return {
        ...state,
        loading: false,
        error: '',
        donorsList: action.donorsList,
      };
    }

    case DRIVE_CANCEL_SUCCESS: {
      console.log('cancelled drive data reached reducer!', action);
      
      const cancelledDrive = state.myDrivesData.find(val => val.driveId === action.driveId);
      const cancelledDriveIdx = state.myDrivesData.findIndex(val => val.driveId === action.driveId);


      cancelledDrive.status = false;
      

      const newDrivesData = [...state.myDrivesData];
      newDrivesData[cancelledDriveIdx] = cancelledDrive;

      return {...state, loading: false, myDrivesData: newDrivesData};
    }

    case DONATION_VERIFICATION: {
      const newDonorsList = [...state.donorsList];
      newDonorsList.find(
        (val) => val.useId === action.userId,
      ).donationStatus = true;

      return {...state, loading: false, donorsList: newDonorsList};
    }

    default:
      return state;
  }
};

export default myDrivesReducer;
