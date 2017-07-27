import {PropTypes} from 'prop-types';

export const ICON_TYPE = PropTypes.shape({wrapperClassName: PropTypes.string, iconClassName: PropTypes.string});

export const HEADER_TYPE = PropTypes.shape({
  title: PropTypes.string,
  mainIcon: ICON_TYPE,
  helpIcon: ICON_TYPE,
});

export const WIZARD_STEP_TYPE = PropTypes.arrayOf(PropTypes.shape({
  text: PropTypes.string,
  schemaId: PropTypes.string,
  header: HEADER_TYPE,
}));
