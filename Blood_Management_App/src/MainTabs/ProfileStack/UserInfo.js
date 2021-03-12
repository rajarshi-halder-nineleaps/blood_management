/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {SkypeIndicator, UIActivityIndicator} from 'react-native-indicators';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {getProfileData, setDonorStatus} from '../../../redux/profile/actions';
import AvatarChangeModal from '../../../components/AvatarChangeModal';

const UserInfo = ({navigation}) => {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profileState);
  const authState = useSelector((state) => state.authState);
  const [editDp, setEditDp] = useState(false);

  useEffect(() => {
    dispatch(getProfileData(authState.userToken));

    console.log('PROFILE RENDERED!');
  }, [authState.userToken, dispatch]);

  return (
    <>
      {profileState.loading ? (
        <View style={styles.progressBoard}>
          <SkypeIndicator color={colors.primary} />
        </View>
      ) : (
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.detailsView}>
              <View style={styles.userInfoView}>
                <View style={styles.imageView}>
                  <View
                    style={
                      profileState.userData.donorStatus === 1
                        ? styles.donorRoundView
                        : styles.roundView
                    }>
                    {profileState.uploading ? (
                      <View style={styles.uploadingView}>
                        <UIActivityIndicator
                          color={colors.darkGray}
                          size={30}
                        />
                        <Text style={styles.uploadingText}>
                          {profileState.uploadProgress} %
                        </Text>
                      </View>
                    ) : (
                      <>
                        <Image
                          style={styles.avatar}
                          source={
                            profileState.userData.profilePicture
                              ? {uri: profileState.userData.profilePicture}
                              : require('../../../assets/images/account/nodp.png')
                          }
                        />
                        <TouchableOpacity
                          style={styles.editDp}
                          onPress={() => setEditDp(true)}>
                          <Feather
                            name="edit-3"
                            color={colors.additional2}
                            size={25}
                          />
                          {/* <Text style={styles.editDpText}>change avatar</Text> */}
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
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
                      {profileState.userData.donorStatus === 0
                        ? 'Click on the above button to upgarde to donor status'
                        : profileState.userData.donorStatus === 1
                        ? 'Click on the above button to leave donor status'
                        : `Eligible for donation in ${Math.floor(
                            56 -
                              (new Date().getTime() -
                                new Date(
                                  profileState.userData.lastDonationDate.split(
                                    'T',
                                  )[0],
                                ).getTime()) /
                                (1000 * 60 * 60 * 24),
                          )} days`}
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
                          {profileState.profileData.donationMade}
                        </Text>
                      </View>
                      <View style={styles.statsInsideView}>
                        <Text style={styles.statsLabel}>Commitments made</Text>
                        <Text style={styles.statsContent}>
                          {profileState.profileData.commitmentMade}
                        </Text>
                      </View>
                      <View style={styles.statsInsideView}>
                        <Text style={styles.statsLabel}>Drives attended</Text>
                        <Text style={styles.statsContent}>
                          {profileState.profileData.drivesAttended}
                        </Text>
                      </View>
                    </>
                  ) : authState.userType === 2 ? (
                    <>
                      <View style={styles.statsInsideView}>
                        <Text style={styles.statsLabel}>Requests made</Text>
                        <Text style={styles.statsContent}>
                          {profileState.profileData.requestMade}
                        </Text>
                      </View>
                      <View style={styles.statsInsideView}>
                        <Text style={styles.statsLabel}>Drives organized</Text>
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
                          {profileState.profileData.requestMade}
                        </Text>
                      </View>
                      <View style={styles.statsInsideView}>
                        <Text style={styles.statsLabel}>Drives organized</Text>
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
                              {profileState.profileData.dob
                                ? profileState.profileData.dob.split('T')[0]
                                : null}
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
                          <View style={styles.addressRightView}>
                            {
                              //? THE BUG WITH MULTIPLE PHONE NUMBERS MAPPING OCCURED HERE - NOW FIXED.
                              profileState.profileData.phone.length > 0
                                ? profileState.profileData.phone.map(
                                    (val, idx) => (
                                      <View
                                        key={idx}
                                        style={styles.addressRightView}>
                                        <Text style={styles.addressContent}>
                                          {val}
                                        </Text>
                                      </View>
                                    ),
                                  )
                                : null
                            }
                          </View>
                          {console.log(profileState.profileData.phone)}
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
                    <View style={styles.addressInsideView}>
                      <Text style={styles.addressInsideLabel}>
                        Registered on:
                      </Text>
                      <View style={styles.addressRightView}>
                        <Text style={styles.addressContent}>
                          {profileState.profileData.registration_date
                            ? `${
                                profileState.profileData.registration_date.split(
                                  'T',
                                )[0]
                              } at ${
                                profileState.profileData.registration_date
                                  .split('T')[1]
                                  .split(':')[0]
                              }:${
                                profileState.profileData.registration_date
                                  .split('T')[1]
                                  .split(':')[1]
                              }`
                            : null}
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
      <AvatarChangeModal
        visibleState={editDp}
        visibleStateChanger={setEditDp}
        // dispatchable={checkPassword}
      />
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
    width: 170,
    height: 170,
  },
  roundView: {
    borderColor: colors.primary,
    borderWidth: 10,
    borderRadius: 100,
    width: 170,
    height: 170,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donorRoundView: {
    borderColor: colors.green,
    borderWidth: 10,
    borderRadius: 100,
    width: 170,
    height: 170,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
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
  editDp: {
    backgroundColor: colors.accent,
    opacity: 0.5,
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    padding: 5,
    elevation: 5,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editDpText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 100,
    color: colors.additional2,
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
  uploadingView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  uploadingText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.primary,
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
