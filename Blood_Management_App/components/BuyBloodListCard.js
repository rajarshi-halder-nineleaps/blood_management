/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const BuyBloodListCard = ({ item, onPress }) => {


  return (
    <Collapse>
      <CollapseHeader style={styles.touchboard}>
        <View style={styles.typeView}>
          <Text style={styles.headerContent}>{item.blood_group}</Text>
        </View>
        <View style={styles.headerDetailsView}>
          <View style={styles.nameView}>
            <Text style={styles.nameText}>{item.name}</Text>
          </View>
        </View>
        <View style={styles.headerIndicatorView}>

        </View>
      </CollapseHeader>
      <CollapseBody style={styles.collBody}>
        <View style={styles.bodyHeader}>

          <Text style={styles.bodyLabel}>
            Contact Details : {item.name}
            <Text style={styles.bodyContent}>{item.driveId}</Text>
          </Text>

        </View>

        <View style={styles.detailsBoard}>

          <View style={styles.detailsView}>
            <View style={styles.addressContentView}>
              <View style={styles.addressInsideView}>
                <Text style={styles.addressInsideLabel}>Name:</Text>
                <View style={styles.addressRightView}>
                  <Text style={styles.addressContent}>
                    {item.name}
                  </Text>
                </View>
              </View>
              <View style={styles.addressInsideView}>
                <Text style={styles.addressInsideLabel}>Email:</Text>
                <View style={styles.addressRightView}>
                  <Text style={styles.addressContent}>
                    {item.email}
                  </Text>
                </View>
              </View>

              <View style={styles.addressInsideView}>
                <Text style={styles.addressInsideLabel}>
                  Unit Price:
                </Text>
                <View style={styles.addressRightView}>
                  <Text style={styles.addressContent}>
                    {item.unitprice}
                  </Text>
                </View>
              </View>

            </View>
          </View>
          <View style={styles.headerIndicatorView}>
            <TouchableOpacity onPress={onPress} style={styles.invite}>
              <Text style={styles.invitebutton}> Buy</Text>
            </TouchableOpacity>

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
    justifyContent: 'center'
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
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 10
  },
  invitebutton: {
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
});

export default BuyBloodListCard;
