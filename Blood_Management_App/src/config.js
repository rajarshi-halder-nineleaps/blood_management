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

  return (
    <>
      {authState.isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={colors.primary}
            size="large"
          />
        </View>
      ) : (
        <NavigationContainer>
          {authState.isLoggedIn ? <MainNavigator /> : <RootStackNavigator />}
        </NavigationContainer>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Config;
