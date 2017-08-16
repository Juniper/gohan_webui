import React, {Component} from 'react';
import CircularImageHolder from 'components/CircularImageHolder/CircularImageHolder';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {HEADER_TYPE} from 'WizardView/wizardTypes';

class WizardHeaderCell extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        helpIconDisabled: PropTypes.bool,
        data: HEADER_TYPE,
    };

    static defaultProps = {
        disabled: false,
        helpIconDisabled: false,
        data: {
            title: '',
            mainIcon: {wrapperClassName: '', iconClassName: ''},
            helpIcon: {wrapperClassName: '', iconClassName: ''},
        },
    };

    helpIcon = (helpIcon, helpIconDisabled) => {
        if (helpIcon && helpIconDisabled) {
            return <CircularImageHolder wrapperClassName={helpIcon.wrapperClassName}
              iconClassName={helpIcon.iconClassName}
            />;
        }
        return null;
    };

    render() {
        const {disabled, helpIconDisabled, data: {title, mainIcon, helpIcon}} = this.props;
        return (
          <div className={classNames('center', 'header-cell-container', {disabled})} aria-disabled={disabled}>
            <CircularImageHolder wrapperClassName={mainIcon.wrapperClassName}
              iconClassName={mainIcon.iconClassName}
            />
            <div className='space-between'>
              <span>{title}</span>
              <span className={classNames('center-vertical', {spacer: helpIconDisabled})}>
                {this.helpIcon(helpIcon, helpIconDisabled)}
              </span>
            </div>
          </div>
        );
    }
}

export default (WizardHeaderCell);
