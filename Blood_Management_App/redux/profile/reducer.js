/* eslint-disable prettier/prettier */
import {showMessage, hideMessage} from 'react-native-flash-message';
import colors from '../../constants/Colors';
import {
  PROFILE_REQ,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  USER_SUCCESS,
  DONOR_STATUS_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
  SET_DATA_SAVED,
  SET_AVATAR,
  UPLOAD_PROGRESS,
  UPLOADING,
} from './actionTypes';

const initialState = {
  profileData: {phone: []},
  userData: {},
  error: '',
  loading: false,
  dataSaved: false,
  uploading: false,
  uploadProgress: 0,
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
      showMessage({
        message: 'Error',
        description: action.error,
        type: 'danger',
      });
      return {...state, loading: false, error: action.error, uploading: false};
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

    case SET_AVATAR: {
      showMessage({
        message: 'Looking good in your new avatar.',
        description: 'Avatar updated successfully!',
        type: 'success',
      });
      const newUserData = {...state.userData};
      newUserData.profilePicture = action.image;
      return {...state, userData: newUserData, uploading: false};
    }

    case UPLOADING: {
      showMessage({
        message: 'Uploading ...',
        description:
          "Your avatar is being uploaded in the background, please don't disable your interner connection.",
        backgroundColor: colors.coolblue,
      });
      return {...state, uploading: true};
    }

    default: {
      return state;
    }
  }
};

export default profileReducer;
