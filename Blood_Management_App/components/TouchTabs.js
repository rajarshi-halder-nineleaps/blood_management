/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import colors from '../constants/Colors';

const TouchTabs = (props) => {
  return (
    <View style={styles.touchboard}>
      <TouchableOpacity style={styles.touch} onPress={props.touchHandler}>
        <Image
          style={styles.image}
          source={require('../assets/images/servicesScreen/findDonors.png')}
        />
        <View style={styles.labelBoard}>
          <Text style={styles.label}>{props.label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  touchboard: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    height: 150,
  },
  touch: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.additional2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  labelBoard: {
    width: '100%',
  },
  label: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default TouchTabs;
