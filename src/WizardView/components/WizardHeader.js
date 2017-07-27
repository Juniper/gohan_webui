import React, {Component} from 'react';
import WizardHeaderCell from './WizardHeaderCell';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {noop} from 'lodash';

import {getStepNumber} from 'WizardView/wizardSelectors';
import {WIZARD_STEP_TYPE} from 'WizardView/wizardTypes';

class WizardHeader extends Component {
    static propTypes = {
        wizardContent: WIZARD_STEP_TYPE,

        step: PropTypes.number,
        headerClick: PropTypes.func,
    };

    static defaultProps = {
        wizardContent: [],
        step: 0,
        headerClick: noop,
    };

    handleTabClick = event => {
        const stepNumber = event.currentTarget.dataset.step;
        const isDisabled = stepNumber > this.props.step;
        if (!isDisabled) {
            this.props.headerClick(Number(stepNumber));
        }
    };

    render() {
        const {step, wizardContent} = this.props;
        return <div className="wizard-header pt-tabs">
          <ul className="pt-tab-list space-around" role="tablist">
            {wizardContent.map((item, i) => {
                    return <li className="pt-tab" role="tab"
                      aria-selected={i === step}
                      onClick={this.handleTabClick}
                      data-step={i}
                      key={i}>
                      <WizardHeaderCell data={item.header} disabled={i > step}
                        helpIconDisabled={i === step}
                      />
                    </li>;
                })}
          </ul>
        </div>;
    }
}

const mapStateToProps = state => ({
    step: getStepNumber(state)
});


export default connect(mapStateToProps)(WizardHeader);
