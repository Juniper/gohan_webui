import {getPathname} from '../../../location/LocationSelectors';
import {createSelector, createStructuredSelector} from 'reselect';
import {cloneDeep} from 'lodash';

export const schemas = state => state.schemaReducer.data;
export const sidebar = state => state.configReducer.sidebar;
export const sidebarState = state => state.sidebarReducer.sidebarState;

const addID = (arr) => {
  let id = 0;
  let clone = cloneDeep(arr);
  let setID = (object) => {
    object.id = id;
    object.collapsed = false;
    id += 1;
    if(object.subMenu) {
      object.subMenu.forEach((obj, index) => setID(obj, id));
    }
  };
  clone.forEach((object, index) => {
    setID(object, index.toString());
  });
  return clone;
};

export const getSidebarItems = createSelector(
    [schemas, sidebar],
    (schemas = [], sidebar = []) => {
        const result = [];
        //const concatenated = schemas.concat(sidebar);
        const concatenated = [].concat(sidebar);
        concatenated
            .filter(item => (!item.parent && (!item.metadata ||  item.metadata.type !== 'metaschema')))
            .forEach(item =>{
                result.push({
                    title: item.title,
                    url: item.url,
                    subMenu: item.subMenu, 
                    icon: item.icon,
                    category: item.category
                })
            });
      return addID(result);
    }
);

export const sidebarSelector = createStructuredSelector({
  sidebarState,
  menuItems: getSidebarItems,
  pathname: getPathname
});
