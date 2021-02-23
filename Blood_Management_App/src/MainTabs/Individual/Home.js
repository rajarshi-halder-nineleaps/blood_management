/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
const Home = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontFamily: 'Montserrat-Regular'}}>Home</Text>
    </View>
  );
};

export default Home;
