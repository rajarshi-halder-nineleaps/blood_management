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

const ServicesNavigator = createStackNavigator();

const ServicesStackNavigator = () => {
  return (
    <ServicesNavigator.Navigator>
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
    </ServicesNavigator.Navigator>
  );
};

export default ServicesStackNavigator;
