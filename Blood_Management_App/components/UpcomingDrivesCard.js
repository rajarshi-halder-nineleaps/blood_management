/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import colors from '../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';

const UpcomingDrivesCard = (props) => {
  const dispatch = useDispatch();
  console.log('ID', props.item.driveId);
  return (
    <View style={styles.touchboard}>
      <View style={styles.touch}>
        <ImageBackground
          style={styles.imgBkg}
          source={require('../assets/images/invBkg.png')}>
          <View>
            <View style={styles.header}>
              <View style={styles.titleView}>
                <Text style={styles.headerText}>Drive ID :</Text>
                <View style={styles.idView}>
                  <Text style={styles.headerContent}>{props.item.driveId}</Text>
                </View>
              </View>
              <View style={styles.dateTimeView}>
                <Text style={styles.dateTimeLabel}>
                  FROM:{'  '}
                  <Text style={styles.dateTimeContent}>
                    {props.item.startDate} at {props.item.startTime}
                  </Text>
                </Text>
                <Text style={styles.dateTimeLabel}>
                  TO:{'  '}
                  <Text style={styles.dateTimeContent}>
                    {props.item.endDate} at {props.item.endTime}
                  </Text>
                </Text>
              </View>
            </View>

            <View style={styles.contentBoard}>
              <View style={styles.addressView}>
                <Text style={styles.label}>Address:</Text>
                <View style={styles.addressContentView}>
                  <Text style={styles.content}>{props.item.address},</Text>
                  <Text style={styles.content}>{props.item.district},</Text>
                  <View style={styles.statePincodeView}>
                    <Text style={styles.content}>{props.item.state + ' '}</Text>
                    <Text style={styles.content}>({props.item.pincode})</Text>
                  </View>
                </View>
              </View>
              <View style={styles.groupsView}>
                <Text style={styles.label}>Blood groups invited:</Text>
                <View style={styles.groupsContentView}>
                  {props.item.bloodGroupsInvited.map((val) => {
                    return (
                      <View key={val} style={styles.indGroup}>
                        <Text style={styles.indGroupContent}>{val}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              <View style={styles.orgDetails}>
                <View style={styles.addressView}>
                  <Text style={styles.label}>Organizer details:</Text>
                  <View style={styles.detailsView}>
                    <Text style={styles.content}>
                      {props.item.orgName || 'DUMMY NAME'},
                    </Text>
                  </View>
                  <View style={styles.addressContentView}>
                    <Text style={styles.content}>{props.item.address},,</Text>
                    <Text style={styles.content}>{props.item.district},,</Text>
                    <View style={styles.statePincodeView}>
                      <Text style={styles.content}>
                        {props.item.state + ' '}
                      </Text>
                      <Text style={styles.content}>({props.item.pincode})</Text>
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.donorListTouch}
                onPress={() => {
                  console.log(
                    'initiated user registration for drive',
                    props.item.driveId,
                  );
                  dispatch(
                    props.registerUserForDrive(
                      props.userToken,
                      props.item.driveId,
                    ),
                  );
                }}>
                <ImageBackground
                  style={styles.imgBtnBkg}
                  source={require('../assets/images/invBkg.png')}>
                  <View style={styles.touchContainerView}>
                    <Text style={styles.touchText}>
                      Register for this drive
                    </Text>
                    <View style={styles.iconView}>
                      <Feather
                        name="chevrons-right"
                        color={colors.additional2}
                        size={20}
                      />
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  touchboard: {
    flex: 1,
    borderRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    margin: 20,
  },
  touch: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  subLabel: {
    color: colors.secondary,
    fontSize: 18,
  },
  miniLabel: {
    color: colors.grayishblack,
    fontWeight: 'bold',
  },
  imgBkg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    overflow: 'hidden',
    height: '100%',
  },

  header: {
    paddingTop: 50,
    padding: 20,
  },
  titleView: {
    flexDirection: 'row',
  },
  headerText: {
    color: colors.additional2,
    fontWeight: 'bold',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  idView: {
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
  dateTimeView: {
    paddingTop: 10,
  },
  dateTimeLabel: {
    color: colors.additional2,
    fontWeight: 'bold',
  },
  dateTimeContent: {
    color: colors.additional2,
    fontWeight: '100',
  },
  imgBtnBkg: {
    width: '100%',
  },
  donorListTouch: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  touchText: {
    color: colors.additional2,
    fontFamily: 'sans-serif-light',
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBoard: {
    padding: 20,
    backgroundColor: colors.additional2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  label: {
    fontSize: 20,
    color: colors.primary,
    paddingTop: 10,
  },
  addressContentView: {
    paddingVertical: 20,
  },
  groupsContentView: {
    paddingVertical: 20,
    flexDirection: 'row',
  },
  indGroup: {
    backgroundColor: colors.primary,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: 2,
    padding: 5,
  },
  indGroupContent: {
    color: colors.additional2,
    fontSize: 12,
  },
  content: {
    color: colors.additional1,
    fontFamily: 'sans-serif',
    fontSize: 15,
  },
  statePincodeView: {
    flexDirection: 'row',
  },
  touchContainerView: {
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default UpcomingDrivesCard;
