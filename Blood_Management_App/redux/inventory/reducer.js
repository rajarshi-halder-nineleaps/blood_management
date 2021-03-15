/* eslint-disable prettier/prettier */
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  INV_REQ,
  INV_SUCCESS,
  INV_FAILURE,
  INV_CHANGE,
  EDITING_TOGGLE,
  TOGGLE_SECURE,
  STATE_CLEANUP,
} from './actionTypes';

const initialState = {
  invData: [],
  error: '',
  loading: false,
  editing: false,
  secure: false,
  touched: false,
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SECURE: {
      return {
        ...state,
        secure: action.newSecure,
        touched: true,
      };
    }

    case INV_REQ: {
      return {...state, loading: true};
    }
    case INV_FAILURE: {
      if (action.error) {
        showMessage({
          message: 'Error.',
          description: action.error,
          type: 'success',
        });
      }
      return {
        ...state,
        loading: false,
        error: action.error,
        newPasswordValidity: false,
      };
    }
    case INV_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        invData: action.invData,
      };
    }

    case INV_CHANGE: {
      const currGroup = state.invData[action.compIdx];
      currGroup[action.label] = action.val;
      // currGroup.data[action.groupIdx][action.label] = action.val;
      const newInvData = [...state.invData];
      newInvData[action.compIdx] = currGroup;

      return {
        ...state,
        invData: newInvData,
      };
    }

    case EDITING_TOGGLE: {
      if (state.editing && action.isUpdate) {
        console.log('alerting');
        showMessage({
          message: 'Inventory Updated Successfully.',
          type: 'success',
        });
      }
      return {...state, editing: !state.editing};
    }

    case STATE_CLEANUP: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default inventoryReducer;
