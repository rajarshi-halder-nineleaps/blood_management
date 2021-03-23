/* eslint-disable prettier/prettier */
import { SALES_REQ, SALES_SUCCESS, SALES_FAILURE, UPDATE_YEAR, UPDATE_MONTH, GET_CURRENT_MONTH, GET_THIS_MONTH, SET_TODAY, GET_REQUESTED_BREAKOUT, STOCK_INFO } from './actionTypes';

const initialState = {
  loading: false,
  error: '',
  salesData: [],
  analyticsData: {},
  selectedYear: '',
  selectedMonth: '',
  currentMonthData: {},
  currentMonthAnalyticsArray: [],
  currentMonthSuccess: false,
  thisMonthData: [],
  thisMonthSuccess: false,
  todaysData: {},
  todayLoading: false,
  breakoutData: [],
  stockinfo: [],
  yeardata: [],
  monthdata: []



};

const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SALES_REQ: {
      return { ...state, loading: true };
    }
    case SALES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        salesData: action.salesData,
        analyticsData: action.analyticsData,
      };
    }
    case SALES_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        salesData: [],
        analyticsData: {},
      };
    }
    default: {
      return state;
    }
    case UPDATE_YEAR: {
      return {
        ...state,
        selectedYear: action.selectedYear
      };
    }
    case UPDATE_MONTH: {
      return {
        ...state,
        selectedMonth: action.selectedMonth
      };
    }
    case GET_CURRENT_MONTH: {
      console.log(action.array.bloodObject)

      var obj = [
        {
          data: action.array.bloodObject,
          svg: { fill: '#8800cc' },
        },
        {
          data: action.array.plasmaObject,
          svg: { fill: 'green' },
        }
      ]

      return {
        ...state,
        yeardata: obj,
        currentMonthSuccess: true,
        //currentMonthAnalyticsArray: action.array.data
      }
    }
    case GET_THIS_MONTH: {
      return {
        ...state,
        thisMonthData: action.array,
        thisMonthSuccess: true
        //currentMonthAnalyticsArray: action.array.data
      }
    }
    case SET_TODAY: {
      return {
        ...state,
        todaysData: action.array,
        todayLoading: false
      }
    }
    case GET_REQUESTED_BREAKOUT: {
      var obj = [
        {
          data: action.array.bloodObject,
          svg: { fill: '#8800cc' },
        },
        {
          data: action.array.plasmaObject,
          svg: { fill: 'green' },
        },
        {
          data: action.array.plateletObject,
          svg: { fill: 'red' },
        }
      ]

      return {
        ...state,
        monthdata: obj
      }
    }
    case STOCK_INFO: {
      return {
        ...state,
        stockinfo: action.array
      }
    }
  }
};

export default salesReducer;
