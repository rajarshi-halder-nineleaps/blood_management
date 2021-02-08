/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

const SalesAnalytics = () => {
  const salesState = useSelector((state) => state.salesState);

  return (
    <View>
      <Text>Total sales made: {salesState.analyticsData.totalSales}</Text>
      <Text>Total sales tarrif: {salesState.analyticsData.totalAmount}</Text>
    </View>
  );
};

export default SalesAnalytics;
