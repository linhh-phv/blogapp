import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {SEARCH_SCREEN, SETTING_SCREEN} from '../../constants/screenKeys';
import {selectState} from '../../redux/reducers';
import {useDispatch} from 'react-redux';
import {hideTabBarAction} from '../../modules/app/actions';
import {useRoute, useIsFocused} from '@react-navigation/native';
import MyHeader from '../../components/header';
import titleScreen from '../../constants/titleKeys';

const SearchDetailsScreen = () => {
  const {signin, app} = selectState(state => state);
  const {name, id} = signin;
  const {navigationServices, hideTabBar} = app;
  const dispatch = useDispatch();
  const {params, name: nameScreen} = useRoute<any>();
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

  const pressBack = () => {
    navigationServices?.pop();
  };

  const _pressSearch = () => {
    navigationServices?.push(SEARCH_SCREEN);
  };

  const _pressSearch2 = () => {
    // alert('seatch');
  };
  return (
    <>
      <MyHeader
        iconLeft="magnify"
        iconRight="dots-horizontal"
        pressLeft={_pressSearch}
        pressRight={_pressSearch2}
        back
        pressBack={pressBack}
      />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>result search {params?.name} </Text>
      </View>
    </>
  );
};
export default SearchDetailsScreen;
