/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//? Importing the screens
import Services from '../src/MainTabs/ServicesStack/Services';
import MyDrives from '../src/MainTabs/ServicesStack/MyDrives';
import DriveDonorList from '../src/MainTabs/ServicesStack/DriveDonorList';
import UpcomingDrives from '../src/MainTabs/ServicesStack/UpcomingDrives';
import UpcomingDrivesSearch from '../src/MainTabs/ServicesStack/UpcomingDrivesSearch';
import DriveOrganizer from '../src/MainTabs/ServicesStack/DriveOrganizer';
import Commitments from '../src/MainTabs/ServicesStack/Commitments';
import Inventory from '../src/MainTabs/ServicesStack/Inventory';
import Sales from '../src/MainTabs/ServicesStack/Sales';
import FindDonors from '../src/Service Stack/FindDonors/FindDonors';
import DonorList from '../src/Service Stack/FindDonors/DonorList';
import BuyBlood from '../src/Service Stack/BuyBlood/BuyBlood';
import BuyBloodList from '../src/Service Stack/BuyBlood/BuyBloodList';
import ConfirmBuy from '../src/Service Stack/BuyBlood/ConfirmBuy';

const ServicesNavigator = createStackNavigator();

const ServicesStackNavigator = () => {
  return (
    <ServicesNavigator.Navigator headerMode="float">
      <ServicesNavigator.Screen name="Services" component={Services} />
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
        }}
      />

      <ServicesNavigator.Screen
        name="sales"
        component={Sales}
        options={{
          headerTitle: 'My Sales',
        }}
      />
      <ServicesNavigator.Screen name="Find Donors" component={FindDonors} />
      <ServicesNavigator.Screen name="Donor List" component={DonorList} />
      <ServicesNavigator.Screen name="Buy Blood" component={BuyBlood} />
      <ServicesNavigator.Screen
        name="Buy Blood List"
        component={BuyBloodList}
      />
      <ServicesNavigator.Screen name="Confirm Buy" component={ConfirmBuy} />
    </ServicesNavigator.Navigator>
  );
};

export default ServicesStackNavigator;
