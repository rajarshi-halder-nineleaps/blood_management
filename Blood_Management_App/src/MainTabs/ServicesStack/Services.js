/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import PasswordModal from '../../../components/PasswordModal';
import { useSelector, useDispatch } from 'react-redux';
import TouchTabs from '../../../components/TouchTabs';
import colors from '../../../constants/Colors';
import { getDriveData, resetDoneState } from '../../../redux/myDrives/actions';
import { fetchCommitments } from '../../../redux/commitments/actions';
import { getInventory, checkPassword } from '../../../redux/inventory/actions';
import {
  fetchSalesData,
  getCurrentMonth,
  getCurrentMonthAnalytics,
  getCurrentMonthRevenue,
  getMonthlyBreakout,
  monthAnalytics,
} from '../../../redux/sales/actions';
import { fetchPurchasesData } from '../../../redux/purchases/actions';
import { fetchInvitesList } from '../../../redux/invites/actions';

const Services = ({ navigation }) => {
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  const userType = authState.userType;
  const [rusure, setRusure] = useState(false);

  const myDrivesHandler = () => {
    navigation.navigate('myDrives');
  };

  const myCommitmentsHandler = () => {
    navigation.navigate('commitments');
  };

  const inventoryHandler = () => {
    setRusure(true);
  };

  const salesHandler = () => {
    navigation.navigate('sales');
  };
  const year = new Date().getFullYear();
  let mon = new Date().getMonth() + 1 + '';

  if (mon.length === 1) {
    mon = '0' + mon;
  }
  const salesAnalyticsHandler = () => {
    console.log(year);
    console.log(mon);
    dispatch(getCurrentMonthAnalytics(year, authState.userToken));
    dispatch(monthAnalytics(year, mon, authState.userToken, 0));
    dispatch(monthAnalytics(year, mon, authState.userToken, 1));
    dispatch(monthAnalytics(year, mon, authState.userToken, 2));
    dispatch(monthAnalytics(year, mon, authState.userToken, 3));
    navigation.navigate('salesAnalytics');
  };

  const purchasesHandler = () => {
    dispatch(fetchPurchasesData(authState.userToken));
    navigation.navigate('My Purchases');
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
            source={require('../../../assets/images/servicesScreen/buyBlood.png')}
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
            label="My Purchases"
            source={require('../../../assets/images/servicesScreen/purchases.png')}
            touchHandler={() => purchasesHandler()}
          />
          <TouchTabs
            label="My Donation Requests"
            source={require('../../../assets/images/servicesScreen/donorRequests.png')}
            touchHandler={() => navigation.navigate('Active Donor Request')}
          />
        </View>
        {userType === 1 ? (
          <>
            <View style={styles.row}>
              <TouchTabs
                label="My Activities"
                source={require('../../../assets/images/servicesScreen/commitments.png')}
                touchHandler={() => myCommitmentsHandler()}
              />
              <TouchTabs
                label="Upcoming Drives"
                source={require('../../../assets/images/servicesScreen/drives.png')}
                touchHandler={() => navigation.navigate('upcomingDrivesSearch')}
              />
            </View>
            <TouchTabs
              label="Invites"
              source={require('../../../assets/images/servicesScreen/invites.png')}
              touchHandler={() => donationRequestsHandler()}
            />
          </>
        ) : (
          <>
            <TouchTabs
              label="Organize a Drive"
              source={require('../../../assets/images/servicesScreen/drives2.png')}
              touchHandler={() => navigation.navigate('driveOrganizer')}
            />
            <View style={styles.row}>
              <TouchTabs
                label="My Donation Drives"
                source={require('../../../assets/images/servicesScreen/drives.png')}
                touchHandler={() => myDrivesHandler()}
              />
              <TouchTabs
                label="My Inventory"
                source={require('../../../assets/images/servicesScreen/inventory.png')}
                touchHandler={() => inventoryHandler()}
              />
            </View>
          </>
        )}
        {userType === 3 ? (
          <View style={styles.row}>
            <TouchTabs
              label="My Sales"
              source={require('../../../assets/images/servicesScreen/sales.png')}
              touchHandler={() => salesHandler()}
            />
            <TouchTabs
              label="Analytics"
              source={require('../../../assets/images/servicesScreen/analytics.png')}
              touchHandler={() => salesAnalyticsHandler()}
            />
          </View>
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
