import {
  UPDATE_FIELDS_REG,
  BLUR_FIELDS_REG,
  ADD_PHONE_STATE,
  PHONE_STATE_SET,
  PHONE_TOUCH_SET,
  STATE_CLEANUP,
  REMOVE_PHONE,
} from './actionTypes';

export const updateFields = (val, fieldId, isValid) => ({
  type: UPDATE_FIELDS_REG,
  val: val,
  fieldId: fieldId,
  isValid: isValid,
});

export const blurFields = (fieldId) => ({
  type: BLUR_FIELDS_REG,
  fieldId: fieldId,
});

export const addPhoneState = () => ({
  type: ADD_PHONE_STATE,
});

export const removePhone = () => ({
  type: REMOVE_PHONE,
});

export const phoneStateSet = (val, idx) => ({
  type: PHONE_STATE_SET,
  val: val,
  idx: idx,
});

export const phoneTouchSet = (idx) => ({
  type: PHONE_TOUCH_SET,
  idx: idx,
});

export const stateCleanup = () => ({
  type: STATE_CLEANUP,
});
