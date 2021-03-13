/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
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
} from 'react-native';
import colors from '../../../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {FlatListSlider} from 'react-native-flatlist-slider';
import HomeSlider from '../../../components/HomeSlider';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setDonorStatus} from "../../../redux/profile/actions";
import {setDonationEligibilityNotification} from '../../../redux/notifications/actions';

import {fetchCommitments} from '../../../redux/commitments/actions';
import {getInventory} from '../../../redux/inventory/actions';
import {fetchSalesData, getToday} from '../../../redux/sales/actions';
import {PieChart, BarChart, StackedBarChart} from 'react-native-chart-kit';
import {color} from 'react-native-reanimated';
import {getUserData} from '../../../redux/profile/actions';

const Home = ({navigation}) => {
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

  const salesHandler = () => {
    dispatch(fetchSalesData(authState.userToken));
    navigation.navigate('services', {screen: 'sales'});
    navigation.navigate('sales');
  };

  const myCommitmentsHandler = () => {
    dispatch(fetchCommitments(authState.userToken));
    navigation.navigate('services', {screen: 'commitments'});
  };

  const inventoryHandler = () => {
    dispatch(getInventory(authState.userToken));
    navigation.navigate('services', {screen: 'inventory'});
  };

  const myDrivesHandler = () => {
    dispatch(getDriveData(authState.userToken));
    navigation.navigate('services', {screen: 'driveOrganizer'});
  };

  const organizeDriveHandler = () => {
    navigation.navigate('driveOrganizer');
  };
  const upcomingDrivesHandler = () => {
    navigation.navigate('upcomingDrivesSearch');
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignContent: 'center'}}>
          {userType === 1 ? (
            <Icon name="user" color={colors.peach} size={30} />
          ) : null}
          {userType === 2 ? (
            <Icon name="ambulance" color={colors.peach} size={30} />
          ) : null}
          {userType === 3 ? (
            <Icon name="university" color={colors.peach} size={30} />
          ) : null}
          <View style={{flexDirection: 'column', marginLeft: 10}}>
            <Text style={styles.name}>{profileState.userData.name}</Text>
            <Text style={styles.other}>#{profileState.userData.userId}</Text>
          </View>
        </View>
        {userType === 3 ? (
          <TouchableOpacity
            style={styles.iconview}
            onPress={() => dispatch(getToday(authState.userToken))}>
            <Icon name="superpowers" color={colors.primary} size={30} />
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.donateblood}>
        <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
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
      </View>

      <View></View>
      {userType === 1 ? (
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
      )}
    </ScrollView>
  );
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: colors.additional2,
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
    color: colors.primary,
  },
  other: {
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: '600',
    color: colors.dutchred,
  },
  sectiontitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    marginLeft: 10,
    marginBottom: 10,
  },
  sectionline: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 5,
  },
  iconview: {
    alignItems: 'center',
  },
  refreshText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
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
