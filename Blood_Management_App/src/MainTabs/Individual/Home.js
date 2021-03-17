/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import colors from '../../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import { getToday } from '../../../redux/sales/actions';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import FaqCard from '../../../components/Faqcard'

const Home = ({ navigation }) => {
  const authState = useSelector((state) => state.authState);
  const userType = authState.userType;
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profileState);
  const salesState = useSelector((state) => state.salesState);

  useEffect(() => {
    dispatch(getToday(authState.userToken));
    console.log('got user data');
  }, [dispatch]);

  const [hour, setHour] = useState(-1);
  const getHour = () => {
    const date = new Date();
    const hour = date.getHours();
    setHour(hour);
  };

  useEffect(() => {
    getHour();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/realpic1.png')}
        style={{ width: Dimensions.get('screen').width, height: 300 }}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Image
                source={require('../../../assets/images/logotransparentbkg.png')}
                style={styles.logo}
                resizeMode="stretch"
              />
              <Text style={styles.logotext}>Red Bank</Text>
            </View>

            <Text style={styles.greet}>
              {hour < 12 ? 'Good Morning,' : 'Good Afternoon,'}
            </Text>
            <Text style={styles.name}>{profileState.userData.name}</Text>
            <Text style={styles.other}>#{profileState.userData.userId}</Text>
          </View>

        </View>
      </ImageBackground>

      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          top: 220,
          height: 200,
          position: 'absolute',
          backgroundColor: colors.additional2,
          borderRadius: 10,
          paddingVertical: 20,
          elevation: 20,
        }}>

        {userType === 3 ? (
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Text style={styles.sectiontitle}>Today's Stats</Text>
              <TouchableOpacity
                style={styles.iconview}
                onPress={() => dispatch(getToday(authState.userToken))}>
                <Icon name="refresh" color={colors.primary} size={20} />

              </TouchableOpacity>
            </View>
            <View
              style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingHorizontal: 5,
                  justifyContent: 'space-evenly',

                }}>
                <Text style={styles.sectiondata}>Units Sold</Text>
                <Text style={styles.sectionline}>
                  {salesState.todaysData.unitsSold}
                </Text>
                <Text style={styles.sectiondata}>Units Bought</Text>
                <Text style={styles.sectionline}>
                  {salesState.todaysData.unitsBought}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingHorizontal: 5,
                  justifyContent: 'space-evenly',
                }}>
                <Text style={styles.sectiondata}>Amount Collected</Text>
                <Text style={styles.sectionline}>
                  ₹{' '}
                  {salesState.todaysData.amountCollected &&
                    salesState.todaysData.amountCollected.toFixed(2)}
                </Text>
                <Text style={styles.sectiondata}>Amount Spent</Text>
                <Text style={styles.sectionline}>
                  ₹{' '}
                  {salesState.todaysData.amountSpent &&
                    salesState.todaysData.amountSpent.toFixed(2)}
                </Text>
              </View>
            </View>
          </>
        ) : null}
        {userType === 1 ? (
          <>
            <View style={{ flexDirection: 'row' }}>
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
            </View>

            <Text style={styles.text}>Donor Status</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              {profileState.userData.donorStatus === 0 ? (
                <Icon name="times-circle" color="red" size={30} />
              ) : (
                <Icon name="check-circle" color="green" size={30} />
              )}
            </View>
          </>
        ) : null}
        {userType === 2 ? (
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
        ) : null}
      </View>

      <View style={{ flex: 1, marginTop: 150 }}>
        {/* <Text>hi</Text> */}
      </View>

      <View style={styles.faqview}>
        <Text style={styles.faqheader}>
          FAQ
        </Text>
      </View>
      {userType == 1 ?
        <View style={styles.faqBody}>
          <FaqCard
            header="When Can I Start Donating?"
            body="If you are above 18, and have not donated in 3 months, you can donate blood"
          />
          <FaqCard
            header="What should I eat after Donation?"
            body="High iron rich food is a good choice for food after donation is done"
          />
          <FaqCard
            header="How much blood is taken in one draw?"
            body="Usually 250ml of blood is taken in one draw."
          />

        </View>
        :
        null
      }
      {userType == 2 ?
        <View style={styles.faqBody}>
          <FaqCard
            header="What are the requirements for an organization to host a blood drive? "
            body="Any organization can participate in the blood program. Based on experience, the organization should have enough members to hold a blood drive."
          />
          <FaqCard
            header="How can I Buy Blood?"
            body="You can use the Buy Blood Service available to Buy Blood According to your requirements"
          />
          <FaqCard
            header="Can I give donors incentives or gifts for participating? "
            body="All donors are required to be truly “volunteer” donors by the FDA, and not be reimbursed for their donation, so any gift or incentive offered must be offered to all participants of a blood drive – donors and volunteers alike. This helps ensure all people are honest about their health history"
          />

        </View>
        :
        null
      }

      {userType == 3 ?
        <View style={styles.faqBody}>
          <FaqCard
            header="Can I give donors incentives or gifts for participating? "
            body="All donors are required to be truly “volunteer” donors by the FDA, and not be reimbursed for their donation, so any gift or incentive offered must be offered to all participants of a blood drive – donors and volunteers alike. This helps ensure all people are honest about their health history"
          />
          <FaqCard
            header="What are the requirements for an organization to host a blood drive? "
            body="Any organization can participate in the blood program. Based on experience, the organization should have enough members to hold a blood drive."
          />
          <FaqCard
            header="What COVID-19 safety precautions are in place at blood drives? "
            body="Keep distance"
          />

        </View>
        :
        null
      }



    </ScrollView>
  );
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  faqBody: {},
  faqQuesHeader: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: colors.primary,
  },
  faqQuesBody: {
    fontFamily: 'Montserrat-Regulars',
    fontSize: 18,
    color: colors.grayishblack,
  },
  faqCard: {
    backgroundColor: colors.additional2,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 20
  },

  statsInsideView: {
    alignItems: 'stretch',
    justifyContent: 'center',
    marginHorizontal: 5,
    flex: 1
  },
  statsLabel: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
  },
  statsContent: {
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: colors.primary,
  },
  imageView: {
    alignItems: 'center',
    width: '100%',
  },
  imageCover: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  avatar: {
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 100,
    width: 80,
    height: 80,
  },
  donorAvatar: {
    borderColor: colors.green,
    borderWidth: 1,
    borderRadius: 100,
    width: 80,
    height: 80,
  },
  contentBoard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  logotext: {
    color: colors.primary,
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
  },
  text: {
    color: colors.primary,
    marginTop: 30,
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  textfont: {
    color: colors.coolblue,
    marginTop: 30,
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  logo: {
    width: 50,
    height: 50,
  },
  header: {
    backgroundColor: 'transparent',
    paddingHorizontal: 30,
    paddingVertical: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqview: {
    paddingHorizontal: 30,
    width: '100%',
    flexDirection: 'row',
  },
  faqheader: {
    fontFamily: 'Montserrat-Bold',
    color: colors.additional2,
    fontSize: 20
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: colors.additional2,
    borderWidth: 2,
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
  },
  name: {
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'flex-start',
    fontSize: 24,
    color: colors.additional2,
  },
  greet: {
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'flex-start',
    fontSize: 30,
    color: colors.additional2,
    marginTop: 10,
  },
  other: {
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: '100',
    color: colors.additional2,
    marginTop: 5,
  },
  sectiontitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 25,
    marginLeft: 10,
    marginBottom: 10,
    color: colors.primary,
  },
  sectionline: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 5,
  },
  sectiondata: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 5,
  },
  iconview: {
    alignItems: 'center',
  },
  refreshText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    color: colors.primary,
  },
  donateblood: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 70,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  title: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    fontFamily: 'Montserrat-Regular',
  },
  buttontitle: {
    color: colors.additional2,
    fontWeight: '800',
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
  },
  card: {
    backgroundColor: colors.primary,
    height: 120,
    width: 120,
    marginHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  services: {
    marginTop: 10,
  },
  cardtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.additional2,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  graphStyle: {
    paddingTop: 10,
  },
});

export default Home;
