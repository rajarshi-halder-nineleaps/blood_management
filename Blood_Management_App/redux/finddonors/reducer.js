import {
  UPDATE_FIELDS_REG,
  STATE_CLEANUP,
  BLUR_FIELDS_REG,
  UPDATE_DONOR_ARRAY,
  UPDATE_SUCCESS,
  UPDATE_SELECTED,
  SELECT_ALL,
  INVITE_SUCCESS
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
    pincode: false,
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
      const newInputIsTouched = { ...state.isTouched, [action.fieldId]: true };
      return { ...state, isTouched: newInputIsTouched };
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
      const newState = { ...state, loading: false };

      const nState = { ...state, loading: false };

      newState.list.find((val) => val.userId === action.item.userId).selected = !action
        .item.selected;



      if (newState.list.find((val) => val.userId === action.item.userId).selected) {
        nState.selectedids.push(action.item.userId);
      } else {
        nState.selectedids.pop(action.item.userId)
      }

      return nState;
    }
    case SELECT_ALL: {
      console.log('updating');
      const nState = { ...state, loading: false };
      const newArray = action.array.map((e) => {

        return {
          ...e,
          selected: action.action,
        };

      });
      console.log("hi", newArray)

      newArray.forEach(id => {
        if (action.action ? true : false) {
          nState.selectedids.push(id.userId)
        } else {
          nState.selectedids.pop(id.userId)
        }
      })

      // newArray.forEach(val => val.selected = action.action){

      // }

      // if (newArray.find((val) => val.id === action.item.id).selected) {
      //   nState.selectedids.push(action.item.id);
      // } else {
      //   nState.selectedids.pop(action.item.id)
      // }


      // if (action.action ? true : false) {
      //   newArray.forEach(item => {
      //     nState.selectedids.push(item.id)
      //   })

      // } else {
      //   newArray.forEach(item => {
      //     nState.selectedids.pop()
      //   })
      // }

      console.log('done', nState.selectedids);

      return {
        ...state,
        list: newArray,
        allselected: !initialState.allselected,
      };



    }
    case INVITE_SUCCESS: {
      console.log("invite sent successfully");
      return {
        ...state,
        success: action.action
      }
    }


    default:
      return state;
  }
};

export default finddonorReducer;
