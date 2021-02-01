import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import colors from '../constants/Colors';

const CommitmentsCard = ({item}) => {
  return (
    <View style={styles.touchboard}>
      <View style={styles.touch}>
        <View style={styles.labelBoard}>
          <Text style={styles.label}>
            Type :<Text style={styles.content}>{item.commitmentType}</Text>
          </Text>
          {item.driveId ? (
            <Text style={styles.label}>
              Drive ID :<Text style={styles.content}>{item.driveId}</Text>
            </Text>
          ) : (
            <Text style={styles.label}>
              DonationId ID :
              <Text style={styles.content}>{item.donationId}</Text>
            </Text>
          )}
          <Text style={styles.label}>
            Commitment made on :
            <Text style={styles.content}>
              {item.commitmentDate} at {item.commitmentTime}
            </Text>
          </Text>
          <Text style={styles.label}>
            Address: <Text style={styles.content}>{item.address}</Text>
          </Text>
          <Text style={styles.label}>
            District: <Text style={styles.content}>{item.district}</Text>
          </Text>
          <Text style={styles.label}>
            State: <Text style={styles.content}>{item.state}</Text>
          </Text>
          <Text style={styles.label}>
            Pincode: <Text style={styles.content}>{item.pincode}</Text>
          </Text>
          <Text style={styles.label}>
            Recipient contact:
            <Text style={styles.content}>{item.recipientContact}</Text>
          </Text>
          <Text style={styles.label}>
            Drive dates:
            <Text style={styles.content}>{item.driveDates}</Text>
          </Text>
          <Text style={styles.label}>
            Compeleted:
            <Text style={styles.content}>{item.compeleted}</Text>
          </Text>
        </View>
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
});

export default CommitmentsCard;
