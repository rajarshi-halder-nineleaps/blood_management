import {
  UPDATE_FIELDS_REG, STATE_CLEANUP, BLUR_FIELDS_REG,
  UPDATE_DONOR_ARRAY,
  UPDATE_SUCCESS
} from './actionTypes'

const initialState = {
  list: [],
  selectAll: false,
  display_results: false,

  inputValues: {
    selectedState: '',
    selectedDistrict: '',
    pincode: '',
    blood_group: '',
    blood_compoment: '',
    units: 0,



  },
  inputValidity: {
    selectedState: false,
    selectedDistrict: false,
    pincode: false,
    blood_group: false,
    blood_compoment: false,
    units: false
  },
  isTouched: {
    selectedState: false,
    selectedDistrict: false,
    pincode: false,
    blood_group: false,
    blood_compoment: false,
    units: false
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
    case UPDATE_SUCCESS: {
      console.log("done")
    }

    default:
      return state;
  }
}

export default buybloodReducer