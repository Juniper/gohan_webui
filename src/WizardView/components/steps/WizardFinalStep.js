import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {transform} from 'lodash';

import {stepChange} from 'WizardView/wizardActions';
import {bindActionCreators} from 'redux';

import WizardStepFooter from './WizardStepFooter';
import {getAllStepsData} from 'WizardView/wizardSelectors';

class WizardFinalStep extends Component {
  static propTypes = {
    step: PropTypes.number
  };

  static defaultProps = {
    step: 0,
  };

  displayData = formData => {
    if (!formData) {
      return 'n/a';
    }
    return JSON.stringify(formData);
  };

  render() {
    const {allStepsData} = this.props;
      return (
        <div>
          {this.renderFormValuesTable(allStepsData)}

          <WizardStepFooter footerData={this.props.stepData.footer}
            stepCount={this.props.stepCount}
            submit={true}
          />
        </div>
      );
  }

  renderFormValuesTable(allStepsData) {
    return transform(allStepsData, (result, stepData, key) => {
      if (stepData.formData) {
        result.push(<div key={key} className="pt-card pt-elevation-1">
          <h4>Step number {key}</h4>
          <table className="pt-table pt-striped">
            <tbody>{this.renderStepValues(stepData)}</tbody>
          </table>
        </div>);
      }
    }, []);
  }

  renderStepValues(stepData) {
    return transform(stepData.formData, (result, formData, key) => {
      result.push(<tr key={key} className="field">
        <td>{key}</td>
        <td>{this.displayData(formData)}</td>
      </tr>);
    }, []);
  }
}

const mapStateToProps = state => {
  return ({
    allStepsData: getAllStepsData(state)
  });
};


const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    stepChange
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardFinalStep);
