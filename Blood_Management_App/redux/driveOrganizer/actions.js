/* eslint-disable prettier/prettier */

import axios from 'axios';
import {
  UPDATE_FIELDS_ORGANIZER,
  BLUR_FIELDS_ORGANIZER,
  STATE_CLEANUP,
  ORGANIZE_REQ,
  ORGANIZE_SUCCESS,
  ORGANIZE_FAILURE,
  TOGGLE_BLOOD_GROUP,
  SET_DATE,
} from './actionTypes';


//? REGULAR ACTION CREATORS.
export const updateFields = (val, fieldId, isValid) => ({
  type: UPDATE_FIELDS_ORGANIZER,
  val: val,
  fieldId: fieldId,
  isValid: isValid,
});

export const blurFields = (fieldId) => ({
  type: BLUR_FIELDS_ORGANIZER,
  fieldId: fieldId,
});

export const stateCleanup = () => ({
  type: STATE_CLEANUP,
});

export const toggleBloodGroup = (item) => ({
  type: TOGGLE_BLOOD_GROUP,
  item: item,
});


export const organizeReq = () => ({
  type: ORGANIZE_REQ,
});

export const organizeSuccess = () => ({
  type: ORGANIZE_SUCCESS,
});

export const organizeFailure = (error) => ({
  type: ORGANIZE_FAILURE,
  error: error,
});

export const setDateTime = (date) => {
  return {
    type: SET_DATE,
    date,
  };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

//? ASYNCHRONOUS ACTION CREATORS.

export const organizeDriveConfirm = (userToken, newDriveData) => {
  console.log('data reached organizeDriveConfirm');
  console.log(newDriveData, userToken);
  console.log(newDriveData.startDate.toLocaleDateString() + '');
  return async (dispatch) => {
    try {
      dispatch(organizeReq());
      const response = await axios.post(
        'http://192.168.43.217:8080/conductadrive/savedrivedetails',
        {
          startTimeStamp: null,
          endTimeStamp: null,
          bloodGroups: newDriveData.bloodgroup,
          address: newDriveData.address,
          state: newDriveData.selectedState,
          district: newDriveData.selectedDistrict,
          pincode: newDriveData.pincode,
          message: newDriveData.message,
        },
        {
          headers: {Authorization: 'Bearer ' + userToken},
        },
      );

      if (response.headers.success) {
        console.log('response is success!');

        dispatch(organizeSuccess());
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(organizeFailure(response.data.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          organizeFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on myDriveData get request: ', err);
      dispatch(organizeFailure(err.message));
    }
  };
};
