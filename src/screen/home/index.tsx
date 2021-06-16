import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  TouchableNativeFeedback,
  StatusBar,
} from 'react-native';
import {logoutAction} from '../../modules/signin/actions';
import {hideTabBarAction} from '../../modules/app/actions';

import {selectState} from '../../redux/reducers';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {POSTS_SCREEN} from '../../constants/screenKeys';
import {useRoute, useIsFocused} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Header} from '@react-navigation/stack';
import MyHeader from '../../components/header';
import titleScreen from '../../constants/titleKeys';

const HomeScreen = (props: any) => {
  const {signin, app} = selectState(state => state);
  const {name, id} = signin;
  const {navigationServices, hideTabBar} = app;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const logoutSuccess = () => {
    console.log('loged out');
    // setLoading(false);
  };

  const logoutFail = (error: any) => {
    // Alert.alert(`${error?.message}`);
    // setLoading(false);
  };
  
  useEffect(() => {
    if (isFocused) {
      dispatch(
        hideTabBarAction({
          hideTabBar: true,
        }),
      );
    }
  }, [isFocused]);

  const pressLogout = () => {
    if (id) {
      dispatch(
        logoutAction({
          id: id,
          onFail: error => logoutFail(error),
          onSuccess: result => logoutSuccess(),
        }),
      );
    }
  };

  const pressVideoChat = () => {
    navigationServices?.navigate(POSTS_SCREEN, {he: 'heeh'});
  };

  const _pressSearch = () => {
    alert('seatch');
  };

  const _pressSearch2 = () => {
    alert('seatch');
  };

  return (
    <>
      <MyHeader
        title={titleScreen.home}
        iconLeft="magnify"
        iconRight="dots-horizontal"
        pressLeft={_pressSearch}
        pressRight={_pressSearch2}
      />
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View style={{height: 300}}>
          <Text>hehe</Text>
        </View>
        <View style={{height: 300, backgroundColor: 'yellow'}}>
          <Text>hehe</Text>
        </View>
        <View style={{height: 300, backgroundColor: 'pink'}}>
          <TextInput style={{width: 300, height: 50}} placeholder="enter" />
        </View>
        <View style={{height: 300, backgroundColor: 'orange'}}>
          <Text>hehe</Text>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
export default HomeScreen;
