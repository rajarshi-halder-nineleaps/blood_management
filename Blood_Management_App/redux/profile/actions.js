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
  REMOVE_PHONE,
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
      console.log("Fetching user's minimial ");
      dispatch(profileReq());
      const response = await axios.get(
        'http://192.168.43.217:8080/profile/fetchuserprofile',
        {
          headers: {Authorization: 'Bearer ' + userToken},
        },
      );

      if (response.headers.success) {
        console.log('response is success!');

        dispatch(userSuccess(response.data));
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(profileFailure(response.headers.error));
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
      const response = await axios.get(
        'http://192.168.43.217:8080/profile/fetchuserdata',
        {
          headers: {Authorization: 'Bearer ' + userToken},
        },
      );

      if (response.headers.success) {
        console.log('Data', response.data);
        console.log('response is success!');
        dispatch(profileSuccess(response.data));
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(profileFailure(response.headers.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          profileFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on profile data fetch: ', err);
      dispatch(profileFailure(err.message));
    }
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////

export const changeDetails = (userToken, userType, newDetails) => {
  return async (dispatch) => {
    try {
      console.log('Updating user details.');
      dispatch(profileReq());
      let response = {};

      if (userType === 1) {
        response = await axios.put(
          'http://192.168.43.217:8080/profile/updateindprofile',
          newDetails,
          {
            headers: {Authorization: 'Bearer ' + userToken},
          },
        );
      } else if (userType === 2) {
        response = await axios.put(
          'http://192.168.43.217:8080/profile/updatehosprofile',
          newDetails,
          {
            headers: {Authorization: 'Bearer ' + userToken},
          },
        );
      } else {
        response = await axios.put(
          'http://192.168.43.217:8080/profile/updatebbprofile',
          newDetails,
          {
            headers: {Authorization: 'Bearer ' + userToken},
          },
        );
      }

      if (response.headers.success) {
        console.log('response is success!');
        dispatch(profileUpdateSuccess(newDetails));
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(profileFailure(response.headers.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          profileFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on profile data change: ', err);
      dispatch(profileFailure(err.message));
    }
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

export const setDonorStatus = (userToken, newDonorStatus) => {
  return async (dispatch) => {
    try {
      console.log('Toggling donor.');
      // dispatch(profileReq());
      const response = await axios.put(
        'http://192.168.43.217:8080/profile/donorstatus',
        {donorStatus: newDonorStatus},
        {
          headers: {Authorization: 'Bearer ' + userToken},
        },
      );

      if (response.headers.success) {
        console.log('response is success!');
        console.log(newDonorStatus);

        dispatch(donorStatusSuccess(response.data.donorStatus));
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(profileFailure(response.headers.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          profileFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on toggle donor status: ', err);
      dispatch(profileFailure(err.message));
    }
  };
};
