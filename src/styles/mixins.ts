import {Dimensions, PixelRatio, StyleSheet} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const guidelineBaseWidth = 432;

export const scaleSize = (size: number) =>
  (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = (size: number) => size * PixelRatio.getFontScale();

export function dimensions(
  top?: number,
  right?: number,
  bottom?: number,
  left?: number,
  property?: string,
) {
  let styles: any = {};

  top && (styles[property ? `${property}Top` : `top`] = scaleSize(top));
  right && (styles[property ? `${property}Right` : `right`] = scaleSize(right));
  bottom &&
    (styles[property ? `${property}Bottom` : `bottom`] = scaleSize(bottom));
  left && (styles[property ? `${property}Left` : `left`] = scaleSize(left));

  return styles;
}

export function dual_dimensions(hor?: number, ver?: number, property?: string) {
  let styles: any = {};

  hor && (styles[`${property}Horizontal`] = scaleSize(hor));
  ver && (styles[`${property}Vertical`] = scaleSize(ver));

  return styles;
}

export function margin(
  top: number,
  right: number,
  bottom: number,
  left: number,
) {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(
  top: number,
  right: number,
  bottom: number,
  left: number,
) {
  return dimensions(top, right, bottom, left, 'padding');
}

export function boxShadow(
  color: string,
  offsetWidth = 0,
  offsetHeight = 10,
  radius = 5,
  opacity = 0.25,
  elevation = 5,
) {
  return {
    shadowColor: color,
    shadowOffset: {
      width: offsetWidth,
      height: offsetHeight,
    },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: elevation,
  };
}

export function viewAnonymous(color: string, opacity = 0.25) {
  return {
    backgroundColor: color,
    opacity: opacity,
    width: '100%',
    height: '100%',
  };
}

export function flexRow(justifyContent: boolean, hor?: number, ver?: number) {
  return {
    flexDirection: 'row',
    justifyContent: justifyContent ? 'space-between' : 'flex-start',
    ...dual_dimensions(hor, ver, 'padding'),
  };
}
