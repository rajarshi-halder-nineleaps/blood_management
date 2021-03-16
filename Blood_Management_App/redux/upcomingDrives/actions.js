/* eslint-disable prettier/prettier */
import axios from 'axios';
import {
  DRIVE_FIND_REQ,
  DRIVE_FIND_FAILURE,
  DRIVE_FIND_SUCCESS,
  DRIVE_REGISTER_SUCCESS,
  UPDATE_FIELDS_DRIVE_FILTER,
  BLUR_FIELDS_DRIVE_FILTER,
  STATE_CLEANUP,
} from './actionTypes';

//? sets loading to true thereby showing activityIndicator
export const driveFindReq = () => ({ type: DRIVE_FIND_REQ });

export const driveFindFailure = (error) => ({
  type: DRIVE_FIND_FAILURE,
  error,
});

export const driveFindSuccess = (upcomingDrivesList) => ({
  type: DRIVE_FIND_SUCCESS,
  upcomingDrivesList,
});

//? INVOKED ONLY AFTER THE USER HAS REGISTERED FOR A DRIVE AT BACK END.
export const driveRegisterSuccess = () => ({
  type: DRIVE_REGISTER_SUCCESS,
});

export const stateCleanup = () => ({
  type: STATE_CLEANUP,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const upcomingDrivesSearch = (userToken, searchFilters) => {
  return async (dispatch) => {
    console.log('search filters', searchFilters);
    try {
      dispatch(driveFindReq());
      const response = await axios.post(
        'http://10.0.2.2:8080/upcomingdrives/fetchdriveslist',
        {
          state: searchFilters.selectedState,
          district: searchFilters.selectedDistrict,
          pincode: searchFilters.pincode,
        },
        {
          headers: { Authorization: 'Bearer ' + userToken },
        },
      );

      if (response.headers.success) {
        //* coordinate with backend team to fixate on the names of response object props.
        console.log('Data fetch call responded with success!');
        dispatch(driveFindSuccess(response.data));
      } else if (response.headers.error) {
        console.log('error while fetching upcomingDrivesList data');
        dispatch(driveFindFailure(response.headers.error));
      } else {
        console.log('Outlandish error on upcomingDrives data fetch call');
        dispatch(
          driveFindFailure(
            "Something's not right! Please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on upcomingDrives data fetch call', err);
      dispatch(driveFindFailure(err.message));
    }
  };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//? ACTION CREATOR TO REGISTER USER FOR A DRIVE.

export const registerUserForDrive = (userToken, driveId) => {
  return async (dispatch) => {
    try {
      console.log(
        'Initialtion API call for user registration for drive',
        driveId,
      );
      dispatch(driveFindReq());
      const response = await axios.post(
        'http://10.0.2.2:8080/upcomingdrives/registerfordrive',
        { driveId },
        {
          headers: { Authorization: 'Bearer ' + userToken },
        },
      );

      if (response.headers.success) {
        console.log('Data fetch call responded with success!');
        dispatch(driveRegisterSuccess());
      } else if (response.headers.error) {
        console.log(
          'user might already be registered for this particular drive',
        );
        dispatch(driveFindFailure(response.headers.error));
      } else {
        console.log('Outlandish error on registering user for a drive post');
        dispatch(
          driveFindFailure(
            "Something's not right! Please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on registering user for a drive', err);
      dispatch(driveFindFailure(err.message));
    }
  };
};
