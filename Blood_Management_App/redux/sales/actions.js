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
  GET_REQUESTED_MONTH,
  GET_REQUESTED_BREAKOUT,
  STOCK_INFO,
} from './actionTypes';

export const salesReq = () => ({ type: SALES_REQ });
export const salesSuccess = (salesData, analyticsData) => ({
  type: SALES_SUCCESS,
  salesData,
  analyticsData,
});
export const salesFailure = (error) => ({ type: SALES_FAILURE, error });

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

export const StockInfoSucess = (array) => ({
  type: STOCK_INFO,
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

export const breakoutSuccess = (array) => ({
  type: GET_REQUESTED_BREAKOUT,
  array,
});

//////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchSalesData = (userToken) => {
  return async (dispatch) => {
    try {
      dispatch(salesReq());
      console.log('making API call');
      const response = await axios.get(
        'http://10.0.2.2:8080/transactions/fetchsaleslist',
        {
          headers: { Authorization: 'Bearer ' + userToken },
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

export const getCurrentMonthAnalytics = (year, userToken) => {
  return async (dispatch) => {
    try {
      dispatch(salesReq());
      console.log('making current m API call');
      const response = await axios.get(
        `http://10.0.2.2:8080/salesanalytics/yearly/${year}/0`,
        {
          headers: { Authorization: 'Bearer ' + userToken },
        },
      );

      if (response.headers.success) {
        console.log('Analytics is success!', response.data.datasets[0].data);
        //* coordinate with backend for fixing prop names.
        dispatch(currentMonthSuccess(response.data.datasets[0].data));
        console.log(response.data.datasets);
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

export const getMonthlyBreakout = (year, month, userToken) => {
  return async (dispatch) => {
    try {
      dispatch(salesReq());
      console.log('making current m API call');
      const response = await axios.get(
        `http://10.0.2.2:8080/salesanalytics/monthly/${year}/${month}/0`,
        {
          headers: { Authorization: 'Bearer ' + userToken },
        },
      );

      if (response.headers.success) {
        console.log(
          'Analytics breakout is success!',
          response.data.datasets[0],
        );
        //* coordinate with backend for fixing prop names.
        dispatch(breakoutSuccess(response.data.datasets[0].data));
        console.log(response.data.datasets);
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

export const getStockInfo = (userToken, year, month, type) => {
  return async (dispatch) => {
    try {
      if (month === 'All') {
        dispatch(salesReq());
        console.log('making current m API call');
        const response = await axios.get(
          `http://10.0.2.2:8080/salesanalytics/yearly/${year}/${type}`,
          {
            headers: { Authorization: 'Bearer ' + userToken },
          },
        );
        if (response.headers.success) {
          console.log('Analytics is success!', response.data.datasets[0].data);
          //* coordinate with backend for fixing prop names.
          dispatch(StockInfoSucess(response.data.datasets[0].data));
          console.log(response.data.datasets);
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
      } else {
        dispatch(salesReq());
        console.log('making current m API call');
        const response = await axios.get(
          `http://10.0.2.2:8080/salesanalytics/monthly/${year}/${month}/${type}`,
          {
            headers: { Authorization: 'Bearer ' + userToken },
          },
        );
        if (response.headers.success) {
          console.log('Analytics is success!', response.data.datasets[0].data);
          //* coordinate with backend for fixing prop names.
          dispatch(StockInfoSucess(response.data.datasets[0].data));
          console.log(response.data.datasets);
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
        'http:/10.0.2.2:8080/salesanalytics/fetchnow',
        {
          headers: { Authorization: 'Bearer ' + userToken },
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
        `http://10.0.2.2:8080/salesanalytics/fetchcurrentmonth/${month}`,
        {
          headers: { Authorization: 'Bearer ' + userToken },
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
