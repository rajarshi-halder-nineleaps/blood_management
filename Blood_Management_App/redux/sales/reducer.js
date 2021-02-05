/* eslint-disable prettier/prettier */
import {SALES_REQ, SALES_SUCCESS, SALES_FAILURE} from './actionTypes';

const initialState = {
  loading: false,
  error: '',
  salesData: [],
  analyticsData: {},
};

const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SALES_REQ: {
      return {...state, loading: true};
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
  }
};

export default salesReducer;
