import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {SETTING_SCREEN} from '../../constants/screenKeys';
import {selectState} from '../../redux/reducers';
import {useDispatch} from 'react-redux';
import {hideTabBarAction} from '../../modules/app/actions';
import {useRoute, useIsFocused} from '@react-navigation/native';
import MyHeader from '../../components/header';
import titleScreen from '../../constants/titleKeys';

const ProfileScreen = () => {
  const {signin, app} = selectState(state => state);
  const {name, id} = signin;
  const {navigationServices, hideTabBar} = app;
  const dispatch = useDispatch();
  const {params, name: nameScreen} = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(
        hideTabBarAction({
          hideTabBar: true,
        }),
      );
    }
  }, [isFocused]);

  const _pressEdit = () => {
    Alert.alert('edit');
  };

  const _pressSetting = () => {
    navigationServices?.navigate(SETTING_SCREEN, {id: 111});
    dispatch(
      hideTabBarAction({
        hideTabBar: false,
        // onFail: error => logoutFail(error),
        // onSuccess: result => logoutSuccess(),
      }),
    );
  };

  return (
    <>
      <MyHeader
        title={name ?? titleScreen.profile}
        iconLeft="pencil-outline"
        iconRight="cog-outline"
        pressLeft={_pressEdit}
        pressRight={_pressSetting}
      />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>profile ne ne </Text>
      </View>
    </>
  );
};
export default ProfileScreen;
