/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../../../constants/Colors';
import {SkypeIndicator} from 'react-native-indicators';
import Feather from 'react-native-vector-icons/Feather';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {
  getDriveData,
  getDonorList,
  driveCancellation,
} from '../../../redux/myDrives/actions';
import AreYouSure from '../../../components/AreYouSure';

const MyDrives = ({navigation}) => {
  const authState = useSelector((state) => state.authState);
  const myDrivesState = useSelector((state) => state.myDrivesState);
  const dispatch = useDispatch();

  const [rusure, setRusure] = useState(false);
  const [cancelId, setCancelId] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(
    (driveId) => {
      setRefreshing(true);
      dispatch(getDriveData(authState.userToken));
      if (!myDrivesState.loading) {
        setRefreshing(false);
      }
    },
    [authState.userToken, dispatch, myDrivesState.loading],
  );

  useEffect(() => {
    dispatch(getDriveData(authState.userToken));
  }, [dispatch, authState.userToken]);

  const renderItem = ({item}) => {
    return (
      <Collapse>
        <CollapseHeader style={styles.touchboard}>
          <View style={styles.headerDetailsView}>
            <View style={styles.nameView}>
              <Text style={styles.nameText}>{item.driveId}</Text>
              {!item.status ? (
                <Text style={styles.cancelledText}>CANCELLED</Text>
              ) : new Date(item.endDate).getTime() <= new Date().getTime() ? (
                <Text style={styles.greenText}>COMPLETED</Text>
              ) : new Date(item.startDate).getTime() >= new Date().getTime() ? (
                <Text style={styles.blueText}>UPCOMING</Text>
              ) : (
                <Text style={styles.redText}>ACTIVE</Text>
              )}
            </View>
            <View style={styles.miniAddressView}>
              <Text style={styles.miniAddressContent}>
                From: {'  '}
                <Text style={styles.miniDateTimeContent}>
                  {item.startTimestamp
                    ? `${item.startTimestamp.split('T')[0]}, ${
                        item.startTimestamp.split('T')[1].split(':')[0]
                      }:${item.startTimestamp.split('T')[1].split(':')[1]}`
                    : null}
                </Text>
              </Text>
            </View>
            <View style={styles.miniAddressView}>
              <Text style={styles.miniAddressContent}>
                To: {'  '}
                <Text style={styles.miniDateTimeContent}>
                  {item.endTimestamp
                    ? `${item.endTimestamp.split('T')[0]}, ${
                        item.endTimestamp.split('T')[1].split(':')[0]
                      }:${item.endTimestamp.split('T')[1].split(':')[1]}`
                    : null}
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.headerIndicatorView}>
            <TouchableOpacity
              style={styles.donorListTouch}
              onPress={() => {
                console.log('navigating to the list of accepted donors screen');
                dispatch(getDonorList(authState.userToken, item.driveId));
                navigation.navigate('driveDonorList', {
                  driveId: item.driveId,
                  driveStatus: item.status,
                });
              }}>
              <View style={styles.touchContainerView}>
                <Text style={styles.touchText}>Donors</Text>
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
            <Text style={styles.bodyLabel}>
              Drive ID : {'  '}
              <Text style={styles.bodyContent}>{item.driveId}</Text>
            </Text>
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
                      Organized on:{' '}
                    </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.organizeDate
                          ? `${item.organizeDate.split('T')[0]}, ${
                              item.organizeDate.split('T')[1].split(':')[0]
                            }:${item.organizeDate.split('T')[1].split(':')[1]}`
                          : null}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.addressView}>
                <Text style={styles.addressLabel}>Blood groups invited:</Text>
                <View style={styles.groupsContentView}>
                  {item.bloodGroups.map((val) => {
                    return (
                      <View key={val} style={styles.indGroup}>
                        <Text style={styles.indGroupContent}>{val}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
              {new Date(item.startDate).getTime() <=
              new Date().getTime() ? null : (
                <View style={styles.cancelDriveView}>
                  {item.status ? (
                    <TouchableOpacity
                      style={styles.cancelDriveTouch}
                      onPress={() => {
                        setCancelId(item.driveId);
                        setRusure(true);
                      }}>
                      <Text style={styles.cancelDriveText}>
                        Cancel This drive
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={styles.cancelledDriveMockTouch}
                      onPress={() => {
                        setCancelId(item.driveId);
                        setRusure(true);
                      }}>
                      <Text style={styles.cancelDriveText}>CANCELLED</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </CollapseBody>
      </Collapse>
    );
  };

  return (
    <View style={styles.container}>
      {myDrivesState.loading ? (
        <SkypeIndicator color={colors.primary} />
      ) : myDrivesState.myDrivesData.length === 0 ? (
        <View style={styles.suchEmpty}>
          <Image
            style={styles.suchEmptyImg}
            source={require('../../../assets/images/empty.png')}
          />
          <Text style={styles.emptyInfo}>
            You haven't conducted any donation drives.
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.scroll}
          data={myDrivesState.myDrivesData}
          renderItem={renderItem}
          keyExtractor={(item) => item.driveId}
          refreshControl={
            <RefreshControl
              colors={[colors.primary, colors.secondary]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}
      {rusure ? (
        <AreYouSure
          visibleState={rusure}
          visibleStateChanger={setRusure}
          dispatchable={driveCancellation}
          dispatchData={cancelId}
          message="Are you sure you wish to cancel this drive?"
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  imgBkg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingBottom: 30,
    width: '100%',
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
    fontFamily: 'Montserrat-Bold',
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
    fontFamily: 'Montserrat-Bold',
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
  container: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  scroll: {
    paddingHorizontal: 5,
  },
  suchEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.additional2,
  },
  suchEmptyImg: {
    height: 150,
    width: 150,
  },
  emptyInfo: {
    color: colors.primary,
    fontSize: 10,
    fontFamily: 'Montserrat-Bold',
  },
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
  nameView: {
    marginBottom: 5,
    flexDirection: 'row',
  },
  nameText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.primary,
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
    marginLeft: 10,
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
    paddingVertical: 20,
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
  cancelDriveView: {
    width: '100%',
    paddingHorizontal: 20,
  },
  cancelDriveTouch: {
    backgroundColor: colors.grayishblack,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cancelledDriveMockTouch: {
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cancelDriveText: {
    color: colors.additional2,
    fontFamily: 'Montserrat-Regular',
  },
  greenText: {
    color: 'green',
    fontFamily: 'Montserrat-Bold',
    marginLeft: 10,
  },
  blueText: {
    color: colors.coolblue,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 10,
  },
  redText: {
    color: colors.dutchred,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 10,
  },
  cancelledText: {
    color: colors.accent,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 10,
  },
});

export default MyDrives;
