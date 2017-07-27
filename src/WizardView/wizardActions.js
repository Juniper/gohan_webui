import {STEP_CHANGE} from './WizardActionsTypes';

function createStepChange(stepNumber, formData) {
  return {
    type: STEP_CHANGE,
      stepNumber,
      formData
  };
}

export function stepChange(stepNumber, formData) {
  return dispatch => dispatch(createStepChange(stepNumber, formData));
}
