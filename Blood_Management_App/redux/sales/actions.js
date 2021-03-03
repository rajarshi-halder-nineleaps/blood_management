/* eslint-disable prettier/prettier */
import axios from 'axios';
import {
  SALES_REQ,
  SALES_SUCCESS,
  SALES_FAILURE,
  UPDATE_MONTH,
  UPDATE_YEAR,
  GET_CURRENT_MONTH,
  GET_THIS_MONTH,
  SET_TODAY,
} from './actionTypes';

export const salesReq = () => ({type: SALES_REQ});
export const salesSuccess = (salesData, analyticsData) => ({
  type: SALES_SUCCESS,
  salesData,
  analyticsData,
});
export const salesFailure = (error) => ({type: SALES_FAILURE, error});

export const updateMonth = (selectedMonth) => ({
  type: UPDATE_MONTH,
  selectedMonth,
});
export const updateYear = (selectedYear) => ({
  type: UPDATE_YEAR,
  selectedYear,
});

export const currentMonthSuccess = (array) => ({
  type: GET_CURRENT_MONTH,
  array,
});

export const thisMonthSuccess = (array) => ({
  type: GET_THIS_MONTH,
  array,
});

export const todaySuccess = (array) => ({
  type: SET_TODAY,
  array,
});

//////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchSalesData = (userToken) => {
  return async (dispatch) => {
    try {
      dispatch(salesReq());
      console.log('making API call');
      const response = await axios.get(
        'http://192.168.43.217:8080/transactions/fetchsaleslist',
        {
          headers: {Authorization: 'Bearer ' + userToken},
        },
      );

      if (response.headers.success) {
        console.log('response is success!');
        //* coordinate with backend for fixing prop names.
        dispatch(salesSuccess(response.data));
      } else if (response.headers.error) {
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

export const getCurrentMonthAnalytics = (month, userToken) => {
  return async (dispatch) => {
    try {
      dispatch(salesReq());
      console.log('making current m API call');
      const response = await axios.get(
        `http://192.168.43.217:8080/salesanalytics/fetchcurrentmonth/${month}`,
        {
          headers: {Authorization: 'Bearer ' + userToken},
        },
      );

      if (response.headers.success) {
        console.log('Analytics is success!', response.headers);
        //* coordinate with backend for fixing prop names.
        dispatch(currentMonthSuccess(response.data));
      } else if (response.headers.error) {
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
      console.log('caught Analytics on myDriveData get request: ', err);
      dispatch(salesFailure(err.message));
    }
  };
};

export const getToday = (userToken) => {
  return async (dispatch) => {
    try {
      dispatch(salesReq());
      console.log('making current m API call');
      const response = await axios.get(
        `http://192.168.43.217:8080/salesanalytics/fetchnow`,
        {
          headers: {Authorization: 'Bearer ' + userToken},
        },
      );

      if (response.headers.success) {
        console.log('Today is success!', response.headers);
        //* coordinate with backend for fixing prop names.
        dispatch(todaySuccess(response.data));
      } else if (response.headers.error) {
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
      console.log('caught Analytics on myDriveData get request: ', err);
      dispatch(salesFailure(err.message));
    }
  };
};

export const getThisMonth = (month, userToken) => {
  return async (dispatch) => {
    try {
      dispatch(salesReq());
      console.log('making current m API call');
      const response = await axios.get(
        `http://192.168.43.217:8080/salesanalytics/fetchcurrentmonth/${month}`,
        {
          headers: {Authorization: 'Bearer ' + userToken},
        },
      );

      if (response.headers.success) {
        console.log('Analytics is success!', response.headers);
        //* coordinate with backend for fixing prop names.
        dispatch(thisMonthSuccess(response.data));
      } else if (response.headers.error) {
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
      console.log('caught Analytics on myDriveData get request: ', err);
      dispatch(salesFailure(err.message));
    }
  };
};
