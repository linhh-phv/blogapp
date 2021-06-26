import {Platform} from 'react-native';

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const checkPlatform = <Type,>(android: Type, ios: Type): Type => {
  return Platform.OS === 'android' ? android : ios;
};
export {wait, checkPlatform};
