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

export const updateFields = (val, groupIdx, label, idx) => ({
  type: INV_CHANGE,
  val,
  groupIdx,
  label,
  idx,
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
        'http://192.168.43.89:5000/currentpassword',
        {password},
        {
          headers: {Authorization: userToken},
        },
      );

      if (response.data.success) {
        console.log('response is success!');
        dispatch(toggleSecure(true));
        dispatch(getInventory(userToken));
      } else if (response.data.error) {
        console.log('response is error!');
        dispatch(invFailure(response.data.error));
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
      const response = await axios.get('http://192.168.43.89:5000/inventory', {
        headers: {Authorization: userToken},
      });

      if (response.data.success) {
        console.log('response is success!');
        dispatch(invSuccess(response.data.inventoryData));
      } else if (response.data.error) {
        console.log('response is error!');
        dispatch(invFailure(response.data.error));
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

export const updateInventory = (userToken, inventory) => {
  return async (dispatch) => {
    try {
      dispatch(invReq());
      //*axios put request
      const response = await axios.put(
        'http://192.168.43.89:5000/inventory',
        inventory,
        {
          headers: {Authorization: userToken},
        },
      );

      if (response.data.success) {
        console.log('response is success!');
        dispatch(invSuccess(response.data.inventoryData));
        dispatch(editingToggle(true));
      } else if (response.data.error) {
        console.log('response is error!');
        dispatch(invFailure(response.data.error));
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
