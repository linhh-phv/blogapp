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
  Image,
  ImageBackground,
  StyleSheet,
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
import CommonStyles from '../../styles/common';
import {Badge} from 'react-native-paper';
import images from '../../assets/images';
import {ScrollView} from 'react-native-gesture-handler';
import {
  scaleSize,
  scaleFont,
  viewAnonymous,
  boxShadow,
} from '../../styles/mixins';

import {ceil} from 'react-native-reanimated';

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

  // local state
  const [hideHeader, setHideHeader] = useState(true);
  const [isRecent, setRecent] = useState('Recent');
  const [value, setValue] = useState('');

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

  const storyView = () => {
    return (
      <View style={{backgroundColor: '#fff'}}>
        <View
          style={[
            CommonStyles.flexRow,
            {
              paddingVertical: 20,
            },
          ]}>
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
                    borderRadius={15}
                    style={{
                      width: scaleFont(100),
                      height: scaleFont(120),
                    }}>
                    <View
                      style={{
                        borderRadius: 15,
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
  const postsView = () => {
    return (
      <View style={{backgroundColor: '#fff', height: 300}}>
        <View style={[CommonStyles.flexRow, {justifyContent: 'flex-start'}]}>
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
  return (
    <>
      <KeyboardAwareScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}>
        <MyHeader
          title={titleScreen.home}
          iconLeft="magnify"
          iconRight="dots-horizontal"
          pressLeft={_pressSearch}
          pressRight={_pressSearch2}
        />
        {storyView()}
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
    backgroundColor: '#f1f1f1',
    borderRadius: 15,
    paddingHorizontal: scaleSize(10),
    justifyContent: 'center',
  },

  storyView_anonymous: viewAnonymous('#000', 0.2),

  storyView_storyImage: {
    flexDirection: 'row',
    // backgroundColor: '#f1f1',
    paddingVertical: 10,
  },
  storyView_storyImage_text: {
    color: '#fff',
    fontSize: scaleFont(16),
    textAlign: 'center',
    marginTop: scaleSize(-30),
    paddingHorizontal: scaleSize(5),
  },
});
