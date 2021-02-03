/* eslint-disable prettier/prettier */
import axios from 'axios';
import {
  UPDATE_FIELDS,
  STATE_CLEANUP,
  CONTACT_REQ,
  CONTACT_SUCCESS,
  CONTACT_FAILURE,
} from './actionTypes';

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

export const makeContact = (userToken, contactData) => {
  return async (dispatch) => {
    try {
      console.log('Fetching list of commitments.');
      dispatch(contactReq());
      const response = await axios.post(
        'http://192.168.43.89:5000/contact',
        contactData,
        {
          headers: {Authorization: userToken},
        },
      );

      if (response.data.success) {
        console.log('response is success!');
        dispatch(contactSuccess());
        dispatch(stateCleanup());
      } else if (response.data.error) {
        console.log('response is error!');
        dispatch(contactFailure(response.data.error));
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
