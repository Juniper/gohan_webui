import React, {Component} from 'react';
import {connect} from 'react-redux';
import {noop} from 'lodash';
import {PropTypes} from 'prop-types';

import {stepChange} from 'WizardView/wizardActions';
import {bindActionCreators} from 'redux';
import {getStepNumber} from 'WizardView/wizardSelectors';

class WizardStepFooter extends Component {
  static propTypes = {
    step: PropTypes.number,
    stepCount: PropTypes.number,
    submit: PropTypes.bool,
    stepChange: PropTypes.func,
    footerData: PropTypes.object
  };

  static defaultProps = {
    step: 0,
    stepCount: 1,
    submit: false,
    stepChange: noop,

    footerData: {}
  };

  forward = () => {
    if (!this.props.submit) {
      this.props.stepChange(this.props.step + 1);
    }
  };

  back = () => {
    this.props.stepChange(this.props.step - 1);
  };

  render() {
        const {forward, back} = this;
        const {step, stepCount, footerData} = this.props;

        return <div className="wizard-footer">
          <button className="pt-button pt-minimal pt-icon-arrow-left"
            role="button"
            disabled={!step > 0}
            onClick={back}>
            {footerData.textPrev ? footerData.textPrev : 'Prev'}
          </button>

          <button className="pt-button pt-minimal pt-icon-arrow-right"
            role="button"
            type="submit"
            onClick={forward}>
            {footerData.textNext ? footerData.textNext : 'Next'}
          </button>
        </div>;
    }
}

const mapStateToProps = state => ({
    step: getStepNumber(state)
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({stepChange}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardStepFooter);
