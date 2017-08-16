import {createSelector, createStructuredSelector} from 'reselect';

const sidebar = state => state.configReducer.sidebar;

export const getSidebar = createSelector(
  [sidebar],
  sidebar => {
    if (sidebar !== undefined && Array.isArray(sidebar)) {
      return sidebar.map(item => (
        {
          title: item.title,
          path: '#/' + item.path
        }
      ));
    }

    return [];
  }
);

const wizard = state => state.configReducer.wizard;

export const getWizard = createSelector(
    [wizard],
    wizard => {
        return wizard;
    }
);

export const wizardSelector = createStructuredSelector({
    wizard: getWizard,
});
