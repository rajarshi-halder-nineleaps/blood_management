import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SalesAnalytics from '../src/MainTabs/ServicesStack/SalesAnalytics';
import colors from '../constants/Colors';
import SearchByMonth from '../src/AnalyticsStack/SearchByMonth';
const salesAnalyticsTab = createStackNavigator();

const salesAnalyticsNavigator = ({navigation}) => {
  return (
    <salesAnalyticsTab.Navigator>
      <salesAnalyticsTab.Screen
        name="salesAnalytics"
        component={SalesAnalytics}
        options={{
          headerTitle: 'Sales Analytics',
          headerShown: false,
        }}
      />

      <salesAnalyticsTab.Screen
        name="searchByMonth"
        component={SearchByMonth}
        options={{
          headerShown: false,
        }}
      />
    </salesAnalyticsTab.Navigator>
  );
};

export default salesAnalyticsNavigator;
