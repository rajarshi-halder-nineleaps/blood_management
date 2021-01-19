import { UPDATE_INPUT_STATE, INPUT_FOCUS_OUT } from "./actionTypes";

export const updateInputState = (value, isValid, inputIdentifier) => ({
  type: UPDATE_INPUT_STATE,
  value: value,
  isValid: isValid,
  //? the inputidentifier will have the same name as the state value and validity so as to avoid re-writing of code
  inputIdentifier: inputIdentifier,
});

export const inputFocusOut = (inputIdentifier) => ({
  type: INPUT_FOCUS_OUT,
  inputIdentifier: inputIdentifier,
});
