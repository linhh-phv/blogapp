import {StyleSheet, Platform} from 'react-native';
import {boxShadow, scaleSize} from './mixins';

const CommonStyles = StyleSheet.create({
  shadow: boxShadow(
    '#7F5DF0',
    0,
    10,
    3.5,
    0.25,
    Platform.OS == 'android' ? 10 : 5,
  ),

  flexRow: {
    paddingHorizontal: scaleSize(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default CommonStyles;
