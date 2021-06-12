import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  HOME_SCREEN,
  SETTING_SCREEN,
  PROFILE_SCREEN,
  POSTS_SCREEN,
} from '../constants/screenKeys';
import HomeScreen from '../screen/home';
import ProfileScreen from '../screen/profile';
import PostsScreen from '../screen/posts';
import SettingScreen from '../screen/setting';

const HomeStackNavigator = createStackNavigator();
const PostsStackNavigator = createStackNavigator();
const ProfileStackNavigator = createStackNavigator();

const Tab = createBottomTabNavigator();

const homeScreen = [
  {
    name: HOME_SCREEN,
    component: HomeScreen,
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
    title: 'Home',
  },
  {
    name: POSTS_SCREEN,
    component: PostsStack,
    title: 'Posts',
  },
  {
    name: PROFILE_SCREEN,
    component: ProfileStack,
    title: 'Profile',
  },
];

const AppsScreens = () => {
  return (
    <Tab.Navigator>
      {tabScreen.map((item, key) => (
        <Tab.Screen
          key={key}
          name={item.name}
          component={item.component}
          options={{title: item.title}}
        />
      ))}
    </Tab.Navigator>
  );
};

export default AppsScreens;
