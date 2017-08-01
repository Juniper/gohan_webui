import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isEqual} from 'lodash';
import classNames from 'classnames';

import Menu from './Menu';
import MenuItem from './MenuItem';
import CollapseMenu from './CollapseMenu';

export default class SidebarMenu extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  shouldBeRendered = (references, id) => {
    const current = references[id];
    const parent = references[current.parent];
    return  current.matchedSearch ||
            // case when al least one child is matched
            this.getAllChildren(current, references).some((child) => references[child].matchedSearch) ||
            // case when parent is matched category but without any matched link
            parent
              && parent.matchedSearch
              && !current.children.length
              && this.getAllChildren(parent, references)
                    .every((child) => !references[child].matchedSearch);
  };

  getAllChildren = (object, references, children=[]) => {
    if (object.children.length) {
      object.children.forEach((child) => {
        children.push(child);
        this.getAllChildren(references[child], references, children);
      })
    }
    return children;
  };

  renderOneLevelMenu = (item, index) => {
    const {title, url, icon, category, id} = item;
    const {searchQuery, pathname, sidebarState, onCollapseChange, references, collapseExpand} = this.props;
    if(this.shouldBeRendered(references, id)){
      if (!item.subMenu) {
        return  <MenuItem key={index}
                          text={title}
                          href={url ? `#${url}`: null}
                          icon={icon}
                          isActive={url === pathname}
                          itemID={id}
                          collapseExpand={collapseExpand}
                          sidebarState={sidebarState}
                          searchQuery={searchQuery}
        />
      }
      return (
        <CollapseMenu key={index}
                      text={title}
                      icon={icon}
                      category={category}
                      searchQuery={searchQuery}
                      isActive={item.url === pathname}
                      sidebarState={sidebarState}
                      href={url ? `#${url}`: '#'}
                      itemID={id}
                      onCollapseChange={onCollapseChange}
                      references={references}
                      collapseExpand={collapseExpand}
        >
          {item.subMenu.map(this.renderOneLevelMenu)}
        </CollapseMenu>
      );
    }
    return null;
  };

  render() {
    return (
        <Menu>
          {this.props.menuItems.map(this.renderOneLevelMenu)}
        </Menu>
    );
  }
}

// SidebarMenu.defaultProps = {
//   pathname: '',
//   menuItems: [],
// };
//
// if (process.env.NODE_ENV !== 'production') {
//   SidebarMenu.propTypes = {
//     pathname: PropTypes.string,
//     menuItems: PropTypes.array,
//   };
// }
