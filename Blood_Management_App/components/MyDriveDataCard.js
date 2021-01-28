/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/Colors';

const MyDriveDataCard = (props) => {
  return (
    <View style={styles.touchboard}>
      <View style={styles.touch}>
        <View style={styles.labelBoard}>
          <Text style={styles.label}>{props.startDate}</Text>
          <Text style={styles.label}>{props.startTime}</Text>
          <Text style={styles.label}>{props.endDate}</Text>
          <Text style={styles.label}>{props.endTime}</Text>
          <Text style={styles.label}>{props.address}</Text>
          <Text style={styles.label}>{props.state}</Text>
          <Text style={styles.label}>{props.district}</Text>
          <Text style={styles.label}>{props.pincode}</Text>
          <Text style={styles.label}>{props.bloodGroupsInvited}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  touchboard: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  touch: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.additional2,
    justifyContent: 'flex-end',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  labelBoard: {},
  label: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
  },
});

export default MyDriveDataCard;
