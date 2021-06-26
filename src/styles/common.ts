import {StyleSheet, Platform, Dimensions} from 'react-native';
import {checkPlatform} from '../util/helper';
import {boxShadow, scaleFont, scaleSize} from './mixins';

const CommonStyles = StyleSheet.create({
  shadow: boxShadow('#7F5DF0', 0, 10, 3.5, 0.25, checkPlatform<number>(10, 5)),

  textNor: {
    fontSize: scaleFont(16),
  },
  textLow: {
    fontSize: scaleFont(12),
  },
  textMid: {
    fontSize: scaleFont(14),
  },
  textHigh: {
    fontSize: scaleFont(20),
  },
});
export default CommonStyles;
export const DIMENSION = {
  height_header: scaleSize(65),
  borderRadiusMin: 15,
  borderRadiusMax: 50,
  WINDOW_WIDTH: Dimensions.get('window').width,
  WINDOW_HEIGHT: Dimensions.get('window').height,
};
