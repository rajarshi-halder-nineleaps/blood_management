/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/Colors';

const DonationDriveFilter = ({active, setActive}) => {
  return (
    <>
      <View style={styles.filtersBoard}>
        <View style={styles.filtersView}>
          <View
            style={
              active ? styles.activeFilterView : styles.inactiveFilterView
            }>
            <TouchableOpacity
              style={
                active ? styles.activeFilterTouch : styles.inactiveFilterTouch
              } onPress = {() =>{setActive(true);}}>
              <Text
                style={
                  active ? styles.activeFilterText : styles.inactiveFilterText
                }>
                Drives
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={
              active ? styles.inactiveFilterView : styles.activeFilterView
            }>
            <TouchableOpacity
              style={
                active ? styles.inactiveFilterTouch : styles.activeFilterTouch
              } onPress = {() =>{setActive(false);}}>
              <Text
                style={
                  active ? styles.inactiveFilterText : styles.activeFilterText
                }>
                Donations
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  filtersBoard: {
    padding: 20,
  },
  filtersView: {
    backgroundColor: colors.additional2,
    borderWidth: 2,
    borderColor: colors.primary,
    flexDirection: 'row',
    elevation: 5,
    borderRadius: 100,
    overflow: 'hidden',
  },
  inactiveFilterView: {
    width: '50%',
    overflow: "hidden",
    backgroundColor: colors.additional2,
  },
  inactiveFilterTouch: {
    paddingVertical: 20,
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: colors.additional2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveFilterText: {
    color: colors.primary,
    fontFamily: 'Montserrat-Regular',
  },

  activeFilterView: {
    width: '50%',
    borderRadius: 100,
  },
  activeFilterTouch: {
    paddingVertical: 20,
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: colors.primaryTranslucent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilterText: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',

  },
});

export default DonationDriveFilter;
