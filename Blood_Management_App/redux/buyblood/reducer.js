import {
  UPDATE_FIELDS_REG, STATE_CLEANUP, BLUR_FIELDS_REG,
  UPDATE_DONOR_ARRAY,
  REQ_FAILURE,
  REQ_SUCCESS
} from './actionTypes'

const initialState = {
  list: [],
  selectAll: false,
  display_results: false,
  boughtit: false,
  tryagain: false,

  inputValues: {
    blood_group: '',
    component: '',
    req_units: '',
    state: '',
    district: '',
    pincode: '',
  },
  inputValidity: {
    blood_group: false,
    component: false,
    req_units: false,
    state: false,
    district: false,
    pincode: false,
  },
  isTouched: {
    blood_group: false,
    component: false,
    req_units: false,
    state: false,
    district: false,
    pincode: false,
  },


};

const buybloodReducer = (state = initialState, action) => {
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
      const newInputIsTouched = { ...state.isTouched, [action.fieldId]: true };
      return { ...state, isTouched: newInputIsTouched };
    }
    case STATE_CLEANUP: {
      console.log('Cleaning state');
      return initialState;
    }

    case UPDATE_DONOR_ARRAY: {
      console.log("updating")

      return {
        ...state,
        list: action.array,
        display_results: true
      }



    }
    case REQ_SUCCESS: {
      return {
        ...state,
        boughtit: true,
        tryagain: false
      }
    }
    case REQ_FAILURE: {
      return {
        ...state,
        boughtit: false,
        tryagain: true
      }
    }

    default:
      return state;
  }
}

export default buybloodReducer