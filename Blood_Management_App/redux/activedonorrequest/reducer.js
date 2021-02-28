import {
  DONORLIST_REQ,
  DONORLIST_SUCCESS,
  DONORLIST_FAILURE,
  DONORLIST_UPDATE,
  DONOR_DETAILS_LIST_REQ,
  DONOR_DETAILS_LIST_FAILURE,
  DONOR_DETAILS_LIST_SUCCESS,
  DONOR_DETAILS_LIST_UPDATE,
  EXPIRE_FAILURE,
  EXPIRE_SUCCESS
} from './actionTypes'

const initialState = {
  loading: false,
  donorList: [],
  donorDetailsList: [],
  error: '',
  expired: false
};

const activedonorReducer = (state = initialState, action) => {
  switch (action.type) {

    case DONORLIST_REQ: {
      return { ...state, loading: true };
    }
    case DONORLIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        donorList: action.donorList,
      };
    }
    case DONORLIST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        donorList: [],
      };
    }
    case DONORLIST_UPDATE: {
      const newState = { ...state, loading: false };


      newState.donorList.find(
        (val) => val.id === action.udata.id,
      ).hasgiven = action.udata.hasgiven;

      return newState;
    }
    case DONOR_DETAILS_LIST_REQ: {
      return { ...state, loading: true };
    }

    case DONOR_DETAILS_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        donorDetailsList: action.donorDetailsList,
      };
    }
    case DONOR_DETAILS_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        donorDetailsList: [],
      };
    }
    case EXPIRE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        expired: true
      };
    }
    default: {
      return state;
    }
  }
}

export default activedonorReducer