/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//? Importing the screens
import Profile from '../src/MainTabs/ProfileStack/Profile';

const ProfileNavigator = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileNavigator.Navigator>
      <ProfileNavigator.Screen
        name="profile"
        component={Profile}
        options={{
          headerTitle: 'My Profile',
          headerShown: false,
        }}
      />
    </ProfileNavigator.Navigator>
  );
};

export default ProfileStackNavigator;
