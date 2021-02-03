/* eslint-disable prettier/prettier */
import axios from 'axios';
import {
  PROFILE_REQ,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_UPDATE,
} from './actionTypes';

export const profileReq = () => ({type: PROFILE_REQ});

export const profileSuccess = (profileData) => ({
  type: PROFILE_SUCCESS,
  profileData,
});

export const profileFailure = (error) => ({
  type: PROFILE_FAILURE,
  error,
});

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

export const changeDetails = (userToken, newDetails) => {
  return async (dispatch) => {
    try {
      console.log("Fetching user's profile data.");
      dispatch(profileReq());
      const response = await axios.post(
        'http://192.168.43.89:5000/profile',
        newDetails,
        {
          headers: {Authorization: userToken},
        },
      );

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
