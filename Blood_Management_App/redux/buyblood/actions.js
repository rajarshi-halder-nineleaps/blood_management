import axios from 'axios';


import { GETDONORLIST } from "./actionTypes";
import {
  UPDATE_FIELDS_REG,
  STATE_CLEANUP,
  BLUR_FIELDS_REG,
  REQ,
  REQ_SUCCESS,
  REQ_FAILURE,
  UPDATE_DONOR_ARRAY
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
  array: array

})

export const reqSuccess = () => ({
  type: REQ_SUCCESS,
});

export const reqFailure = (error) => ({
  type: REQ_FAILURE,
  error: error,
});



export const getBuyBloodList = () => {
  return async (dispatch) => {
    dispatch(req());
    console.log('Getting Donor List');
    try {
      const response = await axios.get(
        'http://10.0.2.2:8000/buybloodlist'

      );
      console.log('COMPLETE RESPONSE DATA: ', response.data);

      if (response.data.error) {
        console.log(response.data.error);
        dispatch(reqFailure)
      } else if (response.data.success) {
        console.log('Saved data to async storage!');
        dispatch(updateArray(response.data.list))
        dispatch(reqSuccess())

      } else {
        console.log("Failed")
      }
    } catch (err) {
      console.log(err.message);

    }
  };


}

export const buyit = (request) => {
  return async (dispatch) => {
    dispatch(req());
    console.log('login works');
    try {
      const response = await axios.post(
        'http://192.168.43.217:8080/authenticate', //IP GOES HERE
        request,
      );
      console.log('COMPLETE RESPONSE DATA: ', response.headers);

      if (response.headers.error) {
        dispatch(reqFailure('Invalid login credentials! Please try again.'));
        console.log(response.headers.error);
      } else if (response.headers.success) {
        dispatch(
          reqSuccess(),
        );
      } else {
        dispatch(
          reqFailure(
            "Something's not right! Please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};
