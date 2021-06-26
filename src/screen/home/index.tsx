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
  FlatList,
  Share,
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
import {Badge, Avatar, Appbar} from 'react-native-paper';
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
import {wait} from '../../util/helper';
import ItemSeparatorView from '../../components/list/ItemSeparatorView';

const data = [
  {image: images.ic_tabar_profile, name: 'linh pham pham pham'},
  {image: images.ic_tabar_profile, name: 'linh2'},
  {image: images.ic_tabar_profile, name: 'linh3'},
  {image: images.ic_tabar_profile, name: 'linh4'},
  {image: images.ic_tabar_profile, name: 'linh5'},
  {image: images.ic_tabar_profile, name: 'linh6'},
];
const data2 = [
  {
    id: 1,
    name: 'Pham Linh',
    subName: 'linhh.phv',
    date: "June '23",
    image: images.ic_tabar_profile,
    title: ' Suy nghĩ của 1 lập trình viên (Phần 1)',
    content: 'this is content, helo everybody',
  },
  {
    id: 2,
    name: 'Linh Pham',
    subName: 'linhh.ph',
    date: "June '24",
    image: null,
    title: 'Suy nghĩ của 1 lập trình viên (Phần 2)',
    content: 'this is content, helo everybody',
  },
  {
    id: 3,
    name: 'Pham Linh',
    subName: 'linhh.phv',
    date: "June '25",
    image: images.ic_tabar_profile,
    title: 'This is Tittle',
    content: 'this is content, helo everybody',
  },
  {
    id: 4,
    name: 'Pham Linh',
    subName: 'linhh.phv',
    date: "June '26",
    image: null,
    title: 'This is Tittle',
    content: 'this is content, helo everybody',
  },
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
  const [heart, setHeart] = useState(false);
  const [isRecent, setRecent] = useState('Recent Posts');
  const [value, setValue] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const buttonsPosts = ['Recent Posts', 'Following'];

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
    wait(1000).then(() => setRefreshing(false));
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
        <View style={{...flexRow(true, 20)}}>
          {buttonsPosts.map((item, key) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={() => setRecent(item)}
                style={{
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: scaleFont(18),
                    fontWeight: '600',
                    paddingVertical: scaleSize(10),
                  }}>
                  {item}
                </Text>
                {isRecent == item && (
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
            );
          })}
        </View>
      </View>
    );
  };

  const _pressPostsItem = () => {
    // Alert.alert('heo');
  };

  const _pressHeart = () => {
    setHeart(true);
  };

  const _pressShare = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message:
          'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
        url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={_pressPostsItem}
        style={{
          backgroundColor: Colors.WHITE,
        }}>
        <View
          style={{
            ...flexRow(true, 20, 20),
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 7,
              height: scaleSize(40),
            }}>
            <Avatar.Image
              size={scaleSize(40)}
              source={images.ic_tabar_profile}
              style={{
                justifyContent: 'center',
                height: '100%',
                backgroundColor: 'transparent',
              }}
            />
            <View
              style={{paddingLeft: scaleSize(10), justifyContent: 'center'}}>
              <Text style={{...CommonStyles.textNor}} numberOfLines={1}>
                {item?.name?.trim()}
              </Text>
              <Text style={{...CommonStyles.textLow}} numberOfLines={1}>
                {item?.subName?.trim()}
              </Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'center',
              flex: 3,
              alignItems: 'flex-end',
            }}>
            <Text style={{...CommonStyles.textNor}}>{item?.date}</Text>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: scaleSize(20),
            paddingBottom: scaleSize(10),
          }}>
          <Text
            style={{
              ...CommonStyles.textHigh,
              paddingBottom: scaleSize(5),
            }}>
            {item?.title?.trim()}
          </Text>
          <Text
            numberOfLines={3}
            style={{
              ...CommonStyles.textMid,
              lineHeight: scaleFont(20),
            }}>
            Một dịp hiếm hoi tôi được ngồi ăn trưa với mấy đứa bạn học chung hồi
            đại học. Cả bọn đều đang làm cho các công ty phần mềm lớn, ngót ngét
            cũng được hơn 2 năm rồi. Dạo này bên mày “cày” dữ không? Cũng như
            trước. Bị bên kia nó dí giữ quá. … Bây giờ tao nhận ra rằng đi làm
            phần mềm là một sai lầm. Tưởng rằng lương cao chứ thật ra chẳng bằng
            ai. Tao thấy mấy đứa bạn đi làm mấy ngành khác sướng hơn nhiều. Mấy
            đứa đi làm sales giàu quá trời. Còn mấy đứa bạn tao đi làm bên ngành
            ngân hàng cũng đã lắm. Tính ra thì học y hoặc dược hơi cực nhưng bây
            giờ đứa nào cũng ngon lành. Câu chuyện tiếp tục với đề tài liên quan
            đến các ngành nghề khác. Ở thời buổi này thì cả bọn thấy làm nghề gì
            cũng sướng hết, vừa có thu nhập cao lại vừa lý thú, trừ cái nghề lập
            trình viên mà cả bọn đang theo đuổi!
          </Text>
        </View>

        {item.image && (
          <View
            style={{
              height: (DIMENSION.WINDOW_WIDTH * 3) / 4,
              width: DIMENSION.WINDOW_WIDTH,
            }}>
            <Image
              source={images.ic_tabar_profile}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: Colors.TAG,
              }}
              resizeMode="cover"
            />
          </View>
        )}
        <View
          style={{
            ...flexRow(true, 20, 0),
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Appbar.Action
              icon={heart ? 'cards-heart' : 'heart-outline'}
              color={heart ? Colors.LIKE : Colors.BLACK}
              onPress={_pressHeart}
            />
            <Text>464</Text>
          </View>
          <View style={{}}>
            <Appbar.Action
              icon={'share-variant'}
              color={Colors.BLACK}
              onPress={_pressShare}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const _separatorComponent = () => {
    return <ItemSeparatorView height={10} />;
  };

  const postsView = () => {
    return (
      <>
        <FlatList
          data={data2}
          renderItem={renderItem}
          ItemSeparatorComponent={_separatorComponent}
          keyExtractor={item => item.id.toString()}
        />
      </>
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
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            paddingBottom: scaleSize(Platform.OS == 'android' ? 110 : 120),
            backgroundColor: Colors.WHITE,
          }}>
          {storyView()}
          {selectPostsView()}
          {postsView()}
        </View>
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
