/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import colors from '../constants/Colors';

const TouchTabs = (props) => {
  return (
    <View style={styles.touchboard}>
      <TouchableOpacity style={styles.touch} onPress={props.touchHandler}>
        <Image {...props} style={styles.image} />
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
    fontFamily: 'Montserrat-Bold',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default TouchTabs;
