import {
  CHANGE_SIDEBAR_STATE
} from './SidebarActionTypes';

export default function authReducer(state = {
 sidebarState: 'open'
}, action) {
  switch (action.type) {
    case CHANGE_SIDEBAR_STATE:
      return {
        sidebarState: action.sidebarState
      };    
    default:
      return state;
  }
}
