import {createSelector} from 'reselect';

const stepNumber = state => state.wizardReducer.stepNumber;

export const getStepNumber = createSelector(
  [stepNumber],
    stepNumber => stepNumber
);

const stepsData = state => state.wizardReducer.stepsData;

export const getPreviousFormData = createSelector(
  [stepNumber, stepsData],
    (stepNumber, stepsData) => (stepsData[stepNumber] ? stepsData[stepNumber].formData : {})
);

export const getAllStepsData = createSelector(
  [stepsData],
    stepsData => stepsData
);
