import axios from 'axios';
import {
  NOTIFICATIONS_REQ,
  NOTIFICATIONS_SUCCESS,
  NOTIFICATIONS_FAILURE,
} from './actionTypes';

export const notificationReq = () => ({
  type: NOTIFICATIONS_REQ,
});

export const notificationSuccess = (notifications) => ({
  type: NOTIFICATIONS_SUCCESS,
  notifications,
});

export const notificationFailure = (error) => ({
  type: NOTIFICATIONS_FAILURE,
  error,
});

export const fetchNotifications = (userToken) => {
  return async (dispatch) => {
    try {
      console.log('Fetching list of notifications.');
      dispatch(notificationReq());
      const response = await axios.get(
        'http://192.168.43.217:8080/notifications',
        {
          headers: {Authorization: 'Bearer ' + userToken},
        },
      );

      if (response.headers.success) {
        console.log('response is success!');
        // console.log('RESPONSE DATA: ' + response.data[0].district);
        console.log(response.data);
        dispatch(notificationSuccess(response.data));
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(notificationFailure(response.headers.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          notificationFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on notifications get request: ', err);
      dispatch(notificationFailure(err.message));
    }
  };
};
