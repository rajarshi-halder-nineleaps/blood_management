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

      if (action.udata.eventType === 'drive') {
        newState.invitesList.find(
          (val) => val.driveId === action.udata.eventId,
        ).status = action.udata.acceptance;
      } else {
        newState.invitesList.find(
          (val) => val.donationId === action.udata.eventId,
        ).status = action.udata.acceptance;
      }
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default invitesReducer;
