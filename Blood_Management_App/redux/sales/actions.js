/* eslint-disable prettier/prettier */
import axios from 'axios';
import {SALES_REQ, SALES_SUCCESS, SALES_FAILURE} from './actionTypes';

export const salesReq = () => ({type: SALES_REQ});
export const salesSuccess = (salesData) => ({
  type: SALES_SUCCESS,
  salesData,
});
export const salesFailure = (error) => ({type: SALES_FAILURE, error});

//////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchSalesData = (userToken) => {
  return async (dispatch) => {
    try {
      dispatch(salesReq());
      console.log('making API call');
      const response = await axios.get('http://192.168.43.217:8080/transactions/fetchsaleslist', {
        headers: {Authorization: 'Bearer ' + userToken},
      });

      if (response.headers.success) {
        console.log('response is success!');
        dispatch(
          salesSuccess(response.data),
        );
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(salesFailure(response.headers.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          salesFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on myDriveData get request: ', err);
      dispatch(salesFailure(err.message));
    }
  };
};
