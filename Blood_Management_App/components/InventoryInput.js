/* eslint-disable prettier/prettier */
import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import colors from '../constants/Colors';
import {useSelector} from 'react-redux';

const InventoryInput = (props) => {
  const inventoryState = useSelector((state) => state.inventoryState);

  return (
    <TextInput
      {...props}
      style={[
        styles.invInput,
        inventoryState.editing
          ? {...styles.editingInput}
          : {...styles.notEditingInput},
      ]}
      editable={inventoryState.editing ? true : false}
      keyboardType="number-pad"
    />
  );
};

const styles = StyleSheet.create({
  invInput: {
    color: colors.additional1,
    width: 200,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  editingInput: {
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  notEditingInput: {},
});

export default InventoryInput;
