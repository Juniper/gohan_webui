import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {noop, isEqual} from 'lodash';
import classNames from 'classnames';
import Highlighter from  'react-highlight-words';

class MenuItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  onClickFocus = () => {
    const {sidebarState, collapseExpand} = this.props;
    if(sidebarState === 'minimal') collapseExpand('open');
  };

  clickHandler = (event) => {
    this.onClickFocus();
    this.props.onClick(event);
    if (this.props.href === '#'){
      event.preventDefault();
      event.stopPropagation();
    }
  };

  render() {
    const {text, href, isActive, icon, category, itemID, searchQuery} = this.props;
    return (
      <li>
         <a
           data-id={itemID}
           href={href}
           onClick={this.clickHandler}
           onFocus={this.onClickFocus}
           className={classNames(['item', `pt-icon-${icon}`, 'pt-menu-item pt-popover-dismiss'],
                                 {'pt-active pt-intent-primary': isActive, "category": category})}
           title= {text}
         >
           <Highlighter
             highlightClassName='highlited-search'
             searchWords={[searchQuery]}
             textToHighlight={text}
           />
         </a>
       </li>
    );
  }
}

MenuItem.defaultProps = {
  text: '',
  isActive: false,
  onClick: noop,
  category: false,
};

if (process.env.NODE_ENV !== 'production') {
  MenuItem.propTypes = {
    text: PropTypes.string,
    sidebarSelector: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    changeSidebarState: PropTypes.func,
    category: PropTypes.bool,
  };
}

export default MenuItem;
