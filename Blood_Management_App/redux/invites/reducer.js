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
      return {...state, laoding: true};
    }
    case DREQ_FAILURE: {
      return {
        ...state,
        laoding: false,
        error: action.error,
        invitesList: [],
      };
    }
    case DREQ_SUCCESS: {
      return {
        ...state,
        laoding: false,
        error: '',
        invitesList: action.invitesList,
      };
    }
    case DREQ_UPDATE: {
      const newState = {...state};

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
