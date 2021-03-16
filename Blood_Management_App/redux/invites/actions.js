import axios from 'axios';
import { DREQ_REQ, DREQ_SUCCESS, DREQ_FAILURE, DREQ_UPDATE } from './actionTypes';

export const invitesReq = () => ({
  type: DREQ_REQ,
});

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
      const response = await axios.get(
        'http://192.168.43.217:8080/invites/fetchinvites',
        {
          headers: { Authorization: 'Bearer ' + userToken },
        },
      );

      if (response.headers.success) {
        console.log('response is success!');
        // console.log('RESPONSE DATA: ' + response.data[0].district);
        dispatch(invitesSuccess(response.data));
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(invitesFailure(response.headers.error));
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
        'http://192.168.43.217:8080/invites/inviteresponse',
        updatedData,
        {
          headers: { Authorization: 'Bearer ' + userToken },
        },
      );

      if (response.headers.success) {
        console.log('response is success!');
        console.log('RESPONSE DATA' + response.data);
        dispatch(invitesUpdate(updatedData));
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(invitesFailure(response.headers.error));
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
