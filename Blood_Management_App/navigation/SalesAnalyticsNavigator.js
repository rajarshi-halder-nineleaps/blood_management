/* eslint-disable prettier/prettier */
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import { Text } from 'react-native';

//? screnn imports:

import Sales from '../src/MainTabs/ServicesStack/Sales';
import SalesAnalytics from '../src/MainTabs/ServicesStack/SalesAnalytics';
import Revenue from '../src/AnalyticsStack/Revenue';
import Stock from '../src/AnalyticsStack/Stock';
import Advanced from '../src/AnalyticsStack/Advanced';
//import salesAnalyticsNavigator from './SalesAnalyticsNavigator'
const SalesTabs = createMaterialTopTabNavigator();


const SalesAnalyticsNavigator = ({ navigation }) => {
  return (
    <SalesTabs.Navigator initialRouteName="Revenue">
      <SalesTabs.Screen
        name="Revenue"
        component={Revenue}
        options={{
          tabBarLabel: () => (
            <Text style={{ fontFamily: 'Montserrat-Regular' }}>Overview</Text>
          ),
        }}
      />
      <SalesTabs.Screen
        name="Stock"
        component={Stock}
        options={{
          tabBarLabel: () => (
            <Text style={{ fontFamily: 'Montserrat-Regular' }}>
              Detailed
            </Text>
          ),
        }}
      />
      <SalesTabs.Screen
        name="Advanced"
        component={Advanced}
        options={{
          tabBarLabel: () => (
            <Text style={{ fontFamily: 'Montserrat-Regular' }}>
              Advanced
            </Text>
          ),
        }}
      />

    </SalesTabs.Navigator>
  );
};


export default SalesAnalyticsNavigator;
