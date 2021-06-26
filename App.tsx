/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import AppContainer from './src';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import codePush from 'react-native-code-push';
import {checkPlatform} from './src/util/helper';

const codePushOptions = {
  installMode: codePush.InstallMode.IMMEDIATE,
  deploymentKey: checkPlatform<string>(
    '_1kHyUNHxm2f5HCx1dujOLsI3ojOPD5oADAQ6',
    'ZA9-v6RLPHTMzHXvjJ_mSfAAWf8z01yaykeQU',
  ),
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return <AppContainer />;
};

export default codePush(codePushOptions)(App);
