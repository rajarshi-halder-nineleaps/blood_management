/* eslint-disable prettier/prettier */
import axios from 'axios';

import {
  COMMITMENTS_REQ,
  COMMITMENTS_SUCCESS,
  COMMITMENTS_FAILURE,
} from './actionTypes';

export const commitmentsReq = () => ({ type: COMMITMENTS_REQ });
export const commitmentsSuccess = (commitmentsList) => ({
  type: COMMITMENTS_SUCCESS,
  commitmentsList,
});
export const commitmentsFailure = (error) => ({
  type: COMMITMENTS_FAILURE,
  error,
});

////////////////////////////////////////////////////////////////////////////

export const fetchCommitments = (userToken) => {
  return async (dispatch) => {
    try {
      console.log('Fetching list of commitments.');
      dispatch(commitmentsReq());
      const response = await axios.get(
        'http://10.0.2.2:8080/commitment',
        {
          headers: { Authorization: 'Bearer ' + userToken },
        },
      );

      if (response.headers.success) {
        console.log('response is success!');
        dispatch(commitmentsSuccess(response.data));
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(commitmentsFailure(response.headers.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          commitmentsFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on commitments get request: ', err);
      dispatch(commitmentsFailure(err.message));
    }
  };
};
