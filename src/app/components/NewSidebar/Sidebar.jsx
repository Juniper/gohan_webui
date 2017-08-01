import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isEqual, cloneDeep, debounce} from 'lodash';

import Search from './components/Search';
import SidebarMenu from './components/SidebarMenu';
import './styles/sidebar.scss'

export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      references: this.mapReferences(props.menuItems),
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  mapReferences = (arr) => {
    let reference = {};
    let setReference = (object, parentID = null) => {
      let instance = {};
      instance.id = object.id;
      instance.title = object.title;
      instance.parent = parentID;
      instance.isOpen = false;
      instance.isOpenBeforeSearch = false;
      instance.children = [];
      instance.matchedSearch = true;
      if(object.subMenu) {
        object.subMenu.forEach((obj) => {
          instance.children.push(obj.id);
          setReference(obj, object.id)
        });
      }
      reference[object.id] = instance;
    };
    arr.forEach((object) => {
      setReference(object);
    });
    return reference;
  };

  changeParentReferenceMap = (cloneReferences, id, value) => {
    const parentID = cloneReferences[id].parent;
    if (parentID !== null) {
        cloneReferences[parentID].isOpen = value;
        this.changeParentReferenceMap(cloneReferences, parentID, value);
    }
    return cloneReferences;
  };

  changeChildrenReferenceMap = (cloneReferences, id, value) => {
    const children = cloneReferences[id].children;
    if (children.length) {
      children.forEach((childID) => {
        cloneReferences[childID].isOpen = value;
        cloneReferences[childID].isOpenBeforeSearch = value;
        this.changeChildrenReferenceMap(cloneReferences, childID);
      });
    }
    return cloneReferences;
  };

  onCollapseChange = (id) => {
    this.setState((currentState) => {
      let cloneReferences = cloneDeep(currentState.references);
      const object = cloneReferences[id];
      object.isOpen = !object.isOpen;
      if(!currentState.searchQuery) object.isOpenBeforeSearch = !object.isOpenBeforeSearch;
      if(!object.isOpen){
        cloneReferences = this.changeChildrenReferenceMap(cloneReferences, id, false);
      }
      return {references: cloneReferences};
    });
  };

  onSearchChange = (event) => {
    event.persist();
    let searchQuery = '';
    if (event.target.value) searchQuery = event.target.value.replace(/[\(\)\[\]]/g, '\\$&');
    this.setState({ searchQuery });
    this.setState((currentState) => {
      const cloneReferences = cloneDeep(currentState.references);
      Object.entries(cloneReferences).forEach(([id, object]) => {
        if (((new RegExp(searchQuery, 'i')).test(object.title))) {
          object.matchedSearch = true;
          object.isOpen = false;
          if (searchQuery) {
            this.changeParentReferenceMap(cloneReferences, id, true);
          }
          else {
            object.isOpen = object.isOpenBeforeSearch;
          }
        } else {
          object.matchedSearch = false;
        }
      });
      return { references: cloneReferences };
    });
  };

  render() {
    const {sidebarState, collapseExpand, pathname, menuItems} = this.props;
    const {onSearchChange, onCollapseChange} = this;
    const {searchQuery, references} = this.state;
    return (
      <div className={`pt-elevation-2 pt-fixed-top sidebar sidebar-${sidebarState}`}>
          <div className="sidebar-content">
            <Search value={searchQuery}
                    onChange={onSearchChange}
                    collapseExpand={collapseExpand}
                    sidebarState={sidebarState}
            />
            <SidebarMenu
              sidebarState={sidebarState}
              menuItems={menuItems}
              collapseExpand={collapseExpand}
              searchQuery={searchQuery}
              pathname={pathname}
              onCollapseChange={onCollapseChange}
              references={references}
            />

          </div>
        <div className="col-exp-sidebar">
          <span className="pt-icon-chevron-left" onClick={collapseExpand}/>
        </div>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  pathname: '',
  menuItems: [],
};

if (process.env.NODE_ENV !== 'production') {
  Sidebar.propTypes = {
    pathname: PropTypes.string,
    menuItems: PropTypes.array,
  };
}
