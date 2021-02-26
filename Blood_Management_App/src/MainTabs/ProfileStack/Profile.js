/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import {logUserOut} from '../../../redux/auth/actions';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import AreYouSure from '../../../components/AreYouSure';
import {getUserData, setDonorStatus} from '../../../redux/profile/actions';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  const profileState = useSelector((state) => state.profileState);

  const [rusure, setRusure] = useState(false);

  useEffect(() => {
    //* API call to get user data.
    //* name
    //* user ID
    //* donor status  ->> ACTIVE | INACTIVE | DISABLED(when currDate - date of last donation < 3 months (DONE FROM BACK END))
    //* lastBloodGiven (Optional)
    //* profile picture
    dispatch(getUserData(authState.userToken));
    console.log('PROFILE RENDERED!');
  }, []);
  //* dependency array left empty

  console.log(profileState.userData.name);

  return (
    <ScrollView style={styles.scroll}>
      {/* {profileState.loading ? (
        <View style={styles.progressBoard}>
          <ActivityIndicator
            visible={profileState.loading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
            animating={true}
            color={colors.primary}
            size="large"
          />
        </View>
      ) : ( */}
      <View style={styles.container}>
        <View style={styles.detailsView}>
          <View style={styles.userInfoView}>
            <View style={styles.imageView}>
              <Image
                style={styles.avatar}
                source={
                  profileState.userData.profilePicture
                    ? {uri: profileState.userData.profilePicture}
                    : require('../../../assets/images/account/nodp.png')
                }
              />
            </View>

            <Text style={styles.userName}>{profileState.userData.name}</Text>
            <Text style={styles.userId}>
              User ID: {profileState.userData.userId}
            </Text>
            {authState.userType === 1 ? (
              <>
                <View style={styles.donorStatusView}>
                  {profileState.userData.donorStatus !== 1 &&
                  profileState.userData.donorStatus !== 0 ? (
                    <View style={styles.disabled}>
                      <Text style={styles.donorStatusTouchText}>
                        Donor status: Disabled
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        let newDonorStatus = 0;
                        if (profileState.userData.donorStatus === 0) {
                          newDonorStatus = 1;
                        } else {
                          newDonorStatus = 0;
                        }
                        dispatch(
                          setDonorStatus(authState.userToken, newDonorStatus),
                        );
                      }}
                      style={
                        profileState.userData.donorStatus === 0
                          ? styles.inactive
                          : styles.active
                      }>
                      <Text style={styles.donorStatusTouchText}>
                        Donor status:{' '}
                        {profileState.userData.donorStatus === 0
                          ? 'Inactive'
                          : 'Active'}
                      </Text>
                      <Feather
                        name="repeat"
                        color={colors.additional2}
                        size={17}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <Text style={styles.infoText}>
                  Click on the above button to change your donor status
                </Text>
              </>
            ) : null}
          </View>
        </View>

        <View style={styles.tabsView}>
          <View style={styles.tabsInsideView}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => navigation.navigate('userInfo')}>
              <Text style={styles.touchText}>User Information</Text>
              <Feather name="info" color={colors.primary} size={19} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => navigation.navigate('confirmPassword')}>
              <Text style={styles.touchText}>Change Password</Text>
              <Feather name="lock" color={colors.primary} size={19} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => setRusure(true)}>
              <View style={styles.logoutInView}>
                <Text style={styles.logoutText}>Logout</Text>
                <Feather name="log-out" color={colors.additional2} size={19} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* )} */}
      {rusure ? (
        <AreYouSure
          visibleState={rusure}
          visibleStateChanger={setRusure}
          dispatchable={logUserOut}
          message="Are you sure?"
        />
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  progressBoard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    backgroundColor: colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  detailsView: {
    flex: 2,
    backgroundColor: colors.additional2,
  },
  imageView: {
    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    borderColor: colors.primary,
    borderWidth: 10,
    borderRadius: 100,
    width: 170,
    height: 170,
  },
  userInfoView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 20,
  },
  userName: {
    marginTop: 20,
    fontFamily: 'Montserrat-Bold',
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 22,
    color: colors.primary,
  },
  userId: {
    fontFamily: 'Montserrat-Bold',
  },
  donorStatusView: {
    paddingHorizontal: 20,
  },
  inactive: {
    flexDirection: 'row',
    backgroundColor: colors.dutchred,
    marginTop: 30,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    flexDirection: 'row',
    backgroundColor: colors.green,
    marginTop: 30,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    flexDirection: 'row',
    backgroundColor: colors.accent,
    marginTop: 30,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donorStatusTouchText: {
    color: colors.additional2,
    fontFamily: 'Montserrat-Bold',
    marginRight: 10,
  },
  infoText: {
    color: colors.additional1,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  tabsView: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 30,
    justifyContent: 'center',
  },
  tabsInsideView: {
    flex: 1,
  },
  touch: {
    flexDirection: 'row',
    backgroundColor: colors.additional2,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    elevation: 5,
  },
  touchText: {
    color: colors.primary,
    fontFamily: 'Montserrat-Bold',
    marginRight: 10,
  },
  logoutBtn: {
    backgroundColor: colors.grayishblack,
    padding: 15,
    borderRadius: 5,
    elevation: 5,
  },
  logoutInView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: colors.additional2,
    fontFamily: 'Montserrat-Bold',
    marginRight: 10,
  },
});

export default Profile;
