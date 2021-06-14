import React, {useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {View} from 'react-native';

import TabsHandler from './TabsHandler';
import TabsShape from './TabsShape';

const {width: wWidth} = Dimensions.get('window');

function TabsUI({tabScreen}) {
  const {bottom} = useSafeArea();
  const tabWidth = wWidth / tabScreen.length;
  return (
    <>
      <View
        style={{
          position: 'absolute',
          height: 50,
          width: wWidth,
          bottom: bottom,
          backgroundColor: 'transparent',
        }}>
        <TabsShape {...{tabWidth}} />
        {/* <View style={[StyleSheet.absoluteFill]}>
          <TabsHandler {...{tabScreen, tabWidth}} />
        </View> */}
      </View>
    </>
  );
}

export default TabsUI;
