import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

import {wizardSelector} from 'config/ConfigSelectors';
import WizardStep from './components/WizardStep';
import WizardHeader from './components/WizardHeader';

import './wizard.scss';
import {WIZARD_STEP_TYPE} from './wizardTypes';

export class Wizard extends Component {
  render() {
      let wizardContent = this.props.wizard.default.content;

      return (
        <div className="pt-card pt-elevation-3 detail">
          <WizardHeader wizardContent={wizardContent}/>
          <WizardStep wizardContent={wizardContent}/>
        </div>
    );
  }

  static defaultProps = {
    wizard: null
  };

  static propTypes = {
    wizard: PropTypes.shape({
      default: PropTypes.shape({
        content: WIZARD_STEP_TYPE
      })
    })
  };
}

export default connect(wizardSelector, {
})(Wizard);
