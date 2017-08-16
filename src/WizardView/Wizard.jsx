import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getWizard} from '../config/ConfigSelectors';
import './wizard.scss';
import WizardForm from './components/WizardForm';

export class Wizard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
    };
  }

  static onEnter() {
  }

  static onLeave() {
  }

  next = () => {
    this.setState({step: this.state.step + 1});
  };

  prev = () => {
    this.setState({step: this.state.step - 1});
  };

  handleHeaderClick = event => {
      const stepNumber = event.currentTarget.dataset.step;
      this.setState({step: Number(stepNumber)});
  };

  render() {
    return (
      <div className="pt-card pt-elevation-3 detail">
        {this.renderHeader()}
        <div>
          {this.renderStep()}
        </div>
        {this.renderFooter()}
      </div>
    );
  }

  renderStep = () => {
    return <div>
      {this.props.wizard.default.content[this.state.step].text}

      {this.props.wizard.default.content[this.state.step].schemaId &&
        <WizardForm schemaId={this.props.wizard.default.content[this.state.step].schemaId}/>}
    </div>;
  };

  renderHeader = () => {
    return <div className="wizard-header">
      {
         this.props.wizard.default.content.map((item, i) => {
           if (i < this.state.step) {
             return <button key={i} className="pt-button"
               onClick={this.handleHeaderClick}
               data-step={i}>
               {item.header}
             </button>;
           } else if (i === this.state.step) {
               return <button key={i} className="pt-button pt-intent-success"
                 onClick={this.handleHeaderClick}
                 data-step={i}>
                 {item.header}
               </button>;
           } else if (i === this.state.step + 1) {
               return <button key={i} className="pt-button"
                 onClick={this.handleHeaderClick}
                 data-step={i}>
                 {item.header}
               </button>;
           }

           return <button key={i} className="pt-button"
             disabled={true}>
             {item.header}
           </button>;
        })
      }
    </div>;
  };

  renderFooter = () => {
    return <div className="wizard-footer">
      <button className="pt-button pt-minimal pt-icon-arrow-left"
        role="button"
        disabled={!this.state.step > 0}
        onClick={this.prev}>
              Prev
            </button>
      <button className="pt-button pt-minimal pt-icon-arrow-right"
        role="button"
        disabled={this.state.step >= this.props.wizard.default.stepCount - 1}
        onClick={this.next}>
            Next
      </button>
    </div>;
  }
}

Wizard.contextTypes = {
};

Wizard.propTypes = {
};

function mapStateToProps(state) {
  return {
    wizard: getWizard(state)
  };
}

export default connect(mapStateToProps, {
})(Wizard);
