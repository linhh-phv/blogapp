import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeArea} from 'react-native-safe-area-context';

import {
  HOME_SCREEN,
  SETTING_SCREEN,
  PROFILE_SCREEN,
  POSTS_SCREEN,
  SEARCH_SCREEN,
  SEARCH_DETAILS_SCREEN,
} from '../constants/screenKeys';
import HomeScreen from '../screen/home';
import ProfileScreen from '../screen/profile';
import PostsScreen from '../screen/posts';
import SettingScreen from '../screen/setting';
import {StyleSheet, Platform} from 'react-native';
import TabsUI from '../components/BottomTab/TabsUI';
import TabBarIcon from '../components/BottomTab/TabBarIcon';
import {selectState} from '../redux/reducers';
import titleScreen from '../constants/titleKeys';
import {scaleSize, dimensions, boxShadow} from '../styles/mixins';
import SearchScreen from '../screen/search';
import {DIMENSION} from '../styles/common';
import SearchDetailsScreen from '../screen/search/SearchDetails';

const HomeStackNavigator = createStackNavigator();
const PostsStackNavigator = createStackNavigator();
const ProfileStackNavigator = createStackNavigator();

const Tab = createBottomTabNavigator();

const homeScreen = [
  {
    name: HOME_SCREEN,
    component: HomeScreen,
  },
  {
    name: SEARCH_SCREEN,
    component: SearchScreen,
  },
  {
    name: SEARCH_DETAILS_SCREEN,
    component: SearchDetailsScreen,
  },
];

const postsScreen = [
  {
    name: POSTS_SCREEN,
    component: PostsScreen,
  },
];

const profileScreen = [
  {
    name: PROFILE_SCREEN,
    component: ProfileScreen,
  },
  {
    name: SETTING_SCREEN,
    component: SettingScreen,
  },
];

function HomeStack() {
  return (
    <HomeStackNavigator.Navigator
      headerMode={'none'}
      screenOptions={{gestureEnabled: false}}>
      {homeScreen.map((item, key) => (
        <HomeStackNavigator.Screen
          key={key}
          name={item.name}
          component={item.component}
        />
      ))}
    </HomeStackNavigator.Navigator>
  );
}

function PostsStack() {
  return (
    <PostsStackNavigator.Navigator
      headerMode={'none'}
      screenOptions={{gestureEnabled: false}}>
      {postsScreen.map((item, key) => (
        <PostsStackNavigator.Screen
          key={key}
          name={item.name}
          component={item.component}
        />
      ))}
    </PostsStackNavigator.Navigator>
  );
}

function ProfileStack() {
  return (
    <ProfileStackNavigator.Navigator
      headerMode={'none'}
      screenOptions={{gestureEnabled: false}}>
      {profileScreen.map((item, key) => (
        <ProfileStackNavigator.Screen
          key={key}
          name={item.name}
          component={item.component}
        />
      ))}
    </ProfileStackNavigator.Navigator>
  );
}

const tabScreen = [
  {
    name: HOME_SCREEN,
    component: HomeStack,
    title: titleScreen.home,
    icon: 'home',
    color: '#7F5DF0',
    isPosts: false,
    isProfile: false,
  },
  {
    name: POSTS_SCREEN,
    component: PostsStack,
    title: titleScreen.posts,
    icon: 'form',
    color: '#7F5DF0',
    isPosts: true,
    isProfile: false,
  },
  {
    name: PROFILE_SCREEN,
    component: ProfileStack,
    title: titleScreen.profile,
    icon: 'wallet',
    color: '#7F5DF0',
    isPosts: false,
    isProfile: true,
  },
];
// const tabs = [{ name: 'A' },{ name: 'B' }, { name: 'C' }, { name: 'D' }, { name: 'E' }];

const AppsScreens = () => {
  const {bottom} = useSafeArea();
  const {hideTabBar} = selectState(state => state.app);
  return (
    // <Tab.Navigator tabBar={props => <TabsUI {...{tabScreen:tabs, ...props}} />}>
    <Tab.Navigator
      tabBarOptions={
        hideTabBar
          ? {
              showLabel: false,
              style: [
                {
                  position: 'absolute',
                  borderRadius: DIMENSION.borderRadiusMin,
                  height: scaleSize(70),
                  ...styles.shadow,
                },
                dimensions(
                  undefined,
                  20,
                  Platform.OS == 'android' ? scaleSize(25) : bottom,
                  20,
                ),
              ],
            }
          : undefined
      }>
      {tabScreen.map((item, key) => (
        <Tab.Screen
          key={key}
          name={item.name}
          component={item.component}
          options={{
            // title: item.title,
            tabBarIcon: ({focused}) =>
              hideTabBar ? (
                <TabBarIcon
                  icon={item.icon}
                  colorActive={item.color}
                  colorNonActive={'#000'}
                  sizeMax={1.2}
                  sizeMin={scaleSize(25)}
                  focused={focused}
                  isPosts={item.isPosts}
                  isProfile={item.isProfile}
                />
              ) : undefined,
            tabBarVisible: hideTabBar,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: boxShadow(
    '#7F5DF0',
    0,
    10,
    3.5,
    0.25,
    Platform.OS == 'android' ? 10 : 5,
  ),
});
export default AppsScreens;
