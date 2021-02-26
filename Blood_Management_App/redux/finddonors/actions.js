import axios from 'axios';

import { GETDONORLIST, INVITE_SUCCESS } from './actionTypes';
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

export const selectall = (action, array) => ({
  type: SELECT_ALL,
  action: action,
  array: array,
});

export const invitesuccess = (action) => ({
  type: INVITE_SUCCESS,
  action: action
})

export const getDonorList = (userToken, formData) => {
  return async (dispatch) => {
    dispatch(req());
    console.log('Getting Donor List');
    try {
      const response = await axios.post(
        'http://10.0.2.2:8080/finddonors/donorslist', {
        address: formData.address,
        state: formData.state,
        district: formData.district,
        pincode: formData.pincode,
        bloodGroup: formData.blood_group

      },
        {
          headers: { Authorization: 'Bearer ' + userToken },
        },

      );
      console.log('COMPLETE RESPONSE DATA: ', response.data);

      if (response.data.error) {

        console.log(response.headers.error);
      } else if (response.headers.success) {
        console.log('Updating Array');
        dispatch(updateArray(response.data))
        console.log(response.data)

      } else {
        console.log("Failed")
      }
    } catch (err) {
      console.log(err.message);

    }
    // try {
    //   const response = await axios.post(
    //     'http://192.168.43.217:8080/finddonors/donorslist',
    //     {
    //       address: formData.address,
    //       state: formData.state,
    //       district: formData.district,
    //       pincode: formData.pincode,
    //       bloodGroup: formData.blood_group,
    //     },
    //     {headers: {Authorization: 'Bearer ' + userToken}},
    //   );
    //   console.log('COMPLETE RESPONSE DATA: ', response.data);

    //   if (response.headers.error) {
    //     console.log(response.headers.error);
    //   } else if (response.headers.success) {
    //     //? SAVING USER DATA TO ASYNC STORAGE ON SUCCESSFUL LOGIN.

    //     console.log('Saved data to async storage!');
    //     dispatch(updateArray(response.data));
    //     // console.log(response.data);
    //   } else {
    //     console.log('Failed');
    //   }
    // } catch (err) {
    //   console.log(err.message);
    // }
  };
};

export const submitinvite = (userToken, formData, array) => {
  return async (dispatch) => {
    dispatch(req());
    console.log('Submitting Invites', userToken, formData, array);
    try {
      const response = await axios.post(
        'http://10.0.2.2:8080/finddonors/sendnotification',//API INTEGRATION
        {
          address: formData.address,
          state: formData.state,
          district: formData.district,
          pincode: formData.pincode,
          bloodGroup: formData.blood_group,
          idList: array
        },
        { headers: { Authorization: 'Bearer ' + userToken } },
      );
      console.log('COMPLETE RESPONSE DATA: ', response.data);

      if (response.headers.error) {
        console.log(response.headers.error);
      } else if (response.headers.success) {
        dispatch(invitesuccess(true))

        // console.log(response.data);
      } else {
        console.log('Failed');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

}
