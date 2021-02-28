/* eslint-disable prettier/prettier */
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import { Text } from 'react-native';

//? screnn imports:

import Sales from '../src/MainTabs/ServicesStack/Sales';
import SalesAnalytics from '../src/MainTabs/ServicesStack/SalesAnalytics';

const SalesTabs = createMaterialTopTabNavigator();

const SalesNavigator = ({ navigation }) => {
  return (
    <SalesTabs.Navigator initialRouteName="sales">
      <SalesTabs.Screen
        name="sales"
        component={Sales}
        options={{
          tabBarLabel: () => (
            <Text style={{ fontFamily: 'Montserrat-Regular' }}>Sales</Text>
          ),
        }}
      />
      <SalesTabs.Screen
        name="analytics"
        component={SalesAnalytics}
        options={{
          tabBarLabel: () => (
            <Text style={{ fontFamily: 'Montserrat-Regular' }}>
              Sales Analytics
            </Text>
          ),
        }}
      />

    </SalesTabs.Navigator>
  );
};

export default SalesNavigator;
