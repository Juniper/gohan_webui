import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {bindActionCreators} from 'redux';


import {stepChange} from 'WizardView/wizardActions';
import {getStepNumber} from 'WizardView/wizardSelectors';
import WizardStepFooter from './WizardStepFooter';

class WizardTextStep extends Component {
  static propTypes = {
    step: PropTypes.number.isRequired,
    stepCount: PropTypes.number.isRequired,
  };

  static defaultProps = {
    step: 0,
    stepCount: 1,
    stepData: {},
  };

  render() {
      return <div className="wizard-body">
        <span>
          {this.props.stepData.body.text}
        </span>

        <WizardStepFooter footerData={this.props.stepData.footer}
          stepCount={this.props.stepCount}
          submit={false}
        />
      </div>;
  }
}


const mapStateToProps = state => ({
    step: getStepNumber(state)
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        stepSubmit: stepChange
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardTextStep);
