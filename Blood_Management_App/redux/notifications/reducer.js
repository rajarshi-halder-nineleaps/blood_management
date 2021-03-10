import {
  NOTIFICATIONS_REQ,
  NOTIFICATIONS_SUCCESS,
  NOTIFICATIONS_FAILURE,
  NOTIFICATION_STATUS_SET,
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

    case NOTIFICATION_STATUS_SET: {
      const newNotifications = [...state.notifications];
      newNotifications.find(
        (val) => val.notification_id === action.notificationId,
      ).status = true;

      return {
        ...state,
        notifications: newNotifications,
      };
    }

    default:
      return state;
  }
};

export default notificationsReducer;
