import {
  ActionTypes,
  IActionHideTabarPayload,
  IActionSavePayload,
  IActionTypeHideTabBar,
  IActionTypeSaveNavigationServices,
} from './index';

// Actions contain type and input value when is called

export function saveNavigationServicesAction(
  payload: IActionSavePayload,
): IActionTypeSaveNavigationServices {
  return {
    type: ActionTypes.SAVE_NAVIGATION_SERVICES,
    payload,
  };
}
export function hideTabBarAction(
  payload: IActionHideTabarPayload,
): IActionTypeHideTabBar {
  return {
    type: ActionTypes.HIDE_TAB_BAR,
    payload,
  };
}
