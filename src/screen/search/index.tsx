import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, Keyboard} from 'react-native';
import {SETTING_SCREEN} from '../../constants/screenKeys';
import {selectState} from '../../redux/reducers';
import {useDispatch} from 'react-redux';
import {hideTabBarAction} from '../../modules/app/actions';
import {useRoute, useIsFocused} from '@react-navigation/native';
import MyHeader from '../../components/header';
import titleScreen from '../../constants/titleKeys';
import {Chip, Searchbar, Appbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonStyles from '../../styles/common';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {flexRow} from '../../styles/mixins';

const SearchScreen = () => {
  const {signin, app} = selectState(state => state);
  const {name, id} = signin;
  const {navigationServices, hideTabBar} = app;
  const dispatch = useDispatch();
  const {params, name: nameScreen} = useRoute();
  const isFocused = useIsFocused();

  const data = [
    {
      id: 1,
      name: 'linh pham',
    },
    {
      id: 2,
      name: 'tien phan',
    },
    {
      id: 3,
      name: 'tien tien',
    },
    {
      id: 4,
      name: 'pham linh',
    },
    {
      id: 5,
      name: 'hoa tien',
    },
    {
      id: 6,
      name: 'thong nguyen',
    },
    {
      id: 7,
      name: 'loan nguyen',
    },
    {
      id: 8,
      name: 'linh',
    },
    {
      id: 9,
      name: 'linh',
    },
    {
      id: 10,
      name: 'linh',
    },
    {
      id: 11,
      name: 'linh',
    },
    {
      id: 12,
      name: 'linh',
    },
    {
      id: 13,
      name: 'linh',
    },
    {
      id: 14,
      name: 'linh',
    },
  ];

  const pressBack = () => {
    navigationServices?.pop();
  };
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: any) => setSearchQuery(query);

  const search = (params: string) => {
    Alert.alert(params);
  };
  return (
    <>
      <KeyboardAwareScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{...flexRow(true, 20)}}>
              <Appbar.BackAction
                onPress={() => pressBack()}
                style={{alignItems: 'flex-start'}}
              />
              <Searchbar
                autoFocus
                placeholder={titleScreen.search.placeholder}
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{
                  borderRadius: 50,
                  // width: '100%',
                  backgroundColor: '#f1f1f1',
                  elevation: 0,
                  flex: 1,
                }}
                onSubmitEditing={() => search(searchQuery)}
              />
            </View>

            <View
              style={{
                flexWrap: 'wrap',
                ...flexRow(false, 20, 10),
              }}>
              {data.map((item, key) => {
                return (
                  <Chip
                    key={key}
                    // icon="information-outline"
                    onPress={() => console.log('Pressed')}
                    textStyle={[CommonStyles.textNor]}
                    style={{margin: 3}}>
                    {item.name}
                  </Chip>
                );
              })}
            </View>
            <TouchableOpacity onPress={() => pressBack()}>
              <Text>back profile</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </>
  );
};
export default SearchScreen;
