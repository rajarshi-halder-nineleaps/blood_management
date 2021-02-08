import axios from 'axios';
import {
    DONORLIST_SUCCESS,
    DONORLIST_REQ,
    DONORLIST_FAILURE
  } from './actionTypes';

  export const donorListreq = () => ({
    type: DONORLIST_REQ,
  });

  export const donorListSuccess = (donorList) => ({
    type: DONORLIST_SUCCESS,
    donorList,
  });

  export const donorListFailure = (error) => ({
    type: DONORLIST_FAILURE,
    error,
  });

  

  export const getactivedonorList = () => {
    return async (dispatch) => {
      dispatch(donorListreq());
      console.log('Getting Active Donor List');
      try {
        const response = await axios.get(
          'http://10.0.2.2:8000/activedonorrequest'
          
        );
        console.log('COMPLETE RESPONSE DATA: ', response.data);
    
        if (response.data.error) {
          dispatch(donorListFailure(response.data.error))
          
          console.log(response.data.error);
        } else if (response.data.success) {
          //? SAVING USER DATA TO ASYNC STORAGE ON SUCCESSFUL LOGIN.
          
          
          console.log('Saved data to async storage!');
          dispatch(donorListSuccess(response.data.list))
        
        } else {
          dispatch(donorListFailure("Something went wrong!"))
         console.log("Failed")
        }
      } catch (err) {
        console.log(err.message);
        dispatch(donorListFailure(err))
        
      }
    };

    
  }
  