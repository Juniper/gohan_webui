import React, { Component } from 'react';
import ProtoTypes from 'prop-types';
import Collapsible from 'react-collapsible';

import classNames from 'classnames';

import Menu from './Menu';
import MenuItem from './MenuItem';

export default class CollapseMenu extends Component {

  changeCollapseState = (event) => {
    const {onCollapseChange, category} = this.props;
    if(!category){
      if(onCollapseChange) onCollapseChange(event.currentTarget.dataset.id);
    }
  };

  render() {
    const {text, icon, category, children, href, isActive, sidebarState, itemID, references, collapseExpand, searchQuery} = this.props;
    const notMinimal = sidebarState !== 'minimal';
    const isOpen = references[itemID].isOpen;
    return (
      <Menu>
        <Collapsible trigger={
          <MenuItem isActive={isActive}
                    icon={icon}
                    href={href}
                    onClick={this.changeCollapseState}
                    text={text}
                    category={category}
                    itemID={itemID}
                    className={classNames({"open-menu": category || (isOpen && notMinimal)})}
                    collapseExpand={collapseExpand}
                    sidebarState={sidebarState}
                    searchQuery={searchQuery}
          />
          }
          open={category || (isOpen && notMinimal)}
          transitionTime={200}
        >
            {children}
        </Collapsible>
      </Menu>
    );

  }
}

if (process.env.NODE_ENV !== 'production') {
  CollapseMenu.propTypes = {
    children: ProtoTypes.node,
    text: ProtoTypes.string,
  };
}
