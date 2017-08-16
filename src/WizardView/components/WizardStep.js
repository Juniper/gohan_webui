import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getStepNumber} from 'WizardView/wizardSelectors';
import WizardFormStep from 'WizardView/components/steps/WizardFormStep';
import WizardTextStep from 'WizardView/components/steps/WizardTextStep';
import WizardFinalStep from "./steps/WizardFinalStep";

class WizardStep extends Component {
  static propTypes = {
    step: PropTypes.number,
    stepCount: PropTypes.number,
  };

  static defaultProps = {
    stepCount: 1,
    step: 0
  };

  render() {
    const {step, wizardContent} = this.props;
    const stepContent = wizardContent[step];

    const {type} = stepContent.body;
    return <div>
      {type === 'form' &&
        <WizardFormStep stepData={stepContent} stepCount={wizardContent.length}/>}

      {type === 'text' &&
        <WizardTextStep stepData={stepContent} stepCount={wizardContent.length}/>}

      {step === wizardContent.length -1 &&
        <WizardFinalStep stepData={stepContent}/>}
    </div>;
  }
}

const mapStateToProps = state => ({
    step: getStepNumber(state)
});


export default connect(mapStateToProps)(WizardStep);
