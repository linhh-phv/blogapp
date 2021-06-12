import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {selectState} from '../../redux/reducers';

const SettingScreen = (props: any) => {
  const {signin, app, videochat} = selectState(state => state);
  const {name, id} = signin;
  const {navigationServices} = app;
  const pressBack = () => {
    navigationServices?.pop();
  };
  useEffect(() => {
    console.log(props.route.name);
    return () => {
      console.log('unmount');
    };
  }, []);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>SettingScreen ne ne</Text>
      <TouchableOpacity onPress={() => pressBack()}>
        <Text>back profile</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SettingScreen;
