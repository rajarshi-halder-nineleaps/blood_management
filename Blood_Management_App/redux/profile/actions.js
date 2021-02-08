/* eslint-disable prettier/prettier */
import axios from 'axios';
import {
  PROFILE_REQ,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  USER_SUCCESS,
  DONOR_STATUS_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
  SET_DATA_SAVED,
} from './actionTypes';

export const profileReq = () => ({type: PROFILE_REQ});

export const profileSuccess = (profileData) => ({
  type: PROFILE_SUCCESS,
  profileData,
});

export const userSuccess = (userData) => ({
  type: USER_SUCCESS,
  userData,
});

export const profileFailure = (error) => ({
  type: PROFILE_FAILURE,
  error,
});

export const donorStatusSuccess = (newDonorStatus) => ({
  type: DONOR_STATUS_SUCCESS,
  newDonorStatus,
});

export const profileUpdateSuccess = (newProfileData) => ({
  type: PROFILE_UPDATE_SUCCESS,
  newProfileData,
});

export const setDataSaved = () => ({type: SET_DATA_SAVED});

////////////////////////////////////////////////////////////////////////////////////////////////

export const getUserData = (userToken) => {
  return async (dispatch) => {
    try {
      console.log("Fetching user's minimial data.");
      dispatch(profileReq());
      const response = await axios.get('http://192.168.43.89:5000/userdata', {
        headers: {Authorization: userToken},
      });

      if (response.data.success) {
        console.log('response is success!');
        dispatch(userSuccess(response.data.userData));
      } else if (response.data.error) {
        console.log('response is error!');
        dispatch(profileFailure(response.data.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          profileFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on profile get request: ', err);
      dispatch(profileFailure(err.message));
    }
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////

export const getProfileData = (userToken) => {
  return async (dispatch) => {
    try {
      console.log("Fetching user's profile data.");
      dispatch(profileReq());
      const response = await axios.get('http://192.168.43.89:5000/profile', {
        headers: {Authorization: userToken},
      });

      if (response.data.success) {
        console.log('response is success!');
        dispatch(profileSuccess(response.data.profileData));
      } else if (response.data.error) {
        console.log('response is error!');
        dispatch(profileFailure(response.data.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          profileFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on profile get request: ', err);
      dispatch(profileFailure(err.message));
    }
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////

export const changeDetails = (userToken, newDetails) => {
  return async (dispatch) => {
    try {
      console.log("Fetching user's profile data.");
      dispatch(profileReq());
      const response = await axios.put(
        'http://192.168.43.89:5000/profile',
        newDetails,
        {
          headers: {Authorization: userToken},
        },
      );

      if (response.data.success) {
        console.log('response is success!');
        dispatch(profileUpdateSuccess(newDetails));
      } else if (response.data.error) {
        console.log('response is error!');
        dispatch(profileFailure(response.data.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          profileFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on profile get request: ', err);
      dispatch(profileFailure(err.message));
    }
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

export const setDonorStatus = (userToken, newDonorStatus) => {
  return async (dispatch) => {
    try {
      console.log("Fetching user's profile data.");
      dispatch(profileReq());
      const response = await axios.put(
        'http://192.168.43.89:5000/toggledonor',
        {newDonorStatus},
        {
          headers: {Authorization: userToken},
        },
      );

      if (response.data.success) {
        console.log('response is success!');
        console.log(newDonorStatus);

        dispatch(donorStatusSuccess(newDonorStatus));
      } else if (response.data.error) {
        console.log('response is error!');
        dispatch(profileFailure(response.data.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          profileFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on profile get request: ', err);
      dispatch(profileFailure(err.message));
    }
  };
};
