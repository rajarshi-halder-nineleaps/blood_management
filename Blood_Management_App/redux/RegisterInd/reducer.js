import { UPDATE_INPUT_STATE, INPUT_FOCUS_OUT } from "./actionTypes";

//* HERE, THE INITIAL STATE CAN EITHER BE UPDATED WITH API DATA, IN CASE OF GOOGLE REGISTER, OR WILL BE EMPTY.
const dummyAPIdata = false;

const initialState = {
  inputValues: {
    name: dummyAPIdata.name || "",
    email: dummyAPIdata.email || "",
    dob: dummyAPIdata.dob || "",
    phone: dummyAPIdata.phone || "",
    address: "",
    state: "",
    district: "",
    pincode: "",
    bloodGroup: "",
    //* check if password has to be taken from google as well.
    password: "",
    cpassword: "",
    //* check if accept t&c checkbox works
    tnc: false,
  },
  inputValidities: {
    name: dummyAPIdata ? true : false,
    email: dummyAPIdata ? true : false,
    dob: dummyAPIdata ? true : false,
    phone: dummyAPIdata ? true : false,
    address: false,
    state: false,
    district: false,
    pincode: false,
    bloodGroup: false,
    password: false,
    cpassword: false,
    tnc: false,
  },
  inputTouched: {
    name: dummyAPIdata ? true : false,
    email: dummyAPIdata ? true : false,
    dob: dummyAPIdata ? true : false,
    phone: dummyAPIdata ? true : false,
    address: false,
    state: false,
    district: false,
    pincode: false,
    bloodGroup: false,
    password: false,
    cpassword: false,
    tnc: false,
  },
  formIsValid: false,
};

const registerIndReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INPUT_STATE: {
      const newInputValues = {
        ...state.inputValues,
        [action.inputIdentifier]: action.value,
      };
      const newInputValidities = {
        ...state.inputValidities,
        [action.inputIdentifier]: action.isValid,
      };
      let newFormIsValid = true;
      for (const key in newInputValidities) {
        newFormIsValid = newFormIsValid && newInputValidities[key];
      }
      // console.log({
      //   inputValues: newInputValues,
      //   inputValidities: newInputValidities,
      //   formIsValid: newFormIsValid,
      // });
      return {
        ...state,
        inputValues: newInputValues,
        inputValidities: newInputValidities,
        formIsValid: newFormIsValid,
      };
    }

    case INPUT_FOCUS_OUT: {
      const newInputTouched = {
        ...state.inputTouched,
        [action.inputIdentifier]: true,
      };
      return { ...state, inputTouched: newInputTouched };
    }
    default:
      return state;
  }
};

export default registerIndReducer;
