import {
  NOTIFICATIONS_REQ,
  NOTIFICATIONS_SUCCESS,
  NOTIFICATIONS_FAILURE,
} from './actionTypes';

const initialState = {
  loading: false,
  error: '',
  notifications: [],
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATIONS_REQ: {
      return {...state, loading: true};
    }

    case NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        notifications: action.notifications,
      };
    }

    case NOTIFICATIONS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
};

export default notificationsReducer;
