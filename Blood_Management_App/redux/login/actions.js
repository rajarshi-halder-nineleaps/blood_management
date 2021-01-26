import {UPDATE_FIELDS, BLUR_FIELDS, STATE_CLEANUP} from './actionTypes';

export const updateFields = (val, fieldId, isValid) => ({
  type: UPDATE_FIELDS,
  val: val,
  fieldId: fieldId,
  isValid: isValid,
});

export const blurFields = (fieldId) => ({
  type: BLUR_FIELDS,
  fieldId: fieldId,
});

export const stateCleanup = () => ({type: STATE_CLEANUP});
