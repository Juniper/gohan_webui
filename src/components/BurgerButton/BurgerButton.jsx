import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {noop} from 'lodash';
import './styles/_burger-button.scss';

export class BurgerButton extends Component {

  changeHandler = () => {
    const {buttonState, onChange} = this.props;
    const nextState = buttonState === 'open' ? 'close' : 'open';
    onChange(nextState);
  };

  render() {
    const {buttonState} = this.props;
    return (
      <div onClick={this.changeHandler} id="burger-button" className={classNames({"open-burger": buttonState === 'open'})}>
        <span/>
        <span/>
        <span/>
      </div>
    );
  }
}

BurgerButton.defaultProps = {
  onChange: noop,
  buttonState: 'open',
};

if (process.env.NODE_ENV !== 'production') {
  BurgerButton.propTypes = {
    onChange: PropTypes.func,
    buttonState: PropTypes.string,
  };
}

export default BurgerButton;
