import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import images from '../../assets/images';
import {DIMENSION} from '../../styles/common';
import {scaleSize, boxShadow} from '../../styles/mixins';
import {checkPlatform} from '../../util/helper';

interface Props {
  icon: string;
  colorActive: string;
  colorNonActive: string;
  sizeMax: number;
  sizeMin: number;
  focused: boolean;
  isPosts: boolean;
  isProfile: boolean;
}
const TabBarIcon = (props: Props) => {
  const {
    icon,
    colorActive,
    colorNonActive,
    sizeMax,
    sizeMin,
    focused,
    isPosts,
    isProfile,
  } = props;
  return (
    <>
      {isPosts ? (
        <View
          style={{
            width: !focused ? scaleSize(70) : scaleSize(70) * sizeMax,
            height: !focused ? scaleSize(70) : scaleSize(70) * sizeMax,
            borderRadius: DIMENSION.borderRadiusMax,
            top: checkPlatform<number>(scaleSize(-35), scaleSize(-25)),
            ...styles.shadow,
          }}>
          <Image
            source={images.ic_tabar_posts}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: DIMENSION.borderRadiusMax,
            }}
          />
        </View>
      ) : (
        <View
          style={[
            {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              top: checkPlatform<number>(0, scaleSize(15)),
            },
          ]}>
          {isProfile ? (
            <View
              style={{
                width: !focused ? scaleSize(35) : scaleSize(35) * sizeMax,
                height: !focused ? scaleSize(35) : scaleSize(35) * sizeMax,
                borderRadius: DIMENSION.borderRadiusMax,
              }}>
              <Image
                source={images.ic_tabar_profile}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: DIMENSION.borderRadiusMax,
                }}
              />
            </View>
          ) : (
            <Icon
              name={icon}
              color={focused ? colorActive : colorNonActive}
              size={focused ? sizeMin * sizeMax : sizeMin}
            />
          )}
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  shadow: boxShadow('#7F5DF0', 0, 10, 3.5, 0.25, checkPlatform<number>(10, 5)),
});
export default TabBarIcon;
