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
} from 'react-native';
import {logoutAction} from '../../modules/signin/actions';
import {hideTabBarAction} from '../../modules/app/actions';

import {selectState} from '../../redux/reducers';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {POSTS_SCREEN} from '../../constants/screenKeys';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {useRoute, useIsFocused} from '@react-navigation/native';

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
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        {/* <ScrollView keyboardShouldPersistTaps="never"> */}
        <KeyboardAvoidingView
          // behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
          // behavior="position"
          // keyboardVerticalOffset={keyboardVerticalOffset}
          style={{
            flex: 1,
            // backgroundColor: 'red'
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          {/* <TouchableWithoutFeedback
            style={{backgroundColor: 'red', flex: 1}}
            onPress={() => {
              Keyboard.dismiss();
              // dispatch(
              //   hideTabBarAction({
              //     hideTabBar: true,
              //     // onFail: error => logoutFail(error),
              //     // onSuccess: result => logoutSuccess(),
              //   }),
              // );
            }}> */}
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="user" />
            <Text>Hi {name}</Text>
            <TouchableOpacity onPress={() => pressVideoChat()}>
              <Text>Video Chat</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="ok"
              disableFullscreenUI={true}
              onFocus={() => {
                // dispatch(
                //   hideTabBarAction({
                //     hideTabBar: false,
                //     // onFail: error => logoutFail(error),
                //     // onSuccess: result => logoutSuccess(),
                //   }),
                // );
              }}
              value={`${hideTabBar}`}
              // onBlur={() => Alert.alert('hehe')}
              // onPressOut={() => Keyboard.dismiss()}
            />

            <TouchableOpacity onPress={() => pressLogout()}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
          {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
        {/* </ScrollView> */}
      </SafeAreaView>
    </>
  );
};
export default HomeScreen;
