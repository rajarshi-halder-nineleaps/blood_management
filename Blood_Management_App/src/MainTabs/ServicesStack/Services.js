/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import TouchTabs from '../../../components/TouchTabs';
import colors from '../../../constants/Colors';
import {getDriveData, resetDoneState} from '../../../redux/myDrives/actions';
import {fetchCommitments} from '../../../redux/commitments/actions';
import {getInventory} from '../../../redux/inventory/actions';
import {fetchSalesData} from '../../../redux/sales/actions';

const Services = ({navigation}) => {
  const authState = useSelector((state) => state.authState);
  const myDrivesState = useSelector((state) => state.myDrivesState);
  const dispatch = useDispatch();

  const userType = authState.userType;

  useEffect(() => {
    dispatch(resetDoneState());
    console.log('gotData state set to false');
  }, [dispatch]);

  // useEffect(() => {
  //   if (myDrivesState.gotData) {
  //     navigation.navigate('myDrives');
  //   }
  // }, [myDrivesState.gotData, navigation]);

  const myDrivesHandler = () => {
    dispatch(getDriveData(authState.userToken));
    navigation.navigate('myDrives');
  };

  const myCommitmentsHandler = () => {
    dispatch(fetchCommitments(authState.userToken));
    navigation.navigate('commitments');
  };

  const inventoryHandler = () => {
    dispatch(getInventory(authState.userToken));
    navigation.navigate('inventory');
  };

  const salesHandler = () => {
    dispatch(fetchSalesData(authState.userToken));
    navigation.navigate('sales');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.row}>
          <TouchTabs
            label="Buy Blood"
            source={require('../../../assets/images/servicesScreen/findDonors.png')}
            imgSrc="../assets/images/servicesScreen/findDonors.png"
            touchHandler={() => navigation.navigate('Buy Blood')}
          />
          <TouchTabs
            label="Find Donors"
            source={require('../../../assets/images/servicesScreen/findDonors.png')}
            touchHandler={() => navigation.navigate('Find Donors')}
          />
        </View>
        <View style={styles.row}>
          <TouchTabs
            label="Donor Requests"
            source={require('../../../assets/images/servicesScreen/findDonors.png')}
          />
          <TouchTabs
            label="My Purchases"
            source={require('../../../assets/images/servicesScreen/findDonors.png')}
          />
        </View>
        {userType === 1 ? (
          <>
            <TouchTabs
              label="My Commitments"
              source={require('../../../assets/images/servicesScreen/findDonors.png')}
              touchHandler={() => myCommitmentsHandler()}
            />
            <TouchTabs
              label="Upcoming Drives"
              source={require('../../../assets/images/servicesScreen/findDonors.png')}
              touchHandler={() => navigation.navigate('upcomingDrivesSearch')}
            />
            <TouchTabs
              label="Donation requests"
              source={require('../../../assets/images/servicesScreen/findDonors.png')}
            />
          </>
        ) : (
          <>
            <TouchTabs
              label="Organize a Drive"
              source={require('../../../assets/images/servicesScreen/findDonors.png')}
              touchHandler={() => navigation.navigate('driveOrganizer')}
            />
            <TouchTabs
              label="My Donation Drives"
              source={require('../../../assets/images/servicesScreen/findDonors.png')}
              touchHandler={() => myDrivesHandler()}
            />
            <TouchTabs
              label="My Inventory"
              source={require('../../../assets/images/servicesScreen/inventory.png')}
              touchHandler={() => {
                inventoryHandler();
              }}
            />
          </>
        )}
        {userType === 3 ? (
          <TouchTabs
            label="My Sales"
            source={require('../../../assets/images/servicesScreen/sales.png')}
            touchHandler={() => salesHandler()}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  scroll: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
});

export default Services;
