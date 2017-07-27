import {STEP_CHANGE} from './WizardActionsTypes';

const initialState = {
    stepNumber: 0,
    stepsData: {
    }
};

export default function wizardReducer(state = initialState, action) {
    const {stepNumber, formData} = action;

    switch (action.type) {
        case STEP_CHANGE:
            let currentStepData = state.stepsData[state.stepNumber];
            if (!currentStepData) {
                currentStepData = {};
            }

            const finished = Boolean(state.stepNumber < stepNumber || currentStepData.finished);
            const newFormData = formData ? formData : currentStepData.formData;
            const newStepData = {
                ...currentStepData,
                finished,
                formData: newFormData
            };

            return {
                ...state,
                stepNumber,
                stepsData: {
                    ...state.stepsData,
                    [state.stepNumber]: newStepData
                }
            };

        default:
            return state;
    }

}
