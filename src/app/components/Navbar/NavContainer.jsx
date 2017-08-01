import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import isEqual from 'lodash/isEqual';
import {logout, selectTenant} from './../../../auth/AuthActions';
import {
  getUserName,
  getTenantName,
  getTenants,
} from './../../../auth/AuthSelectors';
import { sidebarState } from '../NewSidebar/SidebarSelectors';
import { changeSidebarState } from '../NewSidebar/SidebarActions';
import Navbar from './Navbar';

export class NavbarContainer extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  handleMenuButtonClick = (sidebarState) => {
    this.props.changeSidebarState(sidebarState);
  };

  handleLogoutClick = () => {
    this.props.logout();
  };

  handleChangeTenantClick = tenantName => {
    this.props.selectTenant(tenantName);
  };

  render() {
    const { sidebarState, tenants, tenant, userName } = this.props;
    const { handleMenuButtonClick, handleLogoutClick, handleChangeTenantClick} = this;
    const properties = {
      sidebarState,
      tenants,
      tenant,
      userName,
      handleMenuButtonClick,
      handleLogoutClick,
      handleChangeTenantClick
    };

    return (
      <Navbar {...properties}/>
    );
  }
}

NavbarContainer.defaultProps = {
  tenants: [],
  onToggleSidebar: () => {},
  isSidebarOpen: false,
};

if (process.env.NODE_ENV !== 'production') {
  NavbarContainer.propTypes = {
    userName: PropTypes.string.isRequired,
    tenant: PropTypes.string.isRequired,
    tenants: PropTypes.array,
    onToggleSidebar: PropTypes.func,
    isSidebarOpen: PropTypes.bool,
  };
}


export const mapStateToProps = state => ({
  userName: getUserName(state),
  tenant: getTenantName(state),
  tenants: getTenants(state),
  sidebarState: sidebarState(state),  
});

export default connect(mapStateToProps, {
  logout,
  selectTenant,
  changeSidebarState,
})(NavbarContainer);
