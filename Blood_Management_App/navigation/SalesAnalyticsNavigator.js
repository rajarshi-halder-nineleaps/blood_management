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
            <Text style={{ fontFamily: 'Montserrat-Regular' }}>Revenue</Text>
          ),
        }}
      />
      <SalesTabs.Screen
        name="Stock"
        component={Stock}
        options={{
          tabBarLabel: () => (
            <Text style={{ fontFamily: 'Montserrat-Regular' }}>
              Stock
            </Text>
          ),
        }}
      />

    </SalesTabs.Navigator>
  );
};


export default SalesAnalyticsNavigator;
