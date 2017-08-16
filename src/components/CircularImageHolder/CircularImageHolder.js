import React, {Component} from 'react';
import './circularImageHolder.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class CircularImageHolder extends Component {
    static propTypes = {
        iconClassName: PropTypes.string,
        wrapperClassName: PropTypes.string,
    };

    static defaultProps = {
        iconClassName: '',
        wrapperClassName: '',
    };

    render() {
        const {wrapperClassName, iconClassName} = this.props;
        return (
          <div className={classNames('circular-image-holder', 'center', wrapperClassName)}>
            <span className={iconClassName}/>
          </div>
        );
    }
}

export default (CircularImageHolder);
