/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {donorVerification} from '../../../redux/myDrives/actions';
import colors from '../../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {getDonorList} from '../../../redux/myDrives/actions';

const DriveDonorList = ({route, navigation}) => {
  const myDrivesState = useSelector((state) => state.myDrivesState);
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getDonorList(authState.userToken, route.params.driveId));
    if (!myDrivesState.loading) {
      setRefreshing(false);
    }
  }, [
    authState.userToken,
    dispatch,
    myDrivesState.loading,
    route.params.driveId,
  ]);

  const bloodDonationHandler = (donorId) => {
    console.log('thunk action creator for posting myDriveDetails data started');
    dispatch(
      donorVerification(authState.userToken, route.params.driveId, donorId),
    );
  };

  const renderItem = ({item}) => {


    return (
      <View style={styles.touchboard}>
        <View style={styles.touch}>
          <View style={styles.labelBoard}>
            <Text style={styles.label}>
              Donor ID :<Text style={styles.content}>{item.userId}</Text>
            </Text>
            <Text style={styles.label}>
              Donor Name :<Text style={styles.content}>{item.name}</Text>
            </Text>
            <Text style={styles.label}>
              Blood group :<Text style={styles.content}>{item.bloodGroup}</Text>
            </Text>

            {!item.donationStatus ? (
              <TouchableOpacity
                style={styles.completedDonationTouch}
                onPress={() => bloodDonationHandler(item.userId)}>
                <ImageBackground
                  style={styles.imgBtnBkg}
                  source={require('../../../assets/images/invBkg.png')}>
                  <View style={styles.completedDonationTouchTextView}>
                    <Text style={styles.completedDonationText}>
                      Donated blood
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ) : (
              <View style={styles.completedDonationTouchDonated}>
                <Feather
                  name="check-square"
                  color={colors.additional2}
                  size={20}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {myDrivesState.loading ? (
        <View style={styles.progressBoard}>
          <ActivityIndicator
            visible={myDrivesState.loading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
            animating={true}
            color={colors.primary}
            size="large"
          />
        </View>
      ) : myDrivesState.donorsList.length === 0 ? (
        <View style={styles.suchEmpty}>
          <Image
            style={styles.suchEmptyImg}
            source={require('../../../assets/images/empty.png')}
          />
          <Text style={styles.emptyInfo}>No one has accepted so far.</Text>
        </View>
      ) : (
        <View>
          <FlatList
            style={styles.scroll}
            data={myDrivesState.donorsList}
            renderItem={renderItem}
            keyExtractor={(item) => item.userId}
            refreshControl={
              <RefreshControl
                colors={[colors.primary, colors.secondary]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBoard: {
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
  imgBtnBkg: {
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
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
    marginTop: 10,
    elevation: 5,
  },
  touchText: {
    color: colors.additional2,
    fontFamily: 'sans-serif-light',
  },
  completedDonationTouch: {
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  completedDonationTouchTextView: {
    padding: 10,
  },
  completedDonationTouchDisabled: {
    backgroundColor: colors.accent,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
  },
  completedDonationTouchDonated: {
    backgroundColor: 'limegreen',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
  },
  completedDonationText: {
    color: colors.additional2,
    fontFamily: 'sans-serif-light',
  },
});

export default DriveDonorList;
