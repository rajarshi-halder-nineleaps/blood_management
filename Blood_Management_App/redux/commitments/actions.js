/* eslint-disable prettier/prettier */
import axios from 'axios';

import {
  COMMITMENTS_REQ,
  COMMITMENTS_SUCCESS,
  COMMITMENTS_FAILURE,
} from './actionTypes';

export const commitmentsReq = () => ({type: COMMITMENTS_REQ});
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
        'http://192.168.43.89:5000/commitments',
        {
          headers: {Authorization: userToken},
        },
      );

      if (response.data.success) {
        console.log('response is success!');
        dispatch(commitmentsSuccess(response.data.commitmentsList));
      } else if (response.data.error) {
        console.log('response is error!');
        dispatch(commitmentsFailure(response.data.error));
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
