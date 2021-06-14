import {Dimensions, PixelRatio} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const guidelineBaseWidth = 432;

export const scaleSize = size => (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = size => size * PixelRatio.getFontScale();

export function dimensions(top, right, bottom, left, property) {
  let styles = {};

  top && (styles[property ? `${property}Top` : `top`] = scaleSize(top));
  right && (styles[property ? `${property}Right` : `right`] = scaleSize(right));
  bottom &&
    (styles[property ? `${property}Bottom` : `bottom`] = scaleSize(bottom));
  left && (styles[property ? `${property}Left` : `left`] = scaleSize(left));

  return styles;
}

export function margin(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'padding');
}

export function boxShadow(
  color,
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
