import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Keyboard,
  FlatList,
} from 'react-native';
import {
  SEARCH_DETAILS_SCREEN,
  SETTING_SCREEN,
} from '../../constants/screenKeys';
import {selectState} from '../../redux/reducers';
import {useDispatch} from 'react-redux';
import {hideTabBarAction} from '../../modules/app/actions';
import {useRoute, useIsFocused} from '@react-navigation/native';
import MyHeader from '../../components/header';
import titleScreen from '../../constants/titleKeys';
import {Chip, Searchbar, Appbar, ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonStyles, {DIMENSION} from '../../styles/common';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {flexRow, scaleSize} from '../../styles/mixins';
import {Colors} from '../../styles';
import {wait} from '../../util/helper';
import LoadMore from '../../components/loadmore';

const SearchScreen = () => {
  const {signin, app} = selectState(state => state);
  const {name, id} = signin;
  const {navigationServices, hideTabBar} = app;
  const dispatch = useDispatch();
  const {params, name: nameScreen} = useRoute();
  const isFocused = useIsFocused();

  // local state
  const [showResultSearch, setShowResultSearch] = useState(false);
  const [loadmore, setLoadmore] = useState(false);

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
      name: 'linh9',
    },
    {
      id: 10,
      name: 'linh10',
    },
    {
      id: 11,
      name: 'linh11',
    },
    {
      id: 12,
      name: 'linh12',
    },
  ];

  const pressBack = () => {
    navigationServices?.pop();
  };
  const [searchQuery, setSearchQuery] = useState('');

  const _onChangeTextSearch = (query: any) => setSearchQuery(query);

  const _onSearch = (params: string) => {
    setShowResultSearch(true);
    console.log('result search: ', params);
  };

  const _onLoadmore = () => {
    Alert.alert('heo')
  };

  const _renderFooterView = () => {
    return <ActivityIndicator color="#000" />;
  };

  const searchView = () => {
    return (
      <View style={{...flexRow(true, 20)}}>
        <Appbar.BackAction
          onPress={() => pressBack()}
          style={{
            alignItems: 'flex-start',
            marginHorizontal: 0,
          }}
        />
        <Searchbar
          autoFocus
          placeholder={titleScreen.search.placeholder}
          onChangeText={_onChangeTextSearch}
          value={searchQuery}
          style={{
            borderRadius: DIMENSION.borderRadiusMax,
            backgroundColor: Colors.TAG,
            elevation: 0,
            flex: 1,
          }}
          onFocus={() => setShowResultSearch(false)}
          onSubmitEditing={() => _onSearch(searchQuery)}
        />
      </View>
    );
  };

  const tagView = () => {
    return (
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
              onPress={() => {
                _onSearch(item.name);
                _onChangeTextSearch(item.name);
              }}
              textStyle={[CommonStyles.textNor]}
              style={{margin: 3}}>
              #{item.name}
            </Chip>
          );
        })}
      </View>
    );
  };

  const renderItem = ({item}: any) => {
    const {name} = item;
    return (
      <View
        style={{
          backgroundColor: '#f9c2ff',
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigationServices?.navigate(SEARCH_DETAILS_SCREEN, {name: name});
          }}>
          <Text style={{...CommonStyles.textNor}}>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const resultSearchView = () => {
    const dataShow = [...data].slice(0, 7);
    return (
      <>
        <FlatList
          data={dataShow}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </>
    );
  };
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
        {searchView()}
        <KeyboardAwareScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            {showResultSearch ? (
              // <FlatList
              //   style={{paddingBottom: scaleSize(120)}}
              //   data={data}
              //   renderItem={renderItem}
              //   keyExtractor={item => item.id.toString()}
              //   ListFooterComponent={_renderFooterView}
              //   onEndReachedThreshold={0.4}
              //   onEndReached={_onLoadmore}
              // />
              <LoadMore/>
            ) : searchQuery ? (
              resultSearchView()
            ) : (
              <View>{tagView()}</View>
            )}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};
export default SearchScreen;
