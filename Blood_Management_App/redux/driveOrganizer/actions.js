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
} from './actionTypes';

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const organizeReq = () => ({
  type: ORGANIZE_REQ,
});

export const organizeSuccess = (driveId) => ({
  type: ORGANIZE_SUCCESS,
  driveId: driveId,
});

export const organizeFailure = (error) => ({
  type: ORGANIZE_FAILURE,
  error: error,
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

export const organizeDriveConfirm = (userToken, newDriveData) => {
  console.log('data reached organizeDriveConfirm');
  console.log(newDriveData);
  return async (dispatch) => {
    try {
      dispatch(organizeReq());
      const response = await axios.post('API URI', newDriveData, {
        headers: {Authorization: userToken},
      });

      if (response.data.success) {
        console.log('response is success!');
        dispatch(organizeSuccess(response.data.driveId));
      } else if (response.data.error) {
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
