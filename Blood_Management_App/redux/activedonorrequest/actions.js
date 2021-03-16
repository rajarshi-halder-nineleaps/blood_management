import axios from 'axios';
import { Alert } from 'react-native';
import {
  DONORLIST_SUCCESS,
  DONORLIST_REQ,
  DONORLIST_FAILURE,
  DONORLIST_UPDATE,
  EXPIRE_SUCCESS,
  EXPIRE_FAILURE,
  DONOR_DETAILS_LIST_REQ,
  DONOR_DETAILS_LIST_FAILURE,
  DONOR_DETAILS_LIST_SUCCESS,
  DONOR_DETAILS_LIST_UPDATE,
} from './actionTypes';
import { showMessage, hideMessage } from 'react-native-flash-message';

export const donorListreq = () => ({
  type: DONORLIST_REQ,
});

export const donorListSuccess = (donorList) => ({
  type: DONORLIST_SUCCESS,
  donorList,
});

export const donorListFailure = (error) => ({
  type: DONORLIST_FAILURE,
  error,
});

export const listUpdate = (udata) => ({
  type: DONORLIST_UPDATE,
  udata,
});

export const donorDetailsListreq = (detailsList) => ({
  type: DONOR_DETAILS_LIST_REQ,
});

export const donorDetailsListSuccess = (donorDetailsList) => ({
  type: DONOR_DETAILS_LIST_SUCCESS,
  donorDetailsList,
});

export const donorDetailsListFailure = (error) => ({
  type: DONOR_DETAILS_LIST_FAILURE,
  error,
});

export const expireFailure = (error) => ({
  type: EXPIRE_FAILURE,
  error,
});

export const expireSuccess = () => ({
  type: EXPIRE_SUCCESS,
});

export const getactivedonorList = (userToken) => {
  return async (dispatch) => {
    dispatch(donorListreq());
    console.log('Getting Active Donor List');
    try {
      const response = await axios.get(
        'http://10.0.2.2:8080/donationrequests/fetchrequests',
        {
          headers: { Authorization: 'Bearer ' + userToken },
        },
      );
      console.log('COMPLETE RESPONSE DATA: ', response.headers);

      if (response.headers.error) {
        dispatch(donorListFailure(response.data.error));

        console.log(response.headers.error);
      } else if (response.headers.success) {
        //? SAVING USER DATA TO ASYNC STORAGE ON SUCCESSFUL LOGIN.

        console.log('Saved data to async storage!', response.data);
        dispatch(donorListSuccess(response.data));
      } else {
        dispatch(donorListFailure('Something went wrong!'));
        console.log('Failed');
      }
    } catch (err) {
      console.log(err.message);
      dispatch(donorListFailure(err));
    }
  };
};

export const getdonationdetails = (userToken, donationId) => {
  return async (dispatch) => {
    dispatch(donorDetailsListreq());
    console.log('Getting Active Donor List');
    try {
      const response = await axios.get(
        `http://10.0.2.2:8080/donationrequests/fetchdonationdonorlist/${donationId}`,
        {
          headers: { Authorization: 'Bearer ' + userToken },
        },
      );
      console.log('COMPLETE RESPONSE DATA: ', response.headers);

      if (response.headers.error) {
        dispatch(donorDetailsListFailure(response.data.error));

        console.log(response.headers.error);
      } else if (response.headers.success) {
        //? SAVING USER DATA TO ASYNC STORAGE ON SUCCESSFUL LOGIN.

        console.log('Saved data to async storage!', response.data);
        dispatch(donorDetailsListSuccess(response.data));
      } else {
        dispatch(donorDetailsListFailure('Something went wrong!'));
        console.log('Failed');
      }
    } catch (err) {
      console.log(err.message);
      dispatch(donorDetailsListFailure(err));
    }
  };
};

export const expirerequest = (userToken, donationId) => {
  return async (dispatch) => {
    console.log('Expiring Donation');
    try {
      const response = await axios.put(
        `http://10.0.2.2:8080/donationrequests/expirerequest`,
        {
          donationId: donationId,
        },
        {
          headers: { Authorization: 'Bearer ' + userToken },
        },
      );
      console.log('COMPLETE RESPONSE DATA: ', response.headers);

      if (response.headers.error) {
        //dispatch(expireFailure(response.data.error))

        console.log(response.headers.error);
      } else if (response.headers.success) {
        //? SAVING USER DATA TO ASYNC STORAGE ON SUCCESSFUL LOGIN.
        dispatch(getactivedonorList(userToken));
        Alert.alert('Drive has Expired', 'Drived has been expired', [
          { text: 'Okay' },
        ]);
      } else {
        dispatch(expireFailure('Something went wrong!'));
        console.log('Failed');
      }
    } catch (err) {
      console.log(err.message);
      dispatch(expireFailure(err));
    }
  };
};

export const verifydonor = (userToken, userId, donationId) => {
  return async (dispatch) => {
    console.log('Expiring Donation');
    try {
      const response = await axios.put(
        `http://10.0.2.2:8080/donationrequests/donationdonorverification`,
        {
          donationId: donationId,
          userId: userId,
        },
        {
          headers: { Authorization: 'Bearer ' + userToken },
        },
      );
      console.log('COMPLETE RESPONSE DATA: ', response.headers);

      if (response.headers.error) {
        //dispatch(expireFailure(response.data.error))

        console.log(response.headers.error);
      } else if (response.headers.success) {
        //? SAVING USER DATA TO ASYNC STORAGE ON SUCCESSFUL LOGIN.
        dispatch(getdonationdetails(userToken, donationId));
        Alert.alert('Verified', 'User Successfully Verified', [{ text: 'Okay' }]);
      } else {
        dispatch(donorListFailure('Something went wrong!'));
        console.log('Failed');
      }
    } catch (err) {
      console.log(err.message);
      dispatch(expireFailure(err));
    }
  };
};

export const updateRequestList = (userToken, updatedData) => {
  console.log('Updater dispatched!');
  return async (dispatch) => {
    try {
      console.log('updating list of invites.');
      dispatch(donorListreq());
      const response = await axios.put(
        'http://10.0.2.2:8080:8000/activedonorrequest',
        updatedData,
        {
          headers: { Authorization: userToken },
        },
      );

      if (response.data.success) {
        console.log('response is success!');
        dispatch(listUpdate(updatedData));
        console.log('ok');
      } else if (response.data.error) {
        console.log('response is error!');
        dispatch(donorListFailure(response.data.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          donorListFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on invites put request: ', err);
      dispatch(donorListFailure(err.message));
    }
  };
};
