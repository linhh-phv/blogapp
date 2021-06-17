import {StyleSheet, Platform} from 'react-native';
import {boxShadow, scaleFont, scaleSize} from './mixins';

const CommonStyles = StyleSheet.create({
  shadow: boxShadow(
    '#7F5DF0',
    0,
    10,
    3.5,
    0.25,
    Platform.OS == 'android' ? 10 : 5,
  ),

  textNor: {
    fontSize: scaleFont(16),
  },
});
export default CommonStyles;
export const DIMENSION = {
  height_header: scaleSize(65),
};
