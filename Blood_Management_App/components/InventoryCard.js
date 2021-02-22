/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image, ImageBackground, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {updateFields} from '../redux/inventory/actions';
import InventoryInput from './InventoryInput';
import colors from '../constants/Colors';
import {numbersOnlyRegex} from '../constants/Regexes';

const InventoryCard = (props) => {
  const {cardData} = props;
  const inventoryState = useSelector((state) => state.inventoryState);
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Component : {cardData.comp}</Text>
        <View style={styles.tableHead}>
          <Text style={styles.tableHeadLeft}>Group</Text>
          <Text style={styles.tableHeadText}>Units</Text>
          <Text style={styles.tableHeadText}>Price Per Unit (₹)</Text>
        </View>
      </View>
      {props.cardData.data.map((val, idx) => (
        <View key={idx} style={styles.insideView}>
          <View style={styles.subHead}>
            <Text style={styles.subHeadText}>{val.group}</Text>
          </View>
          <InventoryInput
            style={styles.inventoryInput}
            value={inventoryState.invData[props.id].data[idx].units + ''}
            onChangeText={(newVal) => {
              dispatch(updateFields(newVal, idx, 'units', props.id));
            }}
          />
          {authState.userType === 2 ? (
            <InventoryInput
              style={styles.inventoryInput}
              value={inventoryState.invData[props.id].data[idx].price + ''}
              onChangeText={(newVal) => {
                dispatch(updateFields(newVal, idx, 'price', props.id));
              }}
            />
          ) : null}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    marginVertical: 10,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: colors.additional2,
  },
  header: {
    padding: 20,
    backgroundColor: colors.grayishblack,
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: colors.additional2,
  },
  tableHead: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tableHeadLeft: {
    color: colors.additional2,
    fontFamily: 'Montserrat-Bold',
    marginRight: 10,
  },
  tableHeadText: {
    color: colors.additional2,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    flex: 1,
  },
  insideView: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subHead: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    width: 50,
    backgroundColor: colors.dutchred,
    padding: 7,
  },
  subHeadText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2,
  },
});

export default InventoryCard;
