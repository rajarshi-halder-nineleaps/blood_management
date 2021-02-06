/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//? Importing the screens
import Profile from '../src/MainTabs/ProfileStack/Profile';
import ConfirmPassword from '../src/MainTabs/ProfileStack/ConfirmPassword';
import NewPassword from '../src/MainTabs/ProfileStack/NewPassword';
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

      <ProfileNavigator.Screen
        name="confirmPassword"
        component={ConfirmPassword}
        options={{
          headerShown: false,
        }}
      />

      <ProfileNavigator.Screen
        name="newPassword"
        component={NewPassword}
        options={{
          headerShown: false,
        }}
      />
    </ProfileNavigator.Navigator>
  );
};

export default ProfileStackNavigator;
