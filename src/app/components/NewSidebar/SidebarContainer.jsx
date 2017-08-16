import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {isEqual} from 'lodash';
import { sidebarSelector } from './SidebarSelectors';
import Sidebar from './Sidebar';
import {changeSidebarState} from './SidebarActions';

class SidebarContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  collapseExpand = () => {
    const newState = this.props.sidebarState === 'open' ? 'minimal' : 'open';
    this.props.changeSidebarState(newState);
  };

  render() {
    const {menuItems, sidebarState, pathname} = this.props;
    const { collapseExpand } = this;
    const properties = {menuItems, sidebarState, pathname, collapseExpand};
    return (
      <Sidebar {...properties}/>
    );
  }
}

SidebarContainer.defaultProps = {
  pathname: '',
  menuItems: [],
};

if (process.env.NODE_ENV !== 'production') {
  SidebarContainer.propTypes = {
    pathname: PropTypes.string,
    menuItems: PropTypes.array,
  };
}

export default connect(sidebarSelector, {changeSidebarState})(SidebarContainer);
