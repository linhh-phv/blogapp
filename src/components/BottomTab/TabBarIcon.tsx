import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Platform, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import images from '../../assets/images';
import {Mixins} from '../../styles';

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
            width: !focused
              ? Mixins.scaleSize(70)
              : Mixins.scaleSize(70) * sizeMax,
            height: !focused
              ? Mixins.scaleSize(70)
              : Mixins.scaleSize(70) * sizeMax,
            borderRadius: 50,
            top:
              Platform.OS == 'android'
                ? Mixins.scaleSize(-35)
                : Mixins.scaleSize(-25),
            ...styles.shadow,
          }}>
          <Image
            source={images.ic_tabar_posts}
            style={{width: '100%', height: '100%', borderRadius: 50}}
          />
        </View>
      ) : (
        <View
          style={[
            {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              top: Platform.OS == 'android' ? 0 : Mixins.scaleSize(15),
            },
          ]}>
          {isProfile ? (
            <View
              style={{
                width: !focused
                  ? Mixins.scaleSize(35)
                  : Mixins.scaleSize(35) * sizeMax,
                height: !focused
                  ? Mixins.scaleSize(35)
                  : Mixins.scaleSize(35) * sizeMax,
                borderRadius: 50,
              }}>
              <Image
                source={images.ic_tabar_profile}
                style={{width: '100%', height: '100%', borderRadius: 50}}
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
  shadow: Mixins.boxShadow(
    '#7F5DF0',
    0,
    10,
    3.5,
    0.25,
    Platform.OS == 'android' ? 10 : 5,
  ),
});
export default TabBarIcon;
