/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {
  PROFILE_REQ,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_UPDATE,
} from './actionTypes';

const initialState = {
  profileData: {},
  error: '',
  loading: false,
};

// userid, name,  bloodgroup, address, email, phone number[s], [dob], photo, [liscence number,option to add more phone numbers]

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_REQ: {
      return {...state, loading: true};
    }
    case PROFILE_SUCCESS: {
      return {...state, loading: false, profileData: action.profileData};
    }
    case PROFILE_FAILURE: {
      return {...state, loading: false, error: action.error};
    }
    default: {
      return state;
    }
  }
};

export default profileReducer;
