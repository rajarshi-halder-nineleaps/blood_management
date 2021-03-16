/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  AlertIOS,
  Image,
  FlatList,
  ImageBackground
} from 'react-native';
import colors from '../../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { FlatListSlider } from 'react-native-flatlist-slider';
import HomeSlider from '../../../components/HomeSlider';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setDonorStatus } from "../../../redux/profile/actions";
import { setDonationEligibilityNotification } from '../../../redux/notifications/actions';

import { fetchCommitments } from '../../../redux/commitments/actions';
import { checkPassword, getInventory } from '../../../redux/inventory/actions';
import { fetchSalesData, getToday } from '../../../redux/sales/actions';
import { PieChart, BarChart, StackedBarChart } from 'react-native-chart-kit';
import { color } from 'react-native-reanimated';
import { getUserData } from '../../../redux/profile/actions';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

const Home = ({ navigation }) => {
  const authState = useSelector((state) => state.authState);
  const userType = authState.userType;
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profileState);
  const salesState = useSelector((state) => state.salesState);

  useEffect(() => {
    dispatch(getUserData(authState.userToken));
    console.log('got user data');
  }, [dispatch]);
  useEffect(() => {
    dispatch(getToday(authState.userToken));
    console.log('got user data');
  }, [dispatch]);

  useEffect(() => {
    if (
      authState.userType === 1 &&
      profileState.userData &&
      profileState.userData.lastDonationDate &&
      profileState.userData.donorStatus === 2
    ) {
      const lastDonationDate = profileState.userData.lastDonationDate;

      //? CONVERTING MILLISECONDS TO DAYS.
      //* 56 days is the minimum required number of days between blood donations
      const eligible =
        (new Date().getTime() -
          new Date(lastDonationDate.split('T')[0]).getTime()) /
        (1000 * 60 * 60 * 24) >
        56;
      if (eligible) {
        dispatch(setDonorStatus(authState.userToken, 0));
        dispatch(setDonationEligibilityNotification(authState.userType, true));
        console.log('Changing donor status to: ' + eligible);
      }
    }
    console.log("It's fine if printed once");
    //! DO NOT CHANGE DEPENDENCY ARRAY HERE OR ANYWHERE IN THE APP.
  }, [authState.userType, dispatch, profileState.userData.name]);

  // const salesHandler = () => {
  //   dispatch(fetchSalesData(authState.userToken));
  //   navigation.navigate('services', { screen: 'sales' });
  //   navigation.navigate('sales');
  // };

  // const myCommitmentsHandler = () => {
  //   dispatch(fetchCommitments(authState.userToken));
  //   navigation.navigate('services', { screen: 'commitments' });
  // };

  // const inventoryHandler = () => {
  //   dispatch(getInventory(authState.userToken));
  //   navigation.navigate('services', { screen: 'inventory' });
  // };

  // const myDrivesHandler = () => {
  //   dispatch(getDriveData(authState.userToken));
  //   navigation.navigate('services', { screen: 'driveOrganizer' });
  // };

  const organizeDriveHandler = () => {
    navigation.navigate('driveOrganizer');
  };
  const upcomingDrivesHandler = () => {
    navigation.navigate('upcomingDrivesSearch');
  };

  const [hour, setHour] = useState(-1)
  const getHour = () => {
    const date = new Date();
    const hour = date.getHours()
    setHour(hour);
  }


  useEffect(() => {
    getHour()
  }, [])





  return (
    <ScrollView style={styles.container}>

      <ImageBackground source={require('../../../assets/images/realpic1.png')} style={{ width: Dimensions.get('screen').width, height: 250 }}
      >
        <View style={styles.header}>


          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../../../assets/images/logotransparentbkg.png')}
                style={styles.logo}
                resizeMode='stretch'

              />
              <Text style={styles.logotext}>Red Bank</Text>
            </View>



            <Text style={styles.greet}>
              {hour < 12 ? "Good Morning," : "Good Afternoon,"}
            </Text>
            <Text style={styles.name}>{profileState.userData.name}</Text>
            <Text style={styles.other}>#{profileState.userData.userId}</Text>

          </View>
          {userType === 3 ? (
            <TouchableOpacity
              style={styles.iconview}
              onPress={() => dispatch(getToday(authState.userToken))}>
              <Icon name="refresh" color={colors.primary} size={30} />
              <Text style={styles.refreshText}>Refresh</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ImageBackground>

      <View style={{
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
        {userType === 3 ?
          <>
            <Text style={styles.sectiontitle}>Today's Stats</Text>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
              <View style={{ flexDirection: 'column', alignItems: 'center', paddingHorizontal: 5, justifyContent: 'space-evenly' }}>
                <Text style={styles.sectionline}>
                  Units Sold
          </Text>
                <Text style={styles.sectionline}>
                  10{salesState.todaysData.unitsSold}
                </Text>
                <Text style={styles.sectionline}>
                  Units Bought
           </Text>
                <Text style={styles.sectionline}>
                  {salesState.todaysData.unitsBought}
                </Text>
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'center', paddingHorizontal: 5, justifyContent: 'space-evenly' }}>
                <Text style={styles.sectionline}>
                  Amount Collected
          </Text>
                <Text style={styles.sectionline}>
                  ₹ {salesState.todaysData.amountCollected &&
                    salesState.todaysData.amountCollected.toFixed(2)}
                </Text>
                <Text style={styles.sectionline}>
                  Amount Spent
          </Text>
                <Text style={styles.sectionline}>
                  ₹ {salesState.todaysData.amountSpent && salesState.todaysData.amountSpent.toFixed(2)}
                </Text>
              </View>
            </View>
          </>
          : null}
        {userType === 1 ?
          <>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.statsInsideView}>
                <Text style={styles.statsLabel}>Total Donations</Text>
                <Text style={styles.statsContent}>
                  {profileState.profileData.donationMade}
                </Text>
              </View>
              <View style={styles.statsInsideView}>
                <Text style={styles.statsLabel}>
                  Commitments made
            </Text>
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
              {profileState.userData.donorStatus === 0 ?

                <Icon name="times-circle" color="red" size={30} />
                :
                <Icon name="check-circle" color="green" size={30} />

              }
            </View>
          </>
          : null}
        {userType === 2 ?
          <>
            <View style={styles.statsInsideView}>
              <Text style={styles.statsLabel}>Requests made</Text>
              <Text style={styles.statsContent}>
                {profileState.profileData.requestMade}
              </Text>
            </View>
            <View style={styles.statsInsideView}>
              <Text style={styles.statsLabel}>
                Drives organized
            </Text>
              <Text style={styles.statsContent}>
                {profileState.profileData.drivesConducted}
              </Text>
            </View>
          </>
          : null
        }

      </View>

      <View style={{ flex: 1, marginTop: 200 }}>
        <Text>
          hi
        </Text>
      </View>

      {/* 
      <View style={styles.donateblood}>
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
          <Text style={styles.title}>
            {userType === 1 ? 'Donate Blood' : 'Organize Drive'}
          </Text>
          <Icon name="tint" size={20} color={colors.primary} />
        </View>
        <TouchableOpacity
          onPress={() => {
            userType === 1 ? upcomingDrivesHandler() : organizeDriveHandler();
          }}
          style={styles.button}>
          <Text style={styles.buttontitle}>Get Started</Text>
        </TouchableOpacity>
      </View> */}


      {/* {userType === 1 ? (
        <>
          <View>
            <Image
              style={styles.suchEmptyImg}
              source={require('../../../assets/compatibility.jpg')}
            />
          </View>
        </>
      ) : (
        <>
          <View>
            <Text style={styles.sectiontitle}>Today's Readings</Text>
            <Text style={styles.sectionline}>
              Units Sold : {salesState.todaysData.unitsSold}
            </Text>
            <Text style={styles.sectionline}>
              Units Bought : {salesState.todaysData.unitsBought}
            </Text>
            <Text style={styles.sectionline}>
              Amount Collected: {salesState.todaysData.amountCollected}
            </Text>
            <Text style={styles.sectionline}>
              Amount Spent : {salesState.todaysData.amountSpent}
            </Text>
          </View>
        </>
      )} */}
    </ScrollView>
  );
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  statsInsideView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
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
    marginLeft: 10
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
    marginTop: 10
  },
  other: {
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: '100',
    color: colors.additional2,
    marginTop: 5
  },
  sectiontitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    marginLeft: 10,
    marginBottom: 10,
  },
  sectionline: {
    fontFamily: 'Montserrat-Bold',
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
    color: colors.primary
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
