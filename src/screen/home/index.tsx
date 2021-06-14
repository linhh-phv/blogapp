import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {logoutAction} from '../../modules/signin/actions';
import {selectState} from '../../redux/reducers';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {POSTS_SCREEN} from '../../constants/screenKeys';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = (props: any) => {
  const {signin, app} = selectState(state => state);
  const {name, id} = signin;
  const {navigationServices} = app;
  const dispatch = useDispatch();
  const [test, setTest] = useState(1);

  const logoutSuccess = () => {
    console.log('loged out');
    // setLoading(false);
  };
  const logoutFail = (error: any) => {
    // Alert.alert(`${error?.message}`);
    // setLoading(false);
  };
  useEffect(() => {
    // setTest(11);
    // console.log(test);
  }, [test]);

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

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
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
          <TouchableOpacity onPress={() => pressLogout()}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};
export default HomeScreen;
