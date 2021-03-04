/* eslint-disable prettier/prettier */
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {createStackNavigator} from '@react-navigation/stack';
import colors from '../constants/Colors';

//? Importing the screens
import Services from '../src/MainTabs/ServicesStack/Services';
import MyDrives from '../src/MainTabs/ServicesStack/MyDrives';
import DriveDonorList from '../src/MainTabs/ServicesStack/DriveDonorList';
import UpcomingDrives from '../src/MainTabs/ServicesStack/UpcomingDrives';
import UpcomingDrivesSearch from '../src/MainTabs/ServicesStack/UpcomingDrivesSearch';
import DriveOrganizer from '../src/MainTabs/ServicesStack/DriveOrganizer';
import Commitments from '../src/MainTabs/ServicesStack/Commitments';
import Inventory from '../src/MainTabs/ServicesStack/Inventory';
import DonationRequests from '../src/MainTabs/ServicesStack/DonationRequests';
import FindDonors from '../src/Service Stack/FindDonors/FindDonors';
import DonorList from '../src/Service Stack/FindDonors/DonorList';
import BuyBlood from '../src/Service Stack/BuyBlood/BuyBlood';
import BuyBloodList from '../src/Service Stack/BuyBlood/BuyBloodList';
import ConfirmBuy from '../src/Service Stack/BuyBlood/ConfirmBuy';
import SalesNavigator from './SalesNavigator';
import Sales from '../src/MainTabs/ServicesStack/Sales';
import MoreInfo from '../src/Service Stack/BuyBlood/MoreInfo';
import MyPurchases from '../src/Service Stack/MyPurchases/MyPurchases';
import ActiveDonorRequest from '../src/Service Stack/ActiveDonorRequest/ActiveDonorRequest';
import DonationRequestList from '../src/Service Stack/ActiveDonorRequest/DonationRequestList';

const ServicesNavigator = createStackNavigator();

const ServicesStackNavigator = () => {
  return (
    <ServicesNavigator.Navigator headerMode="float">
      <ServicesNavigator.Screen
        name="Services"
        component={Services}
        options={{
          headerShown: false,
        }}
      />
      <ServicesNavigator.Screen
        name="myDrives"
        component={MyDrives}
        options={{
          headerTitle: 'My donation drives',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />
      <ServicesNavigator.Screen
        name="driveDonorList"
        component={DriveDonorList}
        options={{
          headerTitle: 'List of accepted donors',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />
      <ServicesNavigator.Screen
        name="upcomingDrivesSearch"
        component={UpcomingDrivesSearch}
        options={{
          headerTitle: 'Upcoming drives',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />
      <ServicesNavigator.Screen
        name="upcomingDrives"
        component={UpcomingDrives}
        options={{
          headerTitle: 'Upcoming drives',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />
      <ServicesNavigator.Screen
        name="driveOrganizer"
        component={DriveOrganizer}
        options={{
          headerTitle: 'Organize a drive',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />
      <ServicesNavigator.Screen
        name="commitments"
        component={Commitments}
        options={{
          headerTitle: 'My Commitments',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />

      <ServicesNavigator.Screen
        name="inventory"
        component={Inventory}
        options={{
          headerTitle: 'My Inventory',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />

      <ServicesNavigator.Screen
        name="sales"
        component={Sales}
        options={{
          headerTitle: 'Sales',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />
      <ServicesNavigator.Screen
        name="Find Donors"
        component={FindDonors}
        options={{
          headerTitle: 'Find donors',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />
      <ServicesNavigator.Screen
        name="Donor List"
        component={DonorList}
        options={{
          headerTitle: 'Find donors',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />
      <ServicesNavigator.Screen
        name="Buy Blood"
        component={BuyBlood}
        options={{
          headerTitle: 'Buy Blood',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />

      <ServicesNavigator.Screen
        name="donationRequests"
        component={DonationRequests}
        options={{
          headerTitle: 'Invites',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />
      <ServicesNavigator.Screen
        name="Buy Blood List"
        component={BuyBloodList}
        options={{
          headerTitle: 'Available blood banks',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />
      <ServicesNavigator.Screen
        name="Confirm Buy"
        component={ConfirmBuy}
        options={{
          headerTitle: 'Confirm purchase',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />
      <ServicesNavigator.Screen
        name="More Info"
        component={MoreInfo}
        options={{
          headerTitle: 'More Info',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />
      <ServicesNavigator.Screen
        name="My Purchases"
        component={MyPurchases}
        options={{
          headerTitle: 'My Purchases',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />
      <ServicesNavigator.Screen
        name="Active Donor Request"
        component={ActiveDonorRequest}
        options={{
          headerTitle: 'My Donation Requests',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />
      <ServicesNavigator.Screen
        name="DonationRequestList"
        component={DonationRequestList}
        options={{
          headerTitle: 'My Donation Requests',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerTintColor: colors.additional2,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary,
          },
        }}
      />
    </ServicesNavigator.Navigator>
  );
};

export default ServicesStackNavigator;
