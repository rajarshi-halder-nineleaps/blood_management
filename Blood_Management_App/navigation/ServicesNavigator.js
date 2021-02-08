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
import MoreInfo from '../src/Service Stack/BuyBlood/MoreInfo';
import MyPurchases from '../src/Service Stack/MyPurchases/MyPurchases';
import ActiveDonorRequest from '../src/Service Stack/ActiveDonorRequest/ActiveDonorRequest';

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
          headerTitle: 'My blood donation drives',
        }}
      />
      <ServicesNavigator.Screen
        name="driveDonorList"
        component={DriveDonorList}
        options={{
          headerTitle: 'List of accepted donors',
        }}
      />
      <ServicesNavigator.Screen
        name="upcomingDrivesSearch"
        component={UpcomingDrivesSearch}
        options={{
          headerTitle: 'Upcoming donation drives',
        }}
      />
      <ServicesNavigator.Screen
        name="upcomingDrives"
        component={UpcomingDrives}
        options={{
          headerTitle: 'Upcoming donation drives',
        }}
      />
      <ServicesNavigator.Screen
        name="driveOrganizer"
        component={DriveOrganizer}
        options={{
          headerTitle: 'Organize a drive',
        }}
      />
      <ServicesNavigator.Screen
        name="commitments"
        component={Commitments}
        options={{
          headerTitle: 'My Commitments',
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
            color: colors.grayishblack,
          },
          // headerLeft: (props) => (
          //   <TouchableOpacity
          //     {...props}
          //     onPress={() => {
          //       props.navigation.goBack();
          //     }}>
          //     {console.log(props)}
          //     <Feather
          //       name="chevron-left"
          //       color={colors.grayishblack}
          //       size={30}
          //       style={{}}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
      />

      <ServicesNavigator.Screen
        name="sales"
        component={SalesNavigator}
        options={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <ServicesNavigator.Screen name="Find Donors" component={FindDonors} />
      <ServicesNavigator.Screen name="Donor List" component={DonorList} />
      <ServicesNavigator.Screen name="Buy Blood" component={BuyBlood} />

      <ServicesNavigator.Screen
        name="donationRequests"
        component={DonationRequests}
        options={{
          headerTitle: 'Invites',
        }}
      />
      <ServicesNavigator.Screen
        name="Buy Blood List"
        component={BuyBloodList}
      />
      <ServicesNavigator.Screen name="Confirm Buy" component={ConfirmBuy} />
      <ServicesNavigator.Screen name="More Info" component={MoreInfo} />
      <ServicesNavigator.Screen name="My Purchases" component={MyPurchases} />
      <ServicesNavigator.Screen
        name="Active Donor Request"
        component={ActiveDonorRequest}
      />
    </ServicesNavigator.Navigator>
  );
};

export default ServicesStackNavigator;
