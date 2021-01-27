import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {logUserOut} from '../../../redux/auth/actions';
import {useDispatch} from 'react-redux';
const Profile = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => dispatch(logUserOut())}>
        <Text style={{fontFamily: 'sans-serif-condensed'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
