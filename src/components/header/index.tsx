import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  StatusBar,
  Text,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '../../assets/images';
import {Mixins} from '../../styles';
import {Appbar} from 'react-native-paper';

interface Props {
  title: string;
  iconLeft?: string;
  iconRight?: string;
  pressLeft?: Function;
  pressRight?: Function;
  back?: boolean;
}
const MyHeader = (props: Props) => {
  const {title, iconLeft, iconRight, pressLeft, pressRight, back} = props;

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Appbar.Header
        style={{
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#7F5DF0',
          ...styles.shadow,
        }}>
        {back && <Appbar.BackAction />}
        <Appbar.Content
          title={title}
          titleStyle={{
            color: '#7F5DF0',
            fontSize: Mixins.scaleFont(30),
            fontWeight: 'bold',
          }}
        />
        {iconLeft ? (
          <Appbar.Action
            icon={iconLeft}
            onPress={() => pressLeft && pressLeft()}
            style={{backgroundColor: '#f1f1f1'}}
          />
        ) : (
          <View />
        )}

        {iconRight ? (
          <Appbar.Action
            icon={iconRight}
            onPress={() => pressRight && pressRight()}
            style={{backgroundColor: '#f1f1f1'}}
          />
        ) : (
          <View />
        )}
      </Appbar.Header>
    </>
  );
};
const styles = StyleSheet.create({
  shadow: Mixins.boxShadow(
    '#000',
    0,
    0,
    0,
    0,
    Platform.OS == 'android' ? 0 : 0,
  ),
});
export default MyHeader;
