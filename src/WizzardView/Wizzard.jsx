import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getWizzard} from '../config/ConfigSelectors';

export class Wizzard extends Component {
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

  render() {
    return (
      <div className="pt-card pt-elevation-3 detail">
        <h2>Wizzard Gohan webUI Component.</h2>
        <div>
          {this.renderStep(this.state.step)}
        </div>
        {this.renderFooter()}
      </div>
    );
  }

  renderStep = stepNumber => {
    return <div>
      {this.props.wizzard.default.content[stepNumber]}
    </div>;
  };

  renderFooter = () => {
    return <div>
      {this.state.step > 0 &&
        <button className="pt-button pt-minimal pt-icon-arrow-left"
          role="button"
          onClick={this.prev}>
              Prev
            </button>
      }
      {this.state.step < this.props.wizzard.default.stepCount - 1 &&
        <button className="pt-button pt-minimal pt-icon-arrow-right"
          role="button"
          onClick={this.next}>
              Next
            </button>
      }
    </div>;
  }
}

Wizzard.contextTypes = {
};

Wizzard.propTypes = {
};

function mapStateToProps(state) {
  return {
    wizzard: getWizzard(state)
  };
}

export default connect(mapStateToProps, {
})(Wizzard);
