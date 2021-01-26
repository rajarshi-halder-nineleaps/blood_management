import {
  RETRIEVE_TOKEN,
  LOGIN_REQ,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQ,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from './actionTypes';

const initialState = {
  isLoggedIn: false,
  response: {},
  loading: false,
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQ: {
      console.log('login request started!');
      return {...state, loading: true};
    }

    case LOGIN_SUCCESS: {
      //* here, we are getting the payload data.
      console.log('loading: false');
      return {
        ...state,
        loading: false,
        response: action.payload,
        isLoggedIn: true,
      };
    }

    case LOGIN_FAILURE: {
      //* here, we are getting the payload data.
      console.log('loading: false');
      return {...state, loading: false, error: action.error};
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    case REGISTER_REQ: {
      console.log('register request started!');
      return {...state, loading: true};
    }

    case REGISTER_SUCCESS: {
      //* here, we are getting the payload data.
      console.log('loading: false');
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        response: action.payload,
        isLoggedIn: true,
      };
    }

    case REGISTER_FAILURE: {
      //* here, we are getting the payload data.
      console.log('loading: false');
      return {...state, loading: false, error: action.error};
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    default:
      return state;
  }
};

export default authReducer;

