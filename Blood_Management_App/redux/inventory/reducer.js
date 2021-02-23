/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {
  INV_REQ,
  INV_SUCCESS,
  INV_FAILURE,
  INV_CHANGE,
  EDITING_TOGGLE,
  TOGGLE_SECURE,
} from './actionTypes';

const initialState = {
  invData: [],
  error: '',
  loading: false,
  editing: false,
  secure: false,
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {

    case TOGGLE_SECURE: {
      return {...state, secure: action.newSecure}
    }

    case INV_REQ: {
      return {...state, loading: true};
    }
    case INV_FAILURE: {
      Alert.alert('Error', action.error);
      return {...state, loading: false, error: action.error};
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
        Alert.alert('Updated', 'Inventory updated successfully!');
      }
      return {...state, editing: !state.editing};
    }

    default: {
      return state;
    }
  }
};

export default inventoryReducer;
