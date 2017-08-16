import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FocusStyleManager} from '@blueprintjs/core';

import Navbar from './components/Navbar';
import Sidebar from './components/NewSidebar';
import ErrorToaster from './../error/ErrorToaster';

FocusStyleManager.onlyShowFocusOnTabs();

export default class App extends Component {

  render() {
    const { children } = this.props;

    return (
      <div>
        <Navbar/>
        <Sidebar/>
        <ErrorToaster/>
        <div className="view-content">
          {children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};
