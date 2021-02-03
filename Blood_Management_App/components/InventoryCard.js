/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image, ImageBackground, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateFields} from '../redux/inventory/actions';
import InventoryInput from './InventoryInput';
import colors from '../constants/Colors';
import {numbersOnlyRegex} from '../constants/Regexes';

const InventoryCard = (props) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <ImageBackground
        style={styles.imageBkg}
        source={require('../assets/images/invBkg.png')}>
        <View style={styles.groupView}>
          <Text style={styles.groupText}>
            Blood group: {' ' + props.cardData.bloodGroup}
          </Text>
        </View>
        <View style={styles.inputView}>
          <View style={styles.subGroup}>
            <Text style={styles.subHead}>Blood: </Text>
            <View style={styles.miniGroup}>
              <View style={styles.labelView}>
                <Text style={styles.label}>Price per unit: </Text>
              </View>
              <InventoryInput
                value={props.cardData.blood.price + ''}
                onChangeText={(newVal) => {
                  dispatch(updateFields(newVal, 'blood', 'price', props.id));
                }}
              />
            </View>
            <View style={styles.miniGroup}>
              <View style={styles.labelView}>
                <Text style={styles.label}>Units in stock: </Text>
              </View>
              <InventoryInput
                value={props.cardData.blood.units + ''}
                onChangeText={(newVal) => {
                  dispatch(updateFields(newVal, 'blood', 'units', props.id));
                }}
              />
            </View>
          </View>

          <View style={styles.subGroup}>
            <Text style={styles.subHead}>Plasma: </Text>
            <View style={styles.miniGroup}>
              <View style={styles.labelView}>
                <Text style={styles.label}>Price per unit: </Text>
              </View>
              <InventoryInput
                value={props.cardData.plasma.price + ''}
                onChangeText={(newVal) => {
                  dispatch(updateFields(newVal, 'plasma', 'price', props.id));
                }}
              />
            </View>
            <View style={styles.miniGroup}>
              <View style={styles.labelView}>
                <Text style={styles.label}>Units in stock: </Text>
              </View>
              <InventoryInput
                value={props.cardData.plasma.units + ''}
                onChangeText={(newVal) => {
                  dispatch(updateFields(newVal, 'plasma', 'units', props.id));
                }}
              />
            </View>
          </View>

          <View style={styles.subGroup}>
            <Text style={styles.subHead}>Platelets: </Text>
            <View style={styles.miniGroup}>
              <View style={styles.labelView}>
                <Text style={styles.label}>Price per unit: </Text>
              </View>
              <InventoryInput
                value={props.cardData.platelets.price + ''}
                onChangeText={(newVal) => {
                  dispatch(
                    updateFields(newVal, 'platelets', 'price', props.id),
                  );
                }}
              />
            </View>
            <View style={styles.miniGroup}>
              <View style={styles.labelView}>
                <Text style={styles.label}>Units in stock: </Text>
              </View>
              <InventoryInput
                value={props.cardData.platelets.units + ''}
                onChangeText={(newVal) => {
                  dispatch(
                    updateFields(newVal, 'platelets', 'units', props.id),
                  );
                }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderTopLeftRadius: 50,
    marginVertical: 10,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: colors.primary,
    borderBottomRightRadius: 30,
  },
  imageBkg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingBottom: 30,
    width: '100%',
    height: '100%',
  },
  groupView: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
    color: colors.additional2,
  },
  inputView: {
    paddingHorizontal: 20,
    backgroundColor: colors.additional2,
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
    elevation: 5,
  },
  subGroup: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: colors.primary,
  },
  subHead: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: colors.secondary,
  },
  miniGroup: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  labelView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: colors.primary,
  },
});

export default InventoryCard;
