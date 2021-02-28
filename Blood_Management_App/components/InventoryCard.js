/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image, ImageBackground, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {updateFields} from '../redux/inventory/actions';
import InventoryInput from './InventoryInput';
import colors from '../constants/Colors';
import {numbersOnlyRegex, decimalRegex} from '../constants/Regexes';

const InventoryCard = (props) => {
  const {cardData} = props;
  const inventoryState = useSelector((state) => state.inventoryState);
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  const groups = ['B+', 'B-', 'A+', 'A-', 'O+', 'O-', 'AB+', 'AB-'];

  const units = [
    props.cardData.bPosUnits,
    props.cardData.bNegUnits,
    props.cardData.aPosUnits,
    props.cardData.aNegUnits,
    props.cardData.oPosUnits,
    props.cardData.oNegUnits,
    props.cardData.abPosUnits,
    props.cardData.abNegUnits,
  ];
  let price = [];
  if (authState.userType === 3) {
    price = [
      props.cardData.bPosPrice,
      props.cardData.bNegPrice,
      props.cardData.aPosPrice,
      props.cardData.aNegPrice,
      props.cardData.oPosPrice,
      props.cardData.oNegPrice,
      props.cardData.abPosPrice,
      props.cardData.abNegPrice,
    ];
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Component : {cardData.component}</Text>
        <View style={styles.tableHead}>
          <Text style={styles.tableHeadLeft}>Group</Text>
          <Text style={styles.tableHeadText}>Units</Text>
          {authState.userType === 3 && (
            <Text style={styles.tableHeadText}>Price Per Unit (₹)</Text>
          )}
        </View>
      </View>
      {/* {groups.map((val, idx) => (
        
      ))} */}

      <View style={styles.insideView}>
        <View style={styles.subHead}>
          <Text style={styles.subHeadText}>B+</Text>
        </View>
        <InventoryInput
          style={styles.inventoryInput}
          value={props.cardData.bPosUnits + ''}
          onChangeText={(newVal) => {
            if (numbersOnlyRegex.test(newVal) || newVal === '') {
              dispatch(updateFields(newVal, props.id, 'bPosUnits'));
            }
          }}
        />
        {authState.userType === 3 ? (
          <InventoryInput
            style={styles.inventoryInput}
            value={props.cardData.bPosPrice + ''}
            onChangeText={(newVal) => {
              if (decimalRegex.test(newVal) || newVal === '') {
                dispatch(updateFields(newVal, props.id, 'bPosPrice'));
              }
            }}
          />
        ) : null}
      </View>

      <View style={styles.insideView}>
        <View style={styles.subHead}>
          <Text style={styles.subHeadText}>B-</Text>
        </View>
        <InventoryInput
          style={styles.inventoryInput}
          value={props.cardData.bNegUnits + ''}
          onChangeText={(newVal) => {
            if (numbersOnlyRegex.test(newVal) || newVal === '') {
              dispatch(updateFields(newVal, props.id, 'bNegUnits'));
            }
          }}
        />
        {authState.userType === 3 ? (
          <InventoryInput
            style={styles.inventoryInput}
            value={props.cardData.bNegPrice + ''}
            onChangeText={(newVal) => {
              if (decimalRegex.test(newVal) || newVal === '') {
                dispatch(updateFields(newVal, props.id, 'bNegPrice'));
              }
            }}
          />
        ) : null}
      </View>

      <View style={styles.insideView}>
        <View style={styles.subHead}>
          <Text style={styles.subHeadText}>A+</Text>
        </View>
        <InventoryInput
          style={styles.inventoryInput}
          value={props.cardData.aPosUnits + ''}
          onChangeText={(newVal) => {
            if (numbersOnlyRegex.test(newVal) || newVal === '') {
              dispatch(updateFields(newVal, props.id, 'aPosUnits'));
            }
          }}
        />
        {authState.userType === 3 ? (
          <InventoryInput
            style={styles.inventoryInput}
            value={props.cardData.aPosPrice + ''}
            onChangeText={(newVal) => {
              if (decimalRegex.test(newVal) || newVal === '') {
                dispatch(updateFields(newVal, props.id, 'aPosPrice'));
              }
            }}
          />
        ) : null}
      </View>

      <View style={styles.insideView}>
        <View style={styles.subHead}>
          <Text style={styles.subHeadText}>A-</Text>
        </View>
        <InventoryInput
          style={styles.inventoryInput}
          value={props.cardData.aNegUnits + ''}
          onChangeText={(newVal) => {
            if (numbersOnlyRegex.test(newVal) || newVal === '') {
              dispatch(updateFields(newVal, props.id, 'aNegUnits'));
            }
          }}
        />
        {authState.userType === 3 ? (
          <InventoryInput
            style={styles.inventoryInput}
            value={props.cardData.aNegPrice + ''}
            onChangeText={(newVal) => {
              if (numbersOnlyRegex.test(newVal) || newVal === '') {
                dispatch(updateFields(newVal, props.id, 'aNegPrice'));
              }
            }}
          />
        ) : null}
      </View>

      <View style={styles.insideView}>
        <View style={styles.subHead}>
          <Text style={styles.subHeadText}>O+</Text>
        </View>
        <InventoryInput
          style={styles.inventoryInput}
          value={props.cardData.oPosUnits + ''}
          onChangeText={(newVal) => {
            if (numbersOnlyRegex.test(newVal) || newVal === '') {
              dispatch(updateFields(newVal, props.id, 'oPosUnits'));
            }
          }}
        />
        {authState.userType === 3 ? (
          <InventoryInput
            style={styles.inventoryInput}
            value={props.cardData.oPosPrice + ''}
            onChangeText={(newVal) => {
              if (numbersOnlyRegex.test(newVal) || newVal === '') {
                dispatch(updateFields(newVal, props.id, 'oPosPrice'));
              }
            }}
          />
        ) : null}
      </View>

      <View style={styles.insideView}>
        <View style={styles.subHead}>
          <Text style={styles.subHeadText}>O-</Text>
        </View>
        <InventoryInput
          style={styles.inventoryInput}
          value={props.cardData.oNegUnits + ''}
          onChangeText={(newVal) => {
            if (numbersOnlyRegex.test(newVal) || newVal === '') {
              dispatch(updateFields(newVal, props.id, 'oNegUnits'));
            }
          }}
        />
        {authState.userType === 3 ? (
          <InventoryInput
            style={styles.inventoryInput}
            value={props.cardData.oNegPrice + ''}
            onChangeText={(newVal) => {
              if (numbersOnlyRegex.test(newVal) || newVal === '') {
                dispatch(updateFields(newVal, props.id, 'oNegPrice'));
              }
            }}
          />
        ) : null}
      </View>

      <View style={styles.insideView}>
        <View style={styles.subHead}>
          <Text style={styles.subHeadText}>AB+</Text>
        </View>
        <InventoryInput
          style={styles.inventoryInput}
          value={props.cardData.abPosUnits + ''}
          onChangeText={(newVal) => {
            if (numbersOnlyRegex.test(newVal) || newVal === '') {
              dispatch(updateFields(newVal, props.id, 'abPosUnits'));
            }
          }}
        />
        {authState.userType === 3 ? (
          <InventoryInput
            style={styles.inventoryInput}
            value={props.cardData.abPosPrice + ''}
            onChangeText={(newVal) => {
              if (numbersOnlyRegex.test(newVal) || newVal === '') {
                dispatch(updateFields(newVal, props.id, 'abPosPrice'));
              }
            }}
          />
        ) : null}
      </View>

      <View style={styles.insideView}>
        <View style={styles.subHead}>
          <Text style={styles.subHeadText}>AB-</Text>
        </View>
        <InventoryInput
          style={styles.inventoryInput}
          value={props.cardData.abNegUnits + ''}
          onChangeText={(newVal) => {
            if (numbersOnlyRegex.test(newVal) || newVal === '') {
              dispatch(updateFields(newVal, props.id, 'abNegUnits'));
            }
          }}
        />
        {authState.userType === 3 ? (
          <InventoryInput
            style={styles.inventoryInput}
            value={props.cardData.abNegPrice + ''}
            onChangeText={(newVal) => {
              if (numbersOnlyRegex.test(newVal) || newVal === '') {
                dispatch(updateFields(newVal, props.id, 'abNegPrice'));
              }
            }}
          />
        ) : null}
      </View>
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
