import React, {Component} from 'react';
import ProtoTypes from 'prop-types';
import {noop, isEqual} from 'lodash';

class Search extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  focusHandler = () => {
    const {sidebarState, collapseExpand} = this.props;
    if(sidebarState === 'minimal') collapseExpand('open');
  };

  render() {
    const {value, onChange} = this.props;
    return (
      <div className="sidebar-search">
        <label className="pt-label">
          <label className="search-label pt-icon-search">
            <input className="pt-input pt-fill"
                   type= "text"
                   value={value}
                   placeholder= "Search"
                   onFocus={this.focusHandler}
                   onChange={onChange}
            />
          </label>
          <span onClick={onChange} className="clear-search pt-icon-cross"/>
        </label>
      </div>
    );
  }
}

export default Search;

if (process.env.NODE_ENV !== 'production') {
  Search.propTypes = {
    value: ProtoTypes.string,
    onChange: ProtoTypes.func,
  };
}
