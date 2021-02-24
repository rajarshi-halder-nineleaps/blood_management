import axios from 'axios';

import {GETDONORLIST} from './actionTypes';
import {
  UPDATE_FIELDS_REG,
  STATE_CLEANUP,
  BLUR_FIELDS_REG,
  REQ,
  UPDATE_SUCCESS,
  REQ_FAILURE,
  UPDATE_DONOR_ARRAY,
  UPDATE_SELECTED,
  SELECT_ALL,
} from './actionTypes';

export const req = () => ({
  type: REQ,
});

export const updateFields = (val, fieldId, isValid) => ({
  type: UPDATE_FIELDS_REG,
  val: val,
  fieldId: fieldId,
  isValid: isValid,
});
export const blurFields = (fieldId) => ({
  type: BLUR_FIELDS_REG,
  fieldId: fieldId,
});

export const stateCleanup = () => ({
  type: STATE_CLEANUP,
});

export const updateArray = (array) => ({
  type: UPDATE_DONOR_ARRAY,
  array: array,
});

export const updateselected = (item) => ({
  type: UPDATE_SELECTED,
  item: item,
});

export const selectall = (array) => ({
  type: SELECT_ALL,
  array: array,
});

export const getDonorList = (userToken, formData) => {
  return async (dispatch) => {
    dispatch(req());
    console.log('Getting Donor List');
    try {
      const response = await axios.post(
        'http://192.168.43.217:8080/finddonors/donorslist',
        {
          address: formData.address,
          state: formData.state,
          district: formData.district,
          pincode: formData.pincode,
          bloodGroup: formData.blood_group,
        },
        {headers: {Authorization: 'Bearer ' + userToken}},
      );
      console.log('COMPLETE RESPONSE DATA: ', response.data);

      if (response.headers.error) {
        console.log(response.headers.error);
      } else if (response.headers.success) {
        //? SAVING USER DATA TO ASYNC STORAGE ON SUCCESSFUL LOGIN.

        console.log('Saved data to async storage!');
        dispatch(updateArray(response.data));
        // console.log(response.data);
      } else {
        console.log('Failed');
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};
