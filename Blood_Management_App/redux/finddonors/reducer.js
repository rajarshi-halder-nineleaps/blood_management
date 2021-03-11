import {showMessage, hideMessage} from 'react-native-flash-message';
import colors from '../../constants/Colors';
import {
  UPDATE_FIELDS_REG,
  STATE_CLEANUP,
  BLUR_FIELDS_REG,
  UPDATE_DONOR_ARRAY,
  UPDATE_SUCCESS,
  UPDATE_SELECTED,
  SELECT_ALL,
  INVITE_SUCCESS,
  SET_SELECTED,
} from './actionTypes';

const initialState = {
  list: [],
  selectAll: false,
  display_results: false,
  allselected: false,
  selectedids: [],
  success: false,

  inputValues: {
    address: '',
    state: '',
    district: '',
    pincode: '',
    blood_group: '',
  },
  inputValidity: {
    address: false,
    state: false,
    district: false,
    pincode: true,
    blood_group: false,
  },
  isTouched: {
    address: false,
    state: false,
    district: false,
    pincode: false,
    blood_group: false,
  },
};

const finddonorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELDS_REG: {
      const newInputValue = {
        ...state.inputValues,
        [action.fieldId]: action.val,
      };
      const newInputValidity = {
        ...state.inputValidity,
        [action.fieldId]: action.isValid,
      };

      let newFinalFormState = true;
      for (const key in newInputValidity) {
        newFinalFormState = newFinalFormState && newInputValidity[key];
      }

      return {
        ...state,
        inputValues: newInputValue,
        inputValidity: newInputValidity,
        finalFormState: newFinalFormState,
      };
    }
    case BLUR_FIELDS_REG: {
      const newInputIsTouched = {...state.isTouched, [action.fieldId]: true};
      return {...state, isTouched: newInputIsTouched};
    }
    case STATE_CLEANUP: {
      console.log('Cleaning state');
      return initialState;
    }

    case UPDATE_DONOR_ARRAY: {
      console.log('updating');
      const newArray = action.array.map((e) => {
        return {
          ...e,
          selected: false,
        };
      });
      console.log('done');
      return {
        ...state,
        list: newArray,
        display_results: true,
      };
    }
    case UPDATE_SUCCESS: {
      console.log('done');
      return state;
    }
    case UPDATE_SELECTED: {
      const newState = {...state, loading: false};

      const nState = {...state, loading: false};

      newState.list.find(
        (val) => val.userId === action.item.userId,
      ).selected = !action.item.selected;

      if (
        newState.list.find((val) => val.userId === action.item.userId).selected
      ) {
        nState.selectedids.push(action.item.userId);
      } else {
        nState.selectedids.pop(action.item.userId);
      }

      return nState;
    }
    case SELECT_ALL: {
      let newList = state.list;
      if (newList.find((val) => !val.selected)) {
        newList.forEach((val) => (val.selected = true));
      } else {
        newList.forEach((val) => (val.selected = false));
      }
      return {...state, list: newList};
    }

    case SET_SELECTED: {
      const newList = [...state.list];
      if (!newList[action.idx].selected) {
        newList[action.idx].selected = true;
        console.log('setting to true');
      } else {
        newList[action.idx].selected = false;
        console.log('setting to false');
      }
      return {...state, list: newList};
    }

    case INVITE_SUCCESS: {
      showMessage({
        message: 'Invitations sent',
        description:
          'The donors have been invited. Check "My donation requests" to view the status of the invites. ',
        backgroundColor: colors.coolblue,
      });
      return {
        ...state,
        success: action.action,
      };
    }

    default:
      return state;
  }
};

export default finddonorReducer;
