/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import colors from '../constants/Colors';

//TODO conditionally render the drive dates field
const CommitmentsCard = ({item}) => {
  return (
    <View style={styles.touchboard}>
      <ImageBackground
        style={styles.imgBkg}
        source={require('../assets/images/invBkg.png')}>
        <View style={styles.touch}>
          <View style={styles.header}>
            <Text style={styles.label}>
              <View style={styles.typeView}>
                <Text style={styles.headerContent}>{item.commitmentType}</Text>
              </View>
            </Text>

            <View style={styles.commitmentInfo}>
              {item.driveId ? (
                <Text style={styles.label}>
                  Drive ID : {'  '}
                  <Text style={styles.content}>{item.driveId}</Text>
                </Text>
              ) : (
                <Text style={styles.label}>
                  DonationId ID : {'  '}
                  <Text style={styles.content}>{item.donationId}</Text>
                </Text>
              )}

              <Text style={styles.label}>
                Commitment made on: {'  '}
                <Text style={styles.content}>
                  {item.commitmentDate} at {item.commitmentTime}
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.contentBoard}>
            <View style={styles.addressView}>
              <Text style={styles.addressLabel}>Address:</Text>
              <View style={styles.addressContentView}>
                <Text style={styles.addressContent}>{item.address}</Text>
                <Text style={styles.addressContent}>{item.district}</Text>
                <View style={styles.statePincodeView}>
                  <Text style={styles.addressContent}>{item.state + ' '}</Text>
                  <Text style={styles.addressContent}>({item.pincode})</Text>
                </View>
              </View>
            </View>
            <View style={styles.detailsView}>
              <Text style={styles.addressLabel}>Details: </Text>
              <View style={styles.addressContentView}>
                <Text style={styles.recipientLabel}>
                  Recipient name:{' '}
                  <Text style={styles.recipientContent}>
                    {item.recipientName}
                  </Text>
                </Text>
                <Text style={styles.recipientLabel}>
                  Recipient contact:{' '}
                  <Text style={styles.recipientContent}>
                    {item.recipientContact}
                  </Text>
                </Text>
                {item.driveId ? (
                  <Text style={styles.recipientLabel}>
                    Drive dates:{' '}
                    <Text style={styles.recipientContent}>
                      {item.driveDates}
                    </Text>
                  </Text>
                ) : null}
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.label}>Compeleted: {'  '}</Text>
            {item.compeleted ? (
              <View style={styles.yes}>
                <Text style={styles.yesnocontent}>YES</Text>
              </View>
            ) : (
              <View style={styles.no}>
                <Text style={styles.content}>NO</Text>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  touchboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    elevation: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  touch: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  imgBkg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  header: {
    padding: 20,
  },
  commitmentInfo: {
    marginTop: 20,
  },
  label: {
    padding: 2,
    color: colors.additional2,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
  },
  contentBoard: {
    backgroundColor: colors.additional2,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
  },
  content: {
    color: colors.additional2,
  },
  typeView: {
    backgroundColor: colors.additional2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  headerContent: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  footer: {
    padding: 20,
    flexDirection: 'row',
  },
  yes: {
    backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  no: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  yesnocontent: {
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: colors.additional2,
  },
  addressBoard: {},
  addressLabel: {
    fontSize: 20,
    color: colors.primary,
    paddingTop: 10,
  },
  addressContentView: {
    paddingVertical: 20,
  },
  addressContent: {
    color: colors.additional1,
    fontFamily: 'sans-serif',
    fontSize: 15,
  },
  detailsView: {},
  recipientLabel: {},
  recipientContent: {},
});

export default CommitmentsCard;
