import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Platform,
  ImageBackground,
} from 'react-native';
import {SETTING_SCREEN} from '../../constants/screenKeys';
import {selectState} from '../../redux/reducers';
import {useDispatch} from 'react-redux';
import {hideTabBarAction} from '../../modules/app/actions';
import {useRoute, useIsFocused, useScrollToTop} from '@react-navigation/native';
import MyHeader from '../../components/header';
import titleScreen from '../../constants/titleKeys';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../../styles';
import {scaleFont, scaleSize} from '../../styles/mixins';
import {wait} from '../../util/helper';
import {DIMENSION} from '../../styles/common';
import images from '../../assets/images';

const data = [
  {
    id: 1,
    name: 'linh',
  },
  {
    id: 2,
    name: 'linh',
  },
  {
    id: 3,
    name: 'linh',
  },
  {
    id: 4,
    name: 'linh',
  },
  {
    id: 5,
    name: 'linh',
  },
  {
    id: 6,
    name: 'linh',
  },
  {
    id: 7,
    name: 'linh',
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

const ProfileScreen = () => {
  const {signin, app} = selectState(state => state);
  const {name, id} = signin;
  const {navigationServices, hideTabBar} = app;
  const dispatch = useDispatch();
  const {params, name: nameScreen} = useRoute();
  const isFocused = useIsFocused();
  const refScrollTop = useRef(null);
  useScrollToTop(refScrollTop);

  //local state
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const coverImageView = () => {
    return (
      <View
        style={{
          height: scaleSize(DIMENSION.WINDOW_HEIGHT / 4),
          paddingHorizontal: scaleSize(20),
        }}>
        <ImageBackground
          borderRadius={DIMENSION.borderRadiusMin}
          source={images.ic_tabar_profile}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
    );
  };

  const profileView = () => {
    return (
      <View
        style={
          {
            // flex: 3,
            // backgroundColor: 'red',
            // height: DIMENSION.WINDOW_HEIGHT,
          }
        }>
        <Text>cover iamge</Text>
      </View>
    );
  };
  return (
    <>
      <KeyboardAwareScrollView
        ref={refScrollTop}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <MyHeader
          // title={name ?? titleScreen.profile}
          iconLeft="pencil-outline"
          iconRight="cog-outline"
          pressLeft={_pressEdit}
          pressRight={_pressSetting}
          height={200}
        />
        <View
          style={{
            // paddingBottom: scaleSize(Platform.OS == 'android' ? 110 : 120),
            backgroundColor: Colors.WHITE,
            flex: 1,
          }}>
          {/* {coverImageView()} */}
          {profileView()}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
export default ProfileScreen;
