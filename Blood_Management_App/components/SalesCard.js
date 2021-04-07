/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

const SalesCard = ({saleData, invoiceNavigator}) => {
  const item = saleData;

  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.touchboard}
          onPress={() => invoiceNavigator()}>
          <View style={styles.typeView}>
            <Text style={styles.headerContent}>{saleData.salesId}</Text>
          </View>
          <View style={styles.headerDetailsView}>
            <View style={styles.nameView}>
              <Text style={styles.nameText}>{item.buyerName}</Text>
            </View>
            <View style={styles.miniAddressView}>
              <Text style={styles.miniAddressContent}>{item.buyerEmail}</Text>
            </View>
          </View>
          <View style={styles.headerIndicatorView}>
            <View style={styles.yesnoView}>
              <Text
                style={
                  styles.pending
                }>{`${item.purchasedGroup}, ${item.purchasedComponent}`}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  touchboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: colors.accent,
    borderWidth: 0.5,
    overflow: 'hidden',
    backgroundColor: colors.additional2,
    flexDirection: 'row',
    padding: 10,
    paddingVertical: 15,
  },
  touch: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  typeView: {
    backgroundColor: colors.grayishblack,
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
  },
  avatarView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: colors.primary,
    marginBottom: 10,
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

  yes: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: 'green',
  },
  no: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: colors.dutchred,
  },
  pending: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    color: colors.coolblue,
  },
  headerContent: {
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2,
  },
  collBody: {
    backgroundColor: colors.additional2,
    marginHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 5,
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
  billView: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  billLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: colors.primary,
  },
  bill: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    color: colors.moderategray,
  },
});

export default SalesCard;
