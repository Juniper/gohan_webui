import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BurgerButton from '../../../components/BurgerButton';
import Button from '../../../components/Button';
import NavbarGroup from './components/NavbarGroup';
import TenantMenuItem from './components/TenantMenuItem';

import {
  Menu,
  MenuItem,
  Popover,
  PopoverInteractionKind,
  Position
} from '@blueprintjs/core';

export class Navbar extends Component {
  render() {

    const {
      sidebarState,
      tenants,
      tenant,
      userName,
      handleMenuButtonClick,
      handleLogoutClick,
      handleChangeTenantClick
    } = this.props;

    return (
      <nav className="pt-navbar pt-fixed-top">
        <NavbarGroup isRight={false}>
          <BurgerButton onChange={handleMenuButtonClick} buttonState={sidebarState}/>
        </NavbarGroup>
        <NavbarGroup isRight={true}>
          <Popover content={
            <Menu>
              {tenants.map(item => (
                <TenantMenuItem key={item.id}
                  text={item.name}
                  onClick={handleChangeTenantClick}
                />
              ))}
            </Menu>
          } interactionKind={PopoverInteractionKind.CLICK}
                   position={Position.BOTTOM}>
            <Button isMinimal={true}
                    iconName={'projects'}
                    rightIconName="caret-down"
                    text={tenant}
            />
          </Popover>

          <Popover content={
            <Menu>
              <MenuItem text={'Log Out'}
                iconName={'log-out'}
                onClick={handleLogoutClick}
              />
            </Menu>
          }
                   interactionKind={PopoverInteractionKind.CLICK}
                   position={Position.BOTTOM_RIGHT}>
            <Button isMinimal={true}
                    iconName={'user'}
                    rightIconName="caret-down"
                    text={userName}
            />
          </Popover>
        </NavbarGroup>
      </nav>
    );
  }
}

Navbar.defaultProps = {
  tenants: [],
  onToggleSidebar: () => {},
  sidebarState: 'open',
};

if (process.env.NODE_ENV !== 'production') {
  Navbar.propTypes = {
    userName: PropTypes.string.isRequired,
    tenant: PropTypes.string.isRequired,
    tenants: PropTypes.array,
    onToggleSidebar: PropTypes.func,
    sidebarState: PropTypes.string,
  };
}

export default Navbar;
