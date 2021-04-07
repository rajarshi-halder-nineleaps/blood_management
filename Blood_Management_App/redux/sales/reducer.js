/* eslint-disable prettier/prettier */
import {
  SALES_REQ,
  SALES_SUCCESS,
  SALES_FAILURE,
  UPDATE_YEAR,
  UPDATE_MONTH,
  GET_CURRENT_MONTH,
  GET_THIS_MONTH,
  SET_TODAY,
  GET_REQUESTED_BREAKOUT,
  STOCK_INFO,
  YEAR_SUCCESS,

  MONTH_BOUGHT_SUCCESS,
  MONTH_REASON_SUCCESS,
  MONTH_REVENUE_SUCCESS,
  MONTH_SOLD_SUCCESS,
  MONTH_SPENT_SUCCESS,


  CURRENT_MONTH_BOUGHT_SUCCESS,
  CURRENT_MONTH_REASON_SUCCESS,
  CURRENT_MONTH_SUCCESS,
  CURRENT_MONTH_SOLD_SUCCESS,
  CURRENT_MONTH_SPENT_SUCCESS,
} from './actionTypes';

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
  monthdata: [],




  bloodObjectCurrentMonth: [],
  plasmaObjectCurrentMonth: [],
  plateletObjectCurrentMonth: [],
  currentMonthObj: {},
  typeOf: 0,


  currentMonthRevenue: {},
  currentMonthSold: {},
  monthRevenue: '',

  totalPie: [],
  searchedMonthRevenue: {},
  searchedMonthSold: {},
  monthSearched: false,

  currentMonth: {},
  currentMonthSoldStat: {},

  yearPlasmaObject: [],
  yearPlateletObject: [],
  yearBloodObject: [],
  typeOfGraph: 0,
  yearBloodTotal: 0,
  yearPlasmaTotal: 0,
  yearPlateletTotal: 0,
  yearTotal: 0



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
    case YEAR_SUCCESS: {
      console.log(action.typeOf)
      console.log("year data: ", action.array)
      var totalall = action.array.totalBlood + action.array.totalPlasma + action.array.totalPlatelet;

      return {
        ...state,
        yearPlasmaObject: action.array.plasmaObject,
        yearPlateletObject: action.array.plateletObject,
        yearBloodObject: action.array.bloodObject,
        yearBloodTotal: action.array.totalBlood.toFixed(2),
        yearPlasmaTotal: action.array.totalPlasma.toFixed(2),
        yearPlateletTotal: action.array.totalPlatelet.toFixed(2),
        yearTotal: totalall.toFixed(2),
        typeOfGraph: action.typeOf,
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
        monthdata: obj,
        bloodObjectMonth: action.array.bloodObject,
        plasmaObjectMonth: action.array.plasmaObject,
        plateletObjectMonth: action.array.plateletObject
      }
    }
    case STOCK_INFO: {
      return {
        ...state,
        stockinfo: action.array
      }
    }




    case CURRENT_MONTH_SUCCESS: {
      console.log("Revenue Object", action.array, action.typeOf)
      var monthRevenue = action.array.totalBlood + action.array.totalPlasma + action.array.totalPlatelet;
      var obj1 = {
        total: monthRevenue.toFixed(2),
        totalBlood: action.array.totalBlood.toFixed(2),
        totalPlasma: action.array.totalPlasma.toFixed(2),
        totalPlatelet: action.array.totalPlatelet.toFixed(2),
      }
      var total = [action.array.totalBlood, action.array.totalPlasma, action.array.totalPlatelet]

      return {
        ...state,
        // currentmonth.totalRevenue :
        //monthRevenue: monthRevenue
        currentMonthObj: obj1,
        bloodObjectCurrentMonth: action.array.bloodObject,
        plasmaObjectCurrentMonth: action.array.plasmaObject,
        plateletObjectCurrentMonth: action.array.plateletObject,
        typeOf: action.typeOf,
        totalPie: total

      }
    }
    case CURRENT_MONTH_SOLD_SUCCESS: {
      console.log("Sold Object", action.array)
      var monthSold = action.array.totalBlood + action.array.totalPlasma + action.array.totalPlatelet;
      var obj2 = {
        totalSold: monthSold.toFixed(0),
        totalBlood: action.array.totalBlood.toFixed(0),
        totalPlasma: action.array.totalPlasma.toFixed(0),
        totalPlatelet: action.array.totalPlatelet.toFixed(0),
      }

      var obj3 = {
        bloodObjectCurrentMonth: action.array.bloodObject,
        plasmaObjectCurrentMonthSold: action.array.plasmaObject,
        plateletObjectCurrentMonthSold: action.array.plateletObject
      }

      return {
        ...state,
        currentMonthSold: obj2,
        currentMonthSoldStat: obj3


      }
    }
    case MONTH_REVENUE_SUCCESS: {
      console.log("Searched Revenue Object", action.array)
      var monthRevenue = action.array.totalBlood + action.array.totalPlasma + action.array.totalPlatelet;
      var obj1 = {
        totalRevenue: monthRevenue.toFixed(2),
        totalBlood: action.array.totalBlood.toFixed(2),
        totalPlasma: action.array.totalPlasma.toFixed(2),
        totalPlatelet: action.array.totalPlatelet.toFixed(2),
      }

      return {
        ...state,
        // currentmonth.totalRevenue :
        //monthRevenue: monthRevenue
        searchedMonthRevenue: obj1,
        bloodObjectMonth: action.array.bloodObject,
        plasmaObjectMonth: action.array.plasmaObject,
        plateletObjectMonth: action.array.plateletObject,
        monthSearched: true

      }
    }
  }
};

export default salesReducer;
