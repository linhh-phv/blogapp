import {Action} from 'redux';
import {IUser} from '../../constants/user';
import NavigationServices from '../../navigation/navigation';
import * as actions from './actions';
import reducer from './reducers';

// define action types
export enum ActionTypes {
  SAVE_NAVIGATION_SERVICES = 'SAVE_NAVIGATION_SERVICES',
  HIDE_TAB_BAR = 'HIDE_TAB_BAR',
}

//type Payload
export interface IActionSavePayload {
  navigationServices: NavigationServices;
}

export interface IActionHideTabarPayload {
  hideTabBar: boolean;
}

//typeof actions
export interface IActionTypeSaveNavigationServices extends Action {
  type: ActionTypes.SAVE_NAVIGATION_SERVICES;
  payload: IActionSavePayload;
}

export interface IActionTypeHideTabBar extends Action {
  type: ActionTypes.HIDE_TAB_BAR;
  payload: IActionHideTabarPayload;
}

//export actions
export type ISaveNavigationServicesAction =
  | IActionTypeSaveNavigationServices
  | IActionTypeHideTabBar;

export {actions, reducer};
