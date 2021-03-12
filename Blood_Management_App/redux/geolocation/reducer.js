import {showMessage, hideMessage} from 'react-native-flash-message';
import colors from '../../constants/Colors';
import {
  REVERSE_GEOCODING_SUCCESS,
  LOCATION_REQ,
  LOCATION_SUCCESS,
  LOCATION_FAILURE,
  STATE_CLEANUP,
} from './actionTypes';

const initialState = {
  loading: false,
  error: '',
  data: {
    lat: '',
    long: '',
    state: '',
    district: '',
    pincode: '',
  },
};

///////////////////////////////////////////////////////////////////////////

const geolocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_REQ: {
      return {...state, loading: true};
    }

    case LOCATION_FAILURE: {
      console.log('ERROR IN GEOLOCATION REDUCER.', action.error);
      showMessage({
        message: 'Error',
        description: action.error,
        type: 'error',
      });
      return {...state, loading: false, error: action.error};
    }

    case STATE_CLEANUP: {
      return initialState;
    }

    case LOCATION_SUCCESS: {
      const newData = {...state.data};
      newData.lat = action.lat;
      newData.long = action.long;
      return {...state, loading: false, data: newData};
    }

    case REVERSE_GEOCODING_SUCCESS: {
      showMessage({
        message: 'Location detected',
        description: `${action.district}, ${action.state}, [${action.pincode}]`,
        backgroundColor: colors.coolblue,
      });

      const newData = {...state.data};
      newData.state = action.state;
      newData.district = action.district;
      newData.pincode = action.pincode;
      return {...state, loading: false, data: newData};
    }

    default: {
      return state;
    }
  }
};

export default geolocationReducer;
