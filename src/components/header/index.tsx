import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  ImageBackground,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '../../assets/images';
import {Appbar} from 'react-native-paper';
import {boxShadow, scaleFont, scaleSize} from '../../styles/mixins';
import {DIMENSION} from '../../styles/common';
import {Colors} from '../../styles';
import {checkPlatform} from '../../util/helper';

interface Props {
  title?: string;
  subTitle?: string;
  iconLeft?: string;
  iconRight?: string;
  pressLeft?: Function;
  pressRight?: Function;
  pressBack?: Function;
  back?: boolean;
  height?: number;
}
const MyHeader = (props: Props) => {
  const {
    title,
    iconLeft,
    iconRight,
    pressLeft,
    pressRight,
    back,
    subTitle,
    pressBack,
    height,
  } = props;

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Appbar.Header
        style={{
          backgroundColor: height ? 'transparent' : Colors.WHITE,
          borderBottomWidth: 0.2,
          borderBottomColor: '#7F5DF0',
          ...styles.shadow,
          height: height ? scaleSize(height) : DIMENSION.height_header,
          width: DIMENSION.WINDOW_WIDTH,
          // position: 'absolute',
        }}>
        <ImageBackground
          source={height ? images.ic_tabar_profile : null}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          {back && (
            <Appbar.BackAction onPress={() => pressBack && pressBack()} />
          )}
          <Appbar.Content
            title={title}
            titleStyle={{
              color: '#7F5DF0',
              fontSize: scaleFont(30),
              fontWeight: 'bold',
            }}
            subtitle={subTitle?.toUpperCase()}
            subtitleStyle={{fontSize: scaleFont(12)}}
          />
          {iconLeft ? (
            <Appbar.Action
              icon={iconLeft}
              onPress={() => pressLeft && pressLeft()}
              style={{backgroundColor: Colors.TAG}}
            />
          ) : (
            <View />
          )}

          {iconRight ? (
            <Appbar.Action
              icon={iconRight}
              onPress={() => pressRight && pressRight()}
              style={{backgroundColor: Colors.TAG}}
            />
          ) : (
            <View />
          )}
        </ImageBackground>
      </Appbar.Header>
    </>
  );
};
const styles = StyleSheet.create({
  shadow: boxShadow('#000', 0, 0, 0, 0, checkPlatform<number>(0, 0)),
});
export default MyHeader;
