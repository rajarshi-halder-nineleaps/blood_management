/* eslint-disable prettier/prettier */
import {
  FETCH_DRIVES_REQ,
  FETCH_DRIVES_SUCCESS,
  FETCH_DRIVES_FAILURE,
  DONATION_VERIFICATION,
  RESET_DONE_STATE,
} from './actionTypes';
import axios from 'axios';

export const fetchDrivesReq = () => ({
  type: FETCH_DRIVES_REQ,
});

export const fetchDriveSuccess = (myDrivesData) => ({
  type: FETCH_DRIVES_SUCCESS,
  myDrivesData: myDrivesData,
});

export const fetchDriveFailure = (error) => ({
  type: FETCH_DRIVES_FAILURE,
  error: error,
});

export const donationVerification = (drive, donor) => ({
  type: DONATION_VERIFICATION,
  drive: drive,
  donor: donor,
});

export const resetDoneState = () => ({
  type: RESET_DONE_STATE,
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getDriveData = (userToken) => {
  return async (dispatch) => {
    dispatch(fetchDrivesReq());
    try {
      console.log('sending axios get request!');
      const response = await axios.get('http://192.168.43.89:5000/mydrives', {
        headers: {Authorization: userToken},
      });

      if (response.data.success) {
        console.log('response is success!');
        dispatch(fetchDriveSuccess(response.data.driveData));
      } else if (response.data.error) {
        console.log('response is error!');
        dispatch(fetchDriveFailure(response.data.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          fetchDriveFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on myDriveData get request: ', err);
      dispatch(fetchDriveFailure(err.message));
    }
  };
};

//todo make an action creator for double posting.

export const doubleDataPoster = (userToken, driveId, donorId) => {
  return async (dispatch) => {
    console.log(
      'double data posting api request for my donation drives started!',
    );
    try {
      //todo finsih this
      //TODO DOUBT: THERE ARE 2 POSTS, WHAT IF ONE SUCCEEDS AND THE OTHER DOESNT
      //* theres a solution, u send a single post request to the back end and let them handle it beacuse they can check if one is done or both are.
      dispatch(fetchDrivesReq());
      console.log("posting updated data to current user's records");
      const response = await axios.post(
        'http://192.168.43.89:5000/mydrives',
        {driveId, donorId},
        {
          headers: {Authorization: userToken},
        },
      );

      if (response.data.success) {
        console.log("posted data to both user's and donor's records");
        //* coordinate with back end team to fixate on this response with the same name.
        dispatch(fetchDriveSuccess(response.data.driveData));
      } else if (response.data.error) {
        dispatch(fetchDriveFailure(response.data.error));
      } else {
        //* Anandhu: This is the place where misplacing a single curly bracket crashed my whole App. Took me 4 hours to figure it out.
        dispatch(
          fetchDriveFailure(
            "Something's not right! Please try after some time.",
          ),
        );
      }
    } catch (err) {
      dispatch(fetchDriveFailure(err.message));
      console.log(
        'Error caught while double data posting in my donation drives.',
        err.message,
      );
    }
  };
};
