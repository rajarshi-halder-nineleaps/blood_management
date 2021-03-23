/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import colors from '../../../constants/Colors';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Feather from 'react-native-vector-icons/Feather';

const SalesCard = ({navigation, route}) => {
  const {item} = route.params;

  return (
    <ScrollView>
      <View>
        <View style={styles.collBody}>
          <View style={styles.bodyHeader}>
            <Text style={styles.bodyLabel}>
              Transaction ID : {'  '}
              <Text style={styles.bodyContent}>{item.salesId}</Text>
            </Text>
          </View>

          <View style={styles.detailsBoard}>
            <View style={styles.contentView}>
              <Text style={styles.label}>
                Transaction Date: {'  '}
                <Text style={styles.content}>
                  {item.dateOfTransaction
                    ? `${item.dateOfTransaction.split('T')[0]}, ${
                        item.dateOfTransaction.split('T')[1].split(':')[0]
                      }:${item.dateOfTransaction.split('T')[1].split(':')[1]}`
                    : null}
                </Text>
              </Text>

              <View style={styles.addressView}>
                <Text style={styles.addressLabel}>Buyer Details:</Text>
                <View style={styles.addressContentView}>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>Buyer Name: </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.buyerName}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>Buyer Email: </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.buyerEmail}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>
                      Buyer Contact:{' '}
                    </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.buyerContact}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>
                      Purpose of purchase:{' '}
                    </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>{item.reason}</Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>
                      Location of transfusion/storage:{' '}
                    </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>{item.location}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.addressView}>
                <Text style={styles.addressLabel}>Transaction Details:</Text>
                <View style={styles.addressContentView}>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>Sold group: </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.purchasedGroup}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>
                      Sold component:{' '}
                    </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.purchasedComponent}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>Sold units: </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.purchasedQuantity}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>
                      Price per unit:{' '}
                    </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.pricePerUnit}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.billView}>
              <Text style={styles.billLabel}>Total bill amount: </Text>
              <Text style={styles.bill}>
                ₹ {item.pricePerUnit * item.purchasedQuantity}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
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
    borderRadius: 5,
    paddingBottom: 20,
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
