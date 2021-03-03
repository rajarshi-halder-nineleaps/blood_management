/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {
  PROFILE_REQ,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  USER_SUCCESS,
  DONOR_STATUS_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
  SET_DATA_SAVED,
} from './actionTypes';

const initialState = {
  profileData: {phone: []},
  userData: {},
  error: '',
  loading: false,
  dataSaved: false,
};

// userid, name,  bloodgroup, address, email, phone number[s], [dob], photo, [liscence number,option to add more phone numbers]

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_REQ: {
      return {...state, loading: true, dataSaved: false};
    }
    case PROFILE_SUCCESS: {
      console.log('got profile data');
      return {
        ...state,
        loading: false,
        profileData: action.profileData,
        error: '',
      };
    }
    case USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        userData: action.userData,
        error: '',
      };
    }
    case PROFILE_FAILURE: {
      Alert.alert('error', action.error);
      return {...state, loading: false, error: action.error};
    }

    case DONOR_STATUS_SUCCESS: {
      const newUserData = {
        ...state.userData,
        donorStatus: action.newDonorStatus,
      };

      return {...state, loading: false, userData: newUserData};
    }

    case PROFILE_UPDATE_SUCCESS: {
      const newProfileData = {
        ...state.profileData,
        ...action.newProfileData,
      };
      return {
        ...state,
        loading: false,
        profileData: newProfileData,
        dataSaved: true,
      };
    }

    case SET_DATA_SAVED: {
      return {
        ...state,
        dataSaved: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default profileReducer;
