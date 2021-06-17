import {Keyboard} from 'react-native';
import {
  StackActions,
  CommonActions,
  TabActions,
} from '@react-navigation/native';

class NavigationServices {
  private navigation: any;
  private static navigationInstanse: NavigationServices;
  private constructor() {
    this.navigation = null;
  }

  public static getInstance(): NavigationServices {
    if (!this.navigationInstanse) {
      this.navigationInstanse = new NavigationServices();
    }
    return this.navigationInstanse;
  }

  public navigate(screenName: string, params?: any) {
    Keyboard.dismiss();
    this.navigation.dispatch(
      CommonActions.navigate({
        name: screenName,
        params: params,
      }),
    );
  }

  public goBack() {
    Keyboard.dismiss();
    this.navigation.dispatch(CommonActions.goBack());
  }

  public popToTop() {
    Keyboard.dismiss();
    this.navigation.dispatch(StackActions.popToTop());
  }

  public push(screenName: string, params?: any) {
    Keyboard.dismiss();
    this.navigation.dispatch(StackActions.push(screenName, params));
  }

  public pop() {
    Keyboard.dismiss();
    this.navigation.dispatch(StackActions.pop(1));
  }

  public jumpTo(screenName: string, params?: any) {
    Keyboard.dismiss();
    this.navigation.dispatch(TabActions.jumpTo(screenName, params));
  }

  public useNavigation() {
    return this.navigation;
  }

  public setNavigation(navigationOther: any) {
    this.navigation = navigationOther;
  }
}

export default NavigationServices;
