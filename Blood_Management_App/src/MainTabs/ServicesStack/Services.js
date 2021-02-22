/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import PasswordModal from '../../../components/PasswordModal';
import {useSelector, useDispatch} from 'react-redux';
import TouchTabs from '../../../components/TouchTabs';
import colors from '../../../constants/Colors';
import {getDriveData, resetDoneState} from '../../../redux/myDrives/actions';
import {fetchCommitments} from '../../../redux/commitments/actions';
import {getInventory, checkPassword} from '../../../redux/inventory/actions';
import {fetchSalesData} from '../../../redux/sales/actions';
import {fetchInvitesList} from '../../../redux/invites/actions';

const Services = ({navigation}) => {
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  const userType = authState.userType;
  const [rusure, setRusure] = useState(false);

  //* THIS HAS BEEN CHANGED
  // useEffect(() => {
  // dispatch(resetDoneState());
  // console.log('gotData state set to false');
  // }, [dispatch]);

  // useEffect(() => {
  //   if (myDrivesState.gotData) {
  //     navigation.navigate('myDrives');
  //   }
  // }, [myDrivesState.gotData, navigation]);

  //TODO convert all this to useEffect

  const myDrivesHandler = () => {
    navigation.navigate('myDrives');
  };

  const myCommitmentsHandler = () => {
    navigation.navigate('commitments');
  };

  const inventoryHandler = () => {
    dispatch(getInventory(authState.userToken));
    setRusure(true);
  };

  const salesHandler = () => {
    dispatch(fetchSalesData(authState.userToken));
    navigation.navigate('sales');
  };

  const donationRequestsHandler = () => {
    dispatch(fetchInvitesList(authState.userToken));
    navigation.navigate('donationRequests');
  };

  //* ask back end team to initialize every inventory field with 0.

  return (
    <View style={styles.container}>
      <PasswordModal
        visibleState={rusure}
        visibleStateChanger={setRusure}
        dispatchable={checkPassword}
        verified={() => {
          navigation.navigate('inventory');
        }}
      />
      <ScrollView style={styles.scroll}>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Services</Text>
        </View>
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
            label="My Blood Requests"
            source={require('../../../assets/images/servicesScreen/findDonors.png')}
            imgSrc="../assets/images/servicesScreen/findDonors.png"
            touchHandler={() => navigation.navigate('Active Donor Request')}
          />
          <TouchTabs
            label="My Purchases"
            imgSrc="../assets/images/servicesScreen/findDonors.png"
            touchHandler={() => navigation.navigate('My Purchases')}
          />
        </View>
        {userType === 0 ? (
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
              label="Invites"
              source={require('../../../assets/images/servicesScreen/findDonors.png')}
              touchHandler={() => donationRequestsHandler()}
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
              touchHandler={() => inventoryHandler()}
            />
          </>
        )}
        {userType === 2 ? (
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
  headingView: {
    padding: 20,
  },
  headingText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.additional2,
    fontSize: 30,
  },
});

export default Services;
