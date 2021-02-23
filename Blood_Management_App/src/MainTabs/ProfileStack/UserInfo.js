/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Image,
} from 'react-native';
import {logUserOut} from '../../../redux/auth/actions';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import AreYouSure from '../../../components/AreYouSure';
import {getProfileData, setDonorStatus} from '../../../redux/profile/actions';

const UserInfo = ({navigation}) => {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profileState);
  const authState = useSelector((state) => state.authState);

  useEffect(() => {
    dispatch(getProfileData(authState.userToken));

    console.log('PROFILE RENDERED!');
  }, [authState.userToken, dispatch]);

  return (
    <>
      {profileState.loading ? (
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
      ) : (
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            {/* <View style={styles.customHeader}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.customHeaderBack}>
                <Feather
                  name="chevron-left"
                  color={colors.grayishblack}
                  size={30}
                />
              </TouchableOpacity>
            </View> */}
            <View style={styles.detailsView}>
              <View style={styles.userInfoView}>
                <View style={styles.imageView}>
                  <Image
                    style={styles.avatar}
                    source={{uri: profileState.userData.profilePicture}}
                  />
                </View>

                <Text style={styles.userName}>
                  {profileState.userData.name}
                </Text>
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
                              setDonorStatus(
                                authState.userToken,
                                newDonorStatus,
                              ),
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
              <View style={styles.moreDetailsView}>
                <View style={styles.statsView}>
                  {authState.userType === 1 ? (
                    <>
                      <View style={styles.statsInsideView}>
                        <Text style={styles.statsLabel}>Total Donations</Text>
                        <Text style={styles.statsContent}>
                          {profileState.profileData.totalDonations}
                        </Text>
                      </View>
                      <View style={styles.statsInsideView}>
                        <Text style={styles.statsLabel}>Commitments made</Text>
                        <Text style={styles.statsContent}>
                          {profileState.profileData.commitmentsLeft}
                        </Text>
                      </View>
                      <View style={styles.statsInsideView}>
                        <Text style={styles.statsLabel}>Drives attended</Text>
                        <Text style={styles.statsContent}>
                          {profileState.profileData.driveAttended}
                        </Text>
                      </View>
                    </>
                  ) : authState.userType === 2 ? (
                    <>
                      <View style={styles.statsInsideView}>
                        <Text style={styles.statsLabel}>Requests made</Text>
                        <Text style={styles.statsContent}>
                          {profileState.profileData.requestsMade}
                        </Text>
                      </View>
                      <View style={styles.statsInsideView}>
                        <Text style={styles.statsLabel}>Drives conducted</Text>
                        <Text style={styles.statsContent}>
                          {profileState.profileData.drivesConducted}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.statsInsideView}>
                        <Text style={styles.statsLabel}>Requests made</Text>
                        <Text style={styles.statsContent}>
                          {profileState.profileData.requestsMade}
                        </Text>
                      </View>
                      <View style={styles.statsInsideView}>
                        <Text style={styles.statsLabel}>Drives conducted</Text>
                        <Text style={styles.statsContent}>
                          {profileState.profileData.drivesConducted}
                        </Text>
                      </View>
                      <View style={styles.statsInsideView}>
                        <Text style={styles.statsLabel}>Sales made</Text>
                        <Text style={styles.statsContent}>
                          {profileState.profileData.salesMade}
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              </View>
              <View style={styles.aboutView}>
                <View style={styles.addressView}>
                  <View style={styles.editBtnView}>
                    <Text style={styles.addressLabel}>About:</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('infoEdit')}>
                      <Feather name="edit" color={colors.coolblue} size={19} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addressContentView}>
                    <View style={styles.addressInsideView}>
                      <Text style={styles.addressInsideLabel}>
                        Recipient Email:
                      </Text>
                      <View style={styles.addressRightView}>
                        <Text style={styles.addressContent}>
                          {profileState.profileData.email}
                        </Text>
                      </View>
                    </View>

                    {authState.userType === 1 ? (
                      <>
                        <View style={styles.addressInsideView}>
                          <Text style={styles.addressInsideLabel}>
                            Date Of Birth:
                          </Text>
                          <View style={styles.addressRightView}>
                            <Text style={styles.addressContent}>
                              {profileState.profileData.dob ? profileState.profileData.dob.split('T')[0] : null}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.addressInsideView}>
                          <Text style={styles.addressInsideLabel}>
                            Blood Group:
                          </Text>
                          <View style={styles.addressRightView}>
                            <Text style={styles.addressContent}>
                              {profileState.profileData.bloodGroup}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.addressInsideView}>
                          <Text style={styles.addressInsideLabel}>Phone:</Text>
                          <View style={styles.addressRightView}>
                            <Text style={styles.addressContent}>
                              {profileState.profileData.phone}
                            </Text>
                          </View>
                        </View>
                      </>
                    ) : (
                      <View style={styles.addressInsideView}>
                        <Text style={styles.addressInsideLabel}>Phone:</Text>
                        <View>
                          {console.log(profileState.profileData.phone)}
                          {//TODO THERE IS SOME ERROR HERE, CHECK IT OUT.
                            profileState &&
                            profileState.profileData &&
                            profileState.profileData.phone &&
                            profileState.profileData.phone.map((val, idx) => (
                              <View key={idx} style={styles.addressRightView}>
                                <Text style={styles.addressContent}>{val}</Text>
                              </View>
                            ))}
                        </View>
                      </View>
                    )}

                    <View style={styles.addressInsideView}>
                      <Text style={styles.addressInsideLabel}>Address: </Text>
                      <View style={styles.addressRightView}>
                        <Text style={styles.addressContent}>
                          {profileState.profileData.address},{' '}
                          {profileState.profileData.district}, {'\n'}
                          {profileState.profileData.state} [
                          {profileState.profileData.pincode}]
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.logoView}>
              <Image
                style={styles.logo}
                source={require('../../../assets/images/logotransparentbkg.png')}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  progressBoard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: colors.additional2,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.additional2,
  },
  imageView: {
    alignItems: 'center',
    width: '100%',
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customHeaderBack: {
    paddingHorizontal: 20,
  },
  avatar: {
    borderColor: colors.primary,
    borderWidth: 10,
    borderRadius: 100,
    width: 170,
    height: 170,
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
  detailsView: {
    backgroundColor: colors.additional2,
  },
  userInfoView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 20,
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
  moreDetailsView: {
    paddingVertical: 20,
    borderColor: colors.accent,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRadius: 100,
  },
  statsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statsInsideView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  statsLabel: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
  },
  statsContent: {
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Montserrat-Bold',
    fontSize: 40,
    color: colors.primary,
  },
  editBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aboutView: {
    padding: 20,
  },

  addressView: {
    paddingVertical: 20,
  },
  addressLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    color: 'green',
    marginBottom: 20,
  },
  addressInsideView: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: colors.accent,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  addressInsideLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
    color: '#555',
  },
  addressRightView: {
    flex: 1,
    marginLeft: 10,
    marginBottom: 10,
  },
  addressContent: {
    fontFamily: 'Montserrat-Regular',
    alignItems: 'flex-end',
    textAlign: 'right',
    fontSize: 17,
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default UserInfo;

//* PROFILE DETAILS:

//* name (already in store)
//* user ID (already in store)
//* donor status (already in store)
//* lastBloodGiven (already in store)
//* profile picture (already in store)
//* phone number(s), email, address,

//* IND

//* number of donations made
//* number of commitments left
//* number of donation drives attended
//* dob, blood group

//* HOS/BB

//* number of dontaion requests made
//* number of drives conducted (the ones active(if any))
//* license number, (ADDING OPTION)

//* BB
//* number of sales made

//* PIC, name, id, NAMED FIELDS START: email, phone(s), address
