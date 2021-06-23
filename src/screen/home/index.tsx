import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
  Platform,
  StatusBar,
  Image,
  ImageBackground,
  StyleSheet,
  Animated,
  RefreshControl,
} from 'react-native';
import {logoutAction} from '../../modules/signin/actions';
import {hideTabBarAction} from '../../modules/app/actions';

import {selectState} from '../../redux/reducers';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {POSTS_SCREEN, SEARCH_SCREEN} from '../../constants/screenKeys';
import {useRoute, useIsFocused, useScrollToTop} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MyHeader from '../../components/header';
import titleScreen from '../../constants/titleKeys';
import CommonStyles, {DIMENSION} from '../../styles/common';
import {Badge, Avatar} from 'react-native-paper';
import images from '../../assets/images';
import {ScrollView} from 'react-native-gesture-handler';
import {
  scaleSize,
  scaleFont,
  viewAnonymous,
  boxShadow,
  flexRow,
  dual_dimensions,
} from '../../styles/mixins';

import {Colors} from '../../styles';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { wait } from '../../util/helper';

const data = [
  {image: images.ic_tabar_profile, name: 'linh pham pham pham'},
  {image: images.ic_tabar_profile, name: 'linh2'},
  {image: images.ic_tabar_profile, name: 'linh3'},
  {image: images.ic_tabar_profile, name: 'linh4'},
  {image: images.ic_tabar_profile, name: 'linh5'},
  {image: images.ic_tabar_profile, name: 'linh6'},
];

const HomeScreen = (props: any) => {
  const {signin, app} = selectState(state => state);
  const {name, id} = signin;
  const {navigationServices, hideTabBar} = app;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const refScrollTop = useRef(null);
  useScrollToTop(refScrollTop);

  // local state
  const [hideHeader, setHideHeader] = useState(true);
  const [isRecent, setRecent] = useState('Recent');
  const [value, setValue] = useState('');
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const _pressSearch = () => {
    navigationServices?.push(SEARCH_SCREEN);
  };

  const _pressSearch2 = () => {
    // alert('seatch');
  };

  const storyView = () => {
    return (
      <View style={{backgroundColor: Colors.WHITE}}>
        <View style={{...flexRow(true, 20, 20)}}>
          <View>
            <Text style={{fontSize: scaleFont(18), fontWeight: '600'}}>
              Top 20 today
            </Text>
          </View>
          <TouchableOpacity
            style={styles.storyView_viewAll}
            onPress={() => Alert.alert('show all')}>
            <Text style={{fontSize: scaleFont(16)}}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.storyView_storyImage}>
            {data.map((item, key) => {
              return (
                <TouchableOpacity
                  key={key}
                  style={{padding: 5}}
                  onPress={() => {
                    setValue(item.name);
                    Alert.alert(item.name);
                  }}>
                  <ImageBackground
                    source={item.image}
                    borderRadius={DIMENSION.borderRadiusMin}
                    style={{
                      width: scaleFont(100),
                      height: scaleFont(120),
                    }}>
                    <View
                      style={{
                        borderRadius: DIMENSION.borderRadiusMin,
                        ...styles.storyView_anonymous,
                      }}
                    />
                    <Text
                      numberOfLines={1}
                      style={styles.storyView_storyImage_text}>
                      {item.name}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  };

  const selectPostsView = () => {
    return (
      <View style={{backgroundColor: Colors.WHITE}}>
        <View style={{...flexRow(false, 20), justifyContent: 'flex-start'}}>
          <TouchableOpacity onPress={() => setRecent('Recent')}>
            <Text
              style={{
                fontSize: scaleFont(18),
                fontWeight: '600',
                paddingVertical: scaleSize(10),
              }}>
              Recent Posts
            </Text>
            {isRecent == 'Recent' && (
              <Badge
                style={{
                  backgroundColor: '#7F5DF0',
                  alignSelf: 'center',
                  paddingHorizontal: 20,
                  height: 5,
                }}
                size={10}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: scaleSize(20)}}
            onPress={() => setRecent('Following')}>
            <Text
              style={{
                fontSize: scaleFont(18),
                fontWeight: '600',
                paddingVertical: scaleSize(10),
              }}>
              Following
            </Text>
            {isRecent == 'Following' && (
              <Badge
                style={{
                  backgroundColor: '#7F5DF0',
                  alignSelf: 'center',
                  paddingHorizontal: 20,
                  height: 5,
                }}
                size={10}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const postsView = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.WHITE,
          height: 1000,
          alignItems: 'center',
        }}>
        <View style={{...flexRow(true, 20, 20), width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              flex: 7,
            }}>
            <Avatar.Image
              size={scaleSize(30)}
              source={images.ic_tabar_profile}
            />
            <View style={{paddingLeft: 10, justifyContent: 'center'}}>
              <Text style={{...CommonStyles.textNor}} numberOfLines={1}>
                Linh Pham
              </Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'center',
              flex: 3,
              alignItems: 'flex-end',
            }}>
            <Text style={{...CommonStyles.textNor}}>22:17</Text>
          </View>
        </View>

        <View
          style={{
            width: DIMENSION.WINDOW_WIDTH - 20,
            height: DIMENSION.WINDOW_WIDTH - 20,
            borderRadius: DIMENSION.borderRadiusMax,
          }}>
          <Image
            source={images.ic_tabar_profile}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: Colors.TAG,
              borderRadius: DIMENSION.borderRadiusMax,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <MyHeader
        title={titleScreen.home.main}
        subTitle={titleScreen.home.sub}
        iconLeft="magnify"
        iconRight="bell"
        pressLeft={_pressSearch}
        pressRight={_pressSearch2}
      />

      <KeyboardAwareScrollView
        ref={refScrollTop}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {storyView()}
        {selectPostsView()}
        {postsView()}
      </KeyboardAwareScrollView>
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  shadow: boxShadow(
    '#7F5DF0',
    0,
    10,
    3.5,
    0.25,
    Platform.OS == 'android' ? 10 : 5,
  ),

  storyView_viewAll: {
    backgroundColor: Colors.TAG,
    borderRadius: DIMENSION.borderRadiusMin,
    paddingHorizontal: scaleSize(10),
    justifyContent: 'center',
  },

  storyView_anonymous: viewAnonymous('#000', 0.2),

  storyView_storyImage: {
    flexDirection: 'row',
    // backgroundColor: '#f1f1',
    paddingVertical: scaleSize(10),
  },
  storyView_storyImage_text: {
    color: Colors.WHITE,
    textAlign: 'center',
    marginTop: scaleSize(-30),
    ...CommonStyles.textNor,
    ...dual_dimensions(5, undefined, 'padding'),
  },
});
