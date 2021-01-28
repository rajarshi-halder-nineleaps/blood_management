/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Services from '../src/MainTabs/ServicesStack/Services';

const ServicesNavigator = createStackNavigator();

const ServicesStackNavigator = () => {
  return (
    <ServicesNavigator.Navigator>
      <ServicesNavigator.Screen name="Services" component={Services} />
    </ServicesNavigator.Navigator>
  );
};

export default ServicesStackNavigator;
