/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';

const UpcomingDrivesCard = (props) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.touchboard}>
      <View style={styles.touch}>
        <View style={styles.labelBoard}>
          <Text style={styles.label}>
            Drive ID :<Text style={styles.content}>{props.item.driveId}</Text>
          </Text>
          <Text style={styles.label}>
            Start :
            <Text style={styles.content}>
              {props.item.startDate} at {props.item.startTime}
            </Text>
          </Text>
          <Text style={styles.label}>
            End:
            <Text style={styles.content}>
              {props.item.endDate} at {props.item.endTime}
            </Text>
          </Text>
          <Text style={styles.label}>
            Address: <Text style={styles.content}>{props.item.address}</Text>
          </Text>
          <Text style={styles.label}>
            District: <Text style={styles.content}>{props.item.district}</Text>
          </Text>
          <Text style={styles.label}>
            State: <Text style={styles.content}>{props.item.state}</Text>
          </Text>
          <Text style={styles.label}>
            Pincode: <Text style={styles.content}>{props.item.pincode}</Text>
          </Text>
          <Text style={styles.label}>
            Blood groups invited:
            <Text style={styles.content}>{props.item.bloodGroupsInvited}</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.donorListTouch}
          onPress={() => {
            console.log(
              'initiated user registration for drive',
              props.item.driveId,
            );
            dispatch(
              props.registerUserForDrive(props.userToken, props.item.driveId),
            );
          }}>
          <Text style={styles.touchText}>Register for this drive</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  touchboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  touch: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.additional2,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  label: {
    padding: 2,
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
  },
  content: {
    color: colors.additional1,
  },
  donorListTouch: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
  },
  touchText: {
    color: colors.additional2,
    fontFamily: 'sans-serif-light',
  },
});

export default UpcomingDrivesCard;
