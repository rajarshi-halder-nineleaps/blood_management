/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getDriveData, resetDoneState} from '../../../redux/myDrives/actions';
import colors from '../../../constants/Colors';

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
          <View style={styles.labelBoard}>
            <Text style={styles.label}>
              Drive ID :<Text style={styles.content}>{item.driveId}</Text>
            </Text>
            <Text style={styles.label}>
              Start :
              <Text style={styles.content}>
                {item.startDate} at {item.startTime}
              </Text>
            </Text>
            <Text style={styles.label}>
              End:
              <Text style={styles.content}>
                {item.endDate} at {item.endTime}
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
              Blood groups invited:
              <Text style={styles.content}>{item.bloodGroupsInvited}</Text>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.donorListTouch}
            onPress={() => {
              console.log('navigating to the list of accepted donors screen');
              navigation.navigate('driveDonorList', {
                driveId: item.driveId,
              });
            }}>
            <Text style={styles.touchText}>Accepted donors</Text>
          </TouchableOpacity>
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
  container: {
    flex: 1,
    justifyContent: 'center',
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

export default MyDrives;
