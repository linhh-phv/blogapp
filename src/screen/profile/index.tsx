import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SETTING_SCREEN} from '../../constants/screenKeys';
import {selectState} from '../../redux/reducers';
import {useDispatch} from 'react-redux';
import {hideTabBarAction} from '../../modules/app/actions';
import {useRoute, useIsFocused} from '@react-navigation/native';

const ProfileScreen = () => {
  const {signin, app} = selectState(state => state);
  const {name, id} = signin;
  const {navigationServices, hideTabBar} = app;
  const dispatch = useDispatch();
  const {params, name: nameScreen} = useRoute();
  const isFocused = useIsFocused();

  const pressSetting = () => {
    navigationServices?.navigate(SETTING_SCREEN, {id: 111});
    dispatch(
      hideTabBarAction({
        hideTabBar: false,
        // onFail: error => logoutFail(error),
        // onSuccess: result => logoutSuccess(),
      }),
    );
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

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>profile ne ne </Text>
      <TouchableOpacity onPress={() => pressSetting()}>
        <Text>setting</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileScreen;
