import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getWizzard} from '../config/ConfigSelectors';
import '../../css/sass/wizzzard.scss';


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
      {this.props.wizzard.default.content[this.state.step].text}
    </div>;
  };

  renderHeader = () => {
    return <div>
      {
         this.props.wizzard.default.content.map((item, i) => {
           if (i !== this.state.step) {
             return <button key={i} className="pt-button">
               {item.header}
             </button>;
           }

           return <button key={i} className="pt-button pt-intent-primary">
             {item.header}
           </button>;
        })
      }
    </div>;
  };

  renderFooter = () => {
    return <div className="wizzard-footer">
      <button className="pt-button pt-minimal pt-icon-arrow-left"
        role="button"
        disabled={!this.state.step > 0}
        onClick={this.prev}>
              Prev
            </button>
      <button className="pt-button pt-minimal pt-icon-arrow-right"
        role="button"
        disabled={this.state.step >= this.props.wizzard.default.stepCount - 1}
        onClick={this.next}>
            Next
      </button>
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
