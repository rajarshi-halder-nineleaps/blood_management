/* eslint-disable prettier/prettier */
import axios from 'axios';
import {
  UPDATE_FIELDS,
  STATE_CLEANUP,
  CONTACT_REQ,
  CONTACT_SUCCESS,
  CONTACT_FAILURE,
} from './actionTypes';

//? REGULAR ACTION CREATORS.

export const updateFields = (val, fieldId) => ({
  type: UPDATE_FIELDS,
  val: val,
  fieldId: fieldId,
});

export const contactReq = () => ({
  type: CONTACT_REQ,
});
export const contactSuccess = () => ({
  type: CONTACT_SUCCESS,
});
export const contactFailure = (error) => ({
  type: CONTACT_FAILURE,
  error,
});

export const stateCleanup = () => ({
  type: STATE_CLEANUP,
});

///////////////////////////////////////////////////////////////////////

//? ASYNCHRONOUS ACTION CREATORS.

export const makeContact = (userToken, contactData) => {
  return async (dispatch) => {
    try {
      console.log('Fetching list of commitments.');
      dispatch(contactReq());
      const response = await axios.post(
        'http://10.0.2.2:8080/contactus/addmessage',
        contactData,
        {
          headers: { Authorization: 'Bearer ' + userToken },
        },
      );

      if (response.headers.success) {
        console.log('response is success!');
        dispatch(contactSuccess());
        dispatch(stateCleanup());
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(contactFailure(response.headers.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          contactFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on contact post request: ', err);
      dispatch(contactFailure(err.message));
    }
  };
};
