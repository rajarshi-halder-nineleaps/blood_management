import axios from 'axios';
import {
  NOTIFICATIONS_REQ,
  NOTIFICATIONS_SUCCESS,
  NOTIFICATIONS_FAILURE,
  NOTIFICATION_STATUS_SET,
} from './actionTypes';

//? REGULAR ACTION CREATORS.

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

export const notificationStatusSet = (notificationId) => ({
  type: NOTIFICATION_STATUS_SET,
  notificationId,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//? ASYNCHRONOUS ACTION CREATORS.

export const fetchNotifications = (userToken) => {
  return async (dispatch) => {
    try {
      console.log('Fetching list of notifications.');
      dispatch(notificationReq());
      const response = await axios.get(
        'http://192.168.43.217:8080/notifications/fetchnotifications',
        {
          headers: {Authorization: 'Bearer ' + userToken},
        },
      );

      if (response.headers.success) {
        console.log('response is success!');
        // console.log('RESPONSE DATA: ' + response.data[0].district);
        console.log(response.data);
        dispatch(notificationSuccess(response.data.reverse()));
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

export const setNotificationStatus = (userToken, notificationId) => {
  return async (dispatch) => {
    try {
      console.log('setting notification status');

      //? HERE, WE WON'T BE NEEDING AN ACTIVITY INDICATOR, but if needed, uncomment the line below.
      // dispatch(notificationReq());
      const response = await axios.put(
        'http://192.168.43.217:8080/notifications/setstatus',
        {notificationId},
        {
          headers: {Authorization: 'Bearer ' + userToken},
        },
      );

      if (response.headers.success) {
        console.log('response is success!');
        // console.log('RESPONSE DATA: ' + response.data[0].district);
        console.log(response.data);
        //? WE MODIFY THE STATE HERE WITH ANOTHER DISPATCH TO REFLECT THE CHANGE THAT HAPPENED.
        dispatch(notificationStatusSet(notificationId));
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
      console.log('caught error on notifications set state put request: ', err);
      dispatch(notificationFailure(err.message));
    }
  };
};

export const setDonationEligibilityNotification = (userToken, eligibility) => {
  return async (dispatch) => {
    try {
      console.log('Setting donor eligibility.');
      dispatch(notificationReq());
      const response = await axios.post(
        'http://192.168.43.217:8080/setdonornotification',
        {eligibility},
        {
          headers: {Authorization: 'Bearer ' + userToken},
        },
      );

      if (response.headers.success) {
        console.log('response is success!');
        // dispatch(notificationSuccess(response.data));
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
