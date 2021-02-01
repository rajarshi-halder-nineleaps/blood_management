import {
  COMMITMENTS_REQ,
  COMMITMENTS_SUCCESS,
  COMMITMENTS_FAILURE,
} from './actionTypes';

const initialState = {
  loading: false,
  commitmentsList: [],
  error: '',
};

const commitmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMITMENTS_REQ: {
      return {...state, loading: true};
    }
    case COMMITMENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        commitmentsList: action.commitmentsList,
      };
    }
    case COMMITMENTS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        commitmentsList: [],
      };
    }
    default: {
      return state;
    }
  }
};
export default commitmentsReducer;
