/* eslint-disable prettier/prettier */
import {DREQ_REQ, DREQ_SUCCESS, DREQ_FAILURE, DREQ_UPDATE} from './actionTypes';

const initialState = {
  loading: false,
  error: '',
  invitesList: [],
};

const invitesReducer = (state = initialState, action) => {
  switch (action.type) {
    case DREQ_REQ: {
      return {...state, loading: true};
    }
    case DREQ_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        invitesList: [],
      };
    }
    case DREQ_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        invitesList: action.invitesList,
      };
    }
    case DREQ_UPDATE: {
      const newState = {...state, loading: false};

      if (action.udata.driveId) {
        newState.invitesList.find(
          (val) => val.driveId === action.udata.driveId,
        ).status = action.udata.status;
      } else {
        newState.invitesList.find(
          (val) => val.donationId === action.udata.donationId,
        ).status = action.udata.status;
      }
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default invitesReducer;
