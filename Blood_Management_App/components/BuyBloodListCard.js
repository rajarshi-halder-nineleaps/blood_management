/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
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
import colors from '../constants/Colors';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const BuyBloodListCard = ({item, onPress}) => {
  const buybloodFormState = useSelector((state) => state.buybloodFormState);

  return (
    <Collapse>
      <CollapseHeader style={styles.touchboard}>
        <View style={styles.typeView}>
          <Text style={styles.headerContent}>{item.bbId}</Text>
        </View>
        <View style={styles.headerDetailsView}>
          <View style={styles.nameView}>
            <Text style={styles.nameText}>{item.bbName}</Text>
          </View>
          <View style={styles.miniAddressView}>
            <Text style={styles.miniAddressContent}>
              Total amount: ₹{' '}
              {item.price * buybloodFormState.inputValues.req_units}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.invite}>
          <Text style={styles.invitebutton}>Buy Now</Text>
        </TouchableOpacity>
      </CollapseHeader>
      <CollapseBody style={styles.collBody}>
        <View style={styles.detailsBoard}>
          <View style={styles.detailsView}>
            <View style={styles.addressContentView}>
              <View style={styles.addressInsideView}>
                <Text style={styles.addressInsideLabel}>Name:</Text>
                <View style={styles.addressRightView}>
                  <Text style={styles.addressContent}>{item.bbName}</Text>
                </View>
              </View>
              <View style={styles.addressInsideView}>
                <Text style={styles.addressInsideLabel}>Email:</Text>
                <View style={styles.addressRightView}>
                  <Text style={styles.addressContent}>{item.email}</Text>
                </View>
              </View>

              <View style={styles.addressInsideView}>
                <Text style={styles.addressInsideLabel}>Contact:</Text>
                <View style={styles.addressRightView}>
                  <Text style={styles.addressContent}>{item.phoneNo}</Text>
                </View>
              </View>

              <View style={styles.addressInsideView}>
                <Text style={styles.addressInsideLabel}>Address: </Text>
                <View style={styles.addressRightView}>
                  <Text style={styles.addressContent}>
                    {item.address}, {item.district}, {item.state} [
                    {item.pincode}]
                  </Text>
                </View>
              </View>

              <View style={styles.addressInsideView}>
                <Text style={styles.addressInsideLabel}>Price per unit:</Text>
                <View style={styles.addressRightView}>
                  <Text style={styles.addressContent}>₹ {item.price}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </CollapseBody>
    </Collapse>
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
  headerIndicatorView: {
    justifyContent: 'center',
  },
  yesnoView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },

  yes: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: 'green',
  },
  no: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: 'red',
  },
  headerContent: {
    fontFamily: 'Montserrat-Regular',
    color: 'white',
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
  invite: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  invitebutton: {
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
});

export default BuyBloodListCard;
