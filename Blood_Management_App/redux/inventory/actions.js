/* eslint-disable prettier/prettier */
import axios from 'axios';
import {
  INV_REQ,
  INV_SUCCESS,
  INV_FAILURE,
  INV_CHANGE,
  EDITING_TOGGLE,
  TOGGLE_SECURE,
} from './actionTypes';

export const invReq = () => ({type: INV_REQ});

export const invFailure = (error) => ({type: INV_FAILURE, error});

export const invSuccess = (invData) => ({type: INV_SUCCESS, invData});

export const updateFields = (val, compIdx, label) => ({
  type: INV_CHANGE,
  val,
  compIdx,
  label,
});

export const editingToggle = (isUpdate) => ({
  type: EDITING_TOGGLE,
  isUpdate,
});

export const toggleSecure = (newSecure) => ({
  type: TOGGLE_SECURE,
  newSecure,
});

// export const invUpdateSuccess = (invData) => ({type: INV_UPDATE, invData});

////////////////////////////////////////////////////////////////////////////

export const checkPassword = (userToken, password) => {
  return async (dispatch) => {
    try {
      dispatch(invReq());
      dispatch(toggleSecure(false));

      const response = await axios.post(
        'http://192.168.43.217:8080/profile/verifycurrentpassword',
        {currentPassword: password},
        {
          headers: {Authorization: 'Bearer ' + userToken},
        },
      );

      if (response.data.success) {
        console.log('response is success!');
        dispatch(toggleSecure(true));
        dispatch(getInventory(userToken));
      } else if (!response.data.success) {
        console.log('response is error!');
        dispatch(invFailure('Invalid password! Please try again.'));
      } else {
        console.log('outlandish error!');
        dispatch(
          invFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on inventory get request: ', err);
      dispatch(invFailure(err.message));
    }
  };
};

export const getInventory = (userToken) => {
  return async (dispatch) => {
    try {
      dispatch(invReq());
      const response = await axios.get(
        'http://192.168.43.217:8080/inventory/receieveinventory',
        {
          headers: {Authorization: 'Bearer ' + userToken},
        },
      );

      if (response.headers.success) {
        console.log('response is success!');
        dispatch(invSuccess(response.data));
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(invFailure(response.headers.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          invFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on inventory get request: ', err);
      dispatch(invFailure(err.message));
    }
  };
};

///////////////////////////////////////////////////////////////////////////////

export const updateInventory = (userToken, userType, inventory) => {
  return async (dispatch) => {
    try {
      dispatch(invReq());
      //*axios put request

      let response = [];

      if (userType === 2) {
        response = await axios.put(
          'http://192.168.43.217:8080/inventory/updatehosinventory',
          inventory,
          {
            headers: {Authorization: 'Bearer ' + userToken},
          },
        );
      } else {
        response = await axios.put(
          'http://192.168.43.217:8080/inventory/updatebbinventory',
          inventory,
          {
            headers: {Authorization: 'Bearer ' + userToken},
          },
        );
      }

      if (response.headers.success) {
        console.log('response is success!');
        dispatch(invSuccess(response.data));
        dispatch(editingToggle(true));
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(invFailure(response.headers.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          invFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on inventory update request: ', err);
      dispatch(invFailure(err.message));
    }
  };
};
