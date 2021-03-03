/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../constants/Colors';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AreYouSure from './AreYouSure';
import {updateRequestList} from '../redux/activedonorrequest/actions';

const DonorRequestDetailsCard = ({item, onPress}) => {
  return (
    <>
      <View style={styles.touchboard}>
        <View>
          {item.donationStatus ? (
            <Icon name="check-circle" color="green" size={30} />
          ) : (
            <Icon name="times-circle" color="red" size={30} />
          )}
        </View>

        <View style={styles.headerDetailsView}>
          <View style={styles.nameView}>
            <Text style={styles.moreinfo}>{item.name}</Text>
          </View>
        </View>
        <View style={styles.typeView}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.invitebutton}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  touchboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
    borderRadius: 5,
    borderColor: colors.accent,
    borderWidth: 0.5,
    overflow: 'hidden',
    backgroundColor: colors.additional2,
    flexDirection: 'row',
    padding: 10,
  },
  touch: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  typeView: {
    backgroundColor: colors.moderategray,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 30,
  },
  headerDetailsView: {
    flex: 1,
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  nameView: {},
  nameText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.grayishblack,
  },
  miniAddressView: {
    flexDirection: 'row',
    fontFamily: 'Montserrat-Regular',
  },
  miniAddressContent: {
    fontFamily: 'Montserrat-Re',
    color: colors.additional1,
  },
  headerIndicatorView: {},
  yesnoView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'flex-end',
  },
  requested: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: 'red',
  },

  yes: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: 'green',
  },
  no: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: 'blue',
  },
  headerContent: {
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2,
  },
  collBody: {
    backgroundColor: colors.additional2,
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor: colors.accent,
    borderWidth: 0.5,
  },
  bodyHeader: {
    backgroundColor: colors.accent,
    padding: 10,
  },
  bodyLabel: {
    fontFamily: 'Montserrat-Bold',
    color: colors.primary,
  },
  bodyContent: {
    fontFamily: 'Montserrat-Regular',
    color: colors.primary,
  },
  detailsBoard: {
    padding: 10,
  },
  label: {
    fontFamily: 'Montserrat-Bold',
  },
  content: {
    fontFamily: 'Montserrat-Regular',
  },
  addressView: {
    paddingVertical: 20,
  },
  addressLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  addressInsideView: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: colors.grayishblack,
    padding: 10,
    justifyContent: 'space-between',
  },
  addressInsideLabel: {
    fontFamily: 'Montserrat-Bold',
  },
  addressRightView: {
    flex: 1,
    marginLeft: 10,
  },
  addressContent: {
    fontFamily: 'Montserrat-Regular',
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  recipientLabel: {
    fontFamily: 'Montserrat-Regular',
    color: colors.additional1,
  },
  recipientContent: {
    fontFamily: 'Montserrat-Regular',
    color: colors.additional1,
  },
  updatebutton: {
    backgroundColor: colors.additional2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  buttontext: {
    fontSize: 18,
    backgroundColor: 'transparent',
    color: colors.primary,
    fontFamily: 'Montserrat-Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  moreinfo: {
    fontFamily: 'Montserrat-Bold',
    color: colors.grayishblack,
    fontSize: 12,
  },
  invitebutton: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
});

export default DonorRequestDetailsCard;
