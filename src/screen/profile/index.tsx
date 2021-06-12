import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SETTING_SCREEN} from '../../constants/screenKeys';
import {selectState} from '../../redux/reducers';

const ProfileScreen = () => {
  const {signin, app, videochat} = selectState(state => state);
  const {name, id} = signin;
  const {navigationServices} = app;
  console.log('profile');
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>profile ne ne</Text>
      <TouchableOpacity
        onPress={() => navigationServices?.navigate(SETTING_SCREEN, {id: 111})}>
        <Text>setting</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileScreen;
