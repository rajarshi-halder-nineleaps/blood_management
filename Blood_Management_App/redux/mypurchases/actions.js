import axios from 'axios';


import { GETDONORLIST } from "./actionTypes";
import {
    UPDATE_FIELDS_REG,
    STATE_CLEANUP,
    BLUR_FIELDS_REG,
    REQ,
    UPDATE_SUCCESS,
    REQ_FAILURE,
    UPDATE_MYPURCHASE_ARRAY
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
    type: UPDATE_MYPURCHASE_ARRAY,
    array:array

  })

  

  export const getmypurchasesList = () => {
    return async (dispatch) => {
      dispatch(req());
      console.log('Getting Donor List');
      try {
        const response = await axios.get(
          'http://10.0.2.2:8000/mypurchases'
          
        );
        console.log('COMPLETE RESPONSE DATA: ', response.data);
    
        if (response.data.error) {
          
          console.log(response.data.error);
        } else if (response.data.success) {
          //? SAVING USER DATA TO ASYNC STORAGE ON SUCCESSFUL LOGIN.
          
          
          console.log('Saved data to async storage!');
          dispatch(updateArray(response.data.mypurchases))
        
        } else {
         console.log("Failed")
        }
      } catch (err) {
        console.log(err.message);
        
      }
    };

    
  }
  