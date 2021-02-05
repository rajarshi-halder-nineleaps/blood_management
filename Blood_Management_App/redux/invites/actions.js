/* eslint-disable prettier/prettier */
import axios from 'axios';
import {DREQ_REQ, DREQ_SUCCESS, DREQ_FAILURE, DREQ_UPDATE} from './actionTypes';

export const invitesReq = () => ({type: DREQ_REQ});

export const invitesSuccess = (invitesList) => ({
  type: DREQ_SUCCESS,
  invitesList,
});

export const invitesFailure = (error) => ({
  type: DREQ_FAILURE,
  error,
});

export const invitesUpdate = (udata) => ({
  type: DREQ_UPDATE,
  udata,
});

/////////////////////////////////////////////////////////////////////////////////////////

export const fetchInvitesList = (userToken) => {
  return async (dispatch) => {
    try {
      console.log('Fetching list of invites.');
      dispatch(invitesReq());
      const response = await axios.get('http://192.168.43.89:5000/invites', {
        headers: {Authorization: userToken},
      });

      if (response.data.success) {
        console.log('response is success!');
        dispatch(invitesSuccess(response.data.invitesList));
      } else if (response.data.error) {
        console.log('response is error!');
        dispatch(invitesFailure(response.data.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          invitesFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on invites get request: ', err);
      dispatch(invitesFailure(err.message));
    }
  };
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

//* remember to structure the request object based on invite type before dispatching this
export const updateInvitesList = (userToken, updatedData) => {
  console.log('Updater dispatched!');
  return async (dispatch) => {
    try {
      console.log('updating list of invites.');
      dispatch(invitesReq());
      const response = await axios.put(
        'http://192.168.43.89:5000/invites',
        updatedData,
        {
          headers: {Authorization: userToken},
        },
      );

      if (response.data.success) {
        console.log('response is success!');
        dispatch(invitesUpdate(updatedData));
      } else if (response.data.error) {
        console.log('response is error!');
        dispatch(invitesFailure(response.data.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          invitesFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on invites put request: ', err);
      dispatch(invitesFailure(err.message));
    }
  };
};
