/* eslint-disable prettier/prettier */
import axios from 'axios';
import { SALES_REQ, SALES_SUCCESS, SALES_FAILURE, UPDATE_MONTH, UPDATE_YEAR } from './actionTypes';

export const salesReq = () => ({ type: SALES_REQ });
export const salesSuccess = (salesData, analyticsData) => ({
  type: SALES_SUCCESS,
  salesData,
  analyticsData,
});
export const salesFailure = (error) => ({ type: SALES_FAILURE, error });

export const updateMonth = (selectedMonth) => ({
  type: UPDATE_MONTH,
  selectedMonth
})
export const updateYear = (selectedYear) => ({
  type: UPDATE_YEAR,
  selectedYear
})



//////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchSalesData = (userToken) => {
  return async (dispatch) => {
    try {
      dispatch(salesReq());
      console.log('making API call');
      const response = await axios.get('http://10.0.2.2:8000/sales', {
        headers: { Authorization: userToken },
      });

      if (response.data.success) {
        console.log('response is success!');
        //* coordinate with backend for fixing prop names.
        dispatch(
          salesSuccess(response.data.salesData, response.data.analyticsData),
        );
      } else if (response.data.error) {
        console.log('response is error!');
        dispatch(salesFailure(response.data.error));
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
