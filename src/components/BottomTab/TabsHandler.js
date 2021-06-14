import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

// const {EDIT, EDIT_BLUE} = ICONS.UI.SYSTEM;
const NAVIGATION_BOTTOM_TABS_HEIGHT = 50;

const Box = props => {
  return (
    <View
      style={{
        width: props.width,
        justifyContent: props.justifyContent,
        flexDirection: props.flexDirection,
        height: props.height,
        position: props.position,
      }}>
      {props.children}
    </View>
  );
};
function TabsHandler({tabScreen, tabWidth}) {
  // const {
  //   params: {screen: routeName},
  // } = useRoute();

  function getIcon(tab) {
    switch (tab) {
      default:
        return <Text>logo</Text>;
    }
  }

  return (
    <Box flexDirection="row-reverse">
      {tabScreen.map((tab, key) => {
        if (key === Math.floor(tabScreen.length / 2)) {
          return (
            <Box
              key="logo"
              width={tabWidth}
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height={NAVIGATION_BOTTOM_TABS_HEIGHT}>
              <Box
                position="absolute"
                style={{top: -NAVIGATION_BOTTOM_TABS_HEIGHT / 2}}>
                <Text>Logo</Text>
              </Box>
            </Box>
          );
        }

        return (
          <TouchableOpacity {...{key}} onPress={tab.action}>
            <Box
              width={tabWidth}
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height={NAVIGATION_BOTTOM_TABS_HEIGHT}>
              {getIcon(tab.route)}
              <Text variant="tabRoute">{tab.title}</Text>
            </Box>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
}

export default TabsHandler;
