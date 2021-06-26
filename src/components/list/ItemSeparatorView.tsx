import React, {useState, useEffect} from 'react';

import {View} from 'react-native';
import {Colors} from '../../styles';
import {scaleSize} from '../../styles/mixins';

interface Props {
  height?: number;
  width?: number;
  color?: string;
}

const ItemSeparatorView = (props: Props) => {
  const {height, width, color} = props;
  return (
    <View
      style={{
        height: scaleSize(height ?? 1),
        width: width ? scaleSize(width) : '100%',
        backgroundColor: color ?? Colors.TAG,
      }}
    />
  );
};
export default ItemSeparatorView;
