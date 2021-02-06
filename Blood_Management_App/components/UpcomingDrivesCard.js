/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
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
import AreYouSure from './AreYouSure';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

const UpcomingDrivesCard = (props) => {
  const {item} = props;
  const dispatch = useDispatch();

  const [rusure, setRusure] = useState(false);

  return (
    <>
      <Collapse>
        <CollapseHeader style={styles.touchboard}>
          <View style={styles.headerDetailsView}>
            <View style={styles.nameView}>
              <Text style={styles.nameText}>{item.orgName}</Text>
            </View>
            <View style={styles.miniAddressView}>
              <Text style={styles.miniAddressContent}>
                From:{'  '}
                <Text style={styles.miniDateTimeContent}>
                  {item.startDate} at {item.startTime}
                </Text>
              </Text>
              <Text style={styles.miniAddressContent}>
                To:{'  '}
                <Text style={styles.miniDateTimeContent}>
                  {item.endDate} at {item.endTime}
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.headerIndicatorView}>
            <TouchableOpacity
              style={styles.donorListTouch}
              onPress={() => {
                console.log(
                  'initiated user registration for drive',
                  props.item.driveId,
                );
                setRusure(true);
              }}>
              <View style={styles.touchContainerView}>
                <Text style={styles.touchText}>Register</Text>
                <View style={styles.iconView}>
                  <Feather
                    name="chevrons-right"
                    color={colors.additional2}
                    size={20}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </CollapseHeader>
        <CollapseBody style={styles.collBody}>
          <View style={styles.bodyHeader}>
            {item.driveId ? (
              <Text style={styles.bodyLabel}>
                Drive ID : {'  '}
                <Text style={styles.bodyContent}>{item.driveId}</Text>
              </Text>
            ) : (
              <Text style={styles.bodyLabel}>
                DonationId ID : {'  '}
                <Text style={styles.bodyContent}>{item.donationId}</Text>
              </Text>
            )}
          </View>

          <View style={styles.detailsBoard}>
            <View style={styles.contentView}>
              <View style={styles.addressView}>
                <Text style={styles.addressLabel}>Drive details:</Text>
                <View style={styles.addressContentView}>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>Address: </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.address}, {item.district}, {'\n'}
                        {item.state} [{item.pincode}]
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>
                      Organizer Name:
                    </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>{item.orgName}</Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>Email:</Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>{item.orgEmail}</Text>
                    </View>
                  </View>

                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>Contact:</Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.orgContact}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.addressContentView}>
              <View style={styles.addressView}>
                <Text style={styles.addressLabel}>Blood groups invited:</Text>
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
            </View>
          </View>
        </CollapseBody>
      </Collapse>
      <AreYouSure
        visibleState={rusure}
        visibleStateChanger={setRusure}
        dispatchable={props.registerUserForDrive}
        dispatchData={props.item.driveId}
        message="Are you sure you wish to conduct this drive?"
      />
    </>
  );
};

const styles = StyleSheet.create({
  touchboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
    borderRadius: 5,
    borderColor: colors.accent,
    borderWidth: 0.5,
    overflow: 'hidden',
    backgroundColor: colors.additional2,
    flexDirection: 'row',
    padding: 10,
  },
  headerDetailsView: {
    flex: 1,
    overflow: 'hidden',
    marginLeft: 15,
    paddingVertical: 10,
  },
  nameView: {},
  nameText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.grayishblack,
  },
  miniAddressView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  miniAddressContent: {
    fontFamily: 'Montserrat-Regular',
  },
  miniDateTimeContent: {
    fontFamily: 'Montserrat-Regular',
  },
  donorListTouch: {
    backgroundColor: colors.grayishblack,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  touchText: {
    color: colors.additional2,
    fontFamily: 'Montserrat-Regular',
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  collBody: {
    backgroundColor: colors.additional2,
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor: colors.accent,
    borderWidth: 0.5,
  },
  bodyHeader: {
    backgroundColor: colors.accent,
    padding: 10,
  },
  bodyLabel: {
    fontFamily: 'Montserrat-Bold',
    color: colors.primary,
  },
  bodyContent: {
    fontFamily: 'Montserrat-Regular',
    color: colors.primary,
  },
  detailsBoard: {
    padding: 10,
  },
  label: {
    fontFamily: 'Montserrat-Bold',
  },
  addressView: {
    paddingVertical: 20,
    marginBottom: 10,
  },
  addressLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  addressInsideView: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: colors.grayishblack,
    padding: 10,
    justifyContent: 'space-between',
  },
  addressInsideLabel: {
    fontFamily: 'Montserrat-Bold',
  },
  addressRightView: {
    flex: 1,
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  addressContent: {
    fontFamily: 'Montserrat-Regular',
    textAlign: 'right',
  },
  groupsContentView: {
    paddingTop: 20,
    flexDirection: 'row',
  },
  indGroup: {
    backgroundColor: colors.grayishblack,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: 2,
    paddingVertical: 5,
  },
  indGroupContent: {
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2,
    fontSize: 12,
  },
});

export default UpcomingDrivesCard;
