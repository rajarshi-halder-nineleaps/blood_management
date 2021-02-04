/* eslint-disable prettier/prettier */
import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import colors from '../constants/Colors';
import {useSelector} from 'react-redux';

const InventoryInput = (props) => {
  const inventoryState = useSelector((state) => state.inventoryState);

  return (
    <View style={styles.inventoryInput}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  invInput: {
    color: colors.additional1,
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontFamily: 'Montserrat-Regular',
  },
  editingInput: {
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  notEditingInput: {},
  inventoryInput: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default InventoryInput;
