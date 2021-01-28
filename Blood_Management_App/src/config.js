/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MainNavigator from '../navigation/MainNavigator';
import RootStackNavigator from '../navigation/RootStackNavigator';

import {View, ActivityIndicator, StyleSheet} from 'react-native';

import colors from '../constants/Colors';

import {useSelector, useDispatch} from 'react-redux';
import {tokenRetriever} from '../redux/auth/actions';

const Config = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);

  console.log(authState);
  useEffect(() => {
    dispatch(tokenRetriever());
  }, [dispatch]);

  console.log(authState);

  if (authState.isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {authState.isLoggedIn ? <MainNavigator /> : <RootStackNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loading: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Config;
