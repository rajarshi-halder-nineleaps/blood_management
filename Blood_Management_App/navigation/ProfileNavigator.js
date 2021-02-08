/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import colors from '../constants/Colors';

//? Importing the screens
import Profile from '../src/MainTabs/ProfileStack/Profile';
import ConfirmPassword from '../src/MainTabs/ProfileStack/ConfirmPassword';
import NewPassword from '../src/MainTabs/ProfileStack/NewPassword';
import UserInfo from '../src/MainTabs/ProfileStack/UserInfo';
import InfoEdit from '../src/MainTabs/ProfileStack/InfoEdit';

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
          headerTitle: 'Current Password',
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

      <ProfileNavigator.Screen
        name="newPassword"
        component={NewPassword}
        options={{
          headerTitle: 'Set New Password',
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
      <ProfileNavigator.Screen
        name="userInfo"
        component={UserInfo}
        options={{
          headerTitle: 'User Information',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.additional2,
          },
          headerStyle: {
            elevation: 0,
          },
        }}
      />

      <ProfileNavigator.Screen
        name="infoEdit"
        component={InfoEdit}
        options={{
          headerTitle: 'Edit User Information',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: colors.grayishblack,
          },
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.additional2,
          },
        }}
      />
    </ProfileNavigator.Navigator>
  );
};

export default ProfileStackNavigator;
