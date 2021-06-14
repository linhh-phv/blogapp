import NavigationServices from '../../navigation/navigation';
import {ActionTypes, ISaveNavigationServicesAction} from './index';
interface ILocalState {
  navigationServices?: NavigationServices;
  hideTabBar: boolean;
}
const initialState: ILocalState = {
  navigationServices: undefined,
  hideTabBar: true,
};

const reducer = (
  state: ILocalState = initialState,
  action: ISaveNavigationServicesAction,
) => {
  switch (action.type) {
    case ActionTypes.SAVE_NAVIGATION_SERVICES:
      return {
        ...state,
        navigationServices: action.payload.navigationServices,
      };
    case ActionTypes.HIDE_TAB_BAR:
      return {
        ...state,
        hideTabBar: action.payload.hideTabBar,
      };

    default:
      return state;
  }
};

export default reducer;
