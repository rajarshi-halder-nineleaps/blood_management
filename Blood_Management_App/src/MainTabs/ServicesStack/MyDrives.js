/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getDriveData, resetDoneState} from '../../../redux/myDrives/actions';
import colors from '../../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

const MyDrives = ({navigation}) => {
  const authState = useSelector((state) => state.authState);
  const myDrivesState = useSelector((state) => state.myDrivesState);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('dispatching initial get action');
  //   dispatch(getDriveData(authState.userToken));
  // }, [authState.userToken, dispatch]);

  useEffect(() => {
    dispatch(resetDoneState());
    console.log('gotData state set to false');
  }, [dispatch]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.touchboard}>
        <View style={styles.touch}>
          <ImageBackground
            style={styles.imgBkg}
            source={require('../../../assets/images/invBkg.png')}>
            <View>
              <View style={styles.header}>
                <View style={styles.titleView}>
                  <Text style={styles.headerText}>Drive ID :</Text>
                  <View style={styles.idView}>
                    <Text style={styles.headerContent}>{item.driveId}</Text>
                  </View>
                </View>
                <View style={styles.dateTimeView}>
                  <Text style={styles.dateTimeLabel}>
                    FROM:{'  '}
                    <Text style={styles.dateTimeContent}>
                      {item.startDate} at {item.startTime}
                    </Text>
                  </Text>
                  <Text style={styles.dateTimeLabel}>
                    TO:{'  '}
                    <Text style={styles.dateTimeContent}>
                      {item.endDate} at {item.endTime}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.contentBoard}>
              <View style={styles.addressView}>
                <Text style={styles.label}>Address:</Text>
                <View style={styles.addressContentView}>
                  <Text style={styles.content}>{item.address}</Text>
                  <Text style={styles.content}>{item.district}</Text>
                  <View style={styles.statePincodeView}>
                    <Text style={styles.content}>{item.state + ' '}</Text>
                    <Text style={styles.content}>({item.pincode})</Text>
                  </View>
                </View>
              </View>
              <View style={styles.groupsView}>
                <Text style={styles.label}>Blood groups invited:</Text>
                <View style={styles.groupsContentView}>
                  {item.bloodGroupsInvited.map((val) => {
                    return (
                      <View key={val} style={styles.indGroup}>
                        <Text style={styles.indGroupContent}>{val}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
              <View style={styles.donorListTouchView}>
                <TouchableOpacity
                  style={styles.donorListTouch}
                  onPress={() => {
                    console.log(
                      'navigating to the list of accepted donors screen',
                    );
                    navigation.navigate('driveDonorList', {
                      driveId: item.driveId,
                    });
                  }}>
                  <ImageBackground
                    style={styles.imgBtnBkg}
                    source={require('../../../assets/images/invBkg.png')}>
                    <View style={styles.touchContainerView}>
                      <Text style={styles.touchText}>Accepted donors</Text>
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

  return (
    <View style={styles.container}>
      {myDrivesState.loading ? (
        <ActivityIndicator
          visible={myDrivesState.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          animating={true}
          color={colors.primary}
          size="large"
        />
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
        />
      )}
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
  container: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  scroll: {
    paddingHorizontal: 20,
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
  },
  touchboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    overflow: 'hidden',
    margin: 10,
  },
  touch: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.additional2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  contentBoard: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.additional2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  donorListTouchView: {
    flexDirection: 'row',
    width: '100%',
    padding: 20,
    justifyContent: 'center',
  },
  donorListTouch: {
    marginTop: 10,
    elevation: 5,
    borderRadius: 100,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  touchContainerView: {
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  imgBtnBkg: {
    width: '100%',
  },
  touchText: {
    color: colors.additional2,
    fontFamily: 'sans-serif-light',
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressView: {},
  groupsView: {},
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
});

export default MyDrives;
