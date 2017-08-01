import {CHANGE_SIDEBAR_STATE} from './SidebarActionTypes';

export function changeSidebarState(sidebarState) {
  return {
    type: CHANGE_SIDEBAR_STATE,
    sidebarState
  };
}
