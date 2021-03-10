/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import colors from '../constants/Colors';

const Fields = (props) => {
  return (
    <View style={styles.outerView}>
      <View style={styles.inputView}>
        {/* <Text style={styles.labelText}>{props.label}</Text> */}
        <TextInput
          {...props}
          mode="outlined"
          error={!props.inputIsValid && props.inputIsTouched}
          selectionColor={colors.primary}
          underlineColor={colors.grayishblack}
          theme={{colors: {primary: colors.grayishblack}}}
          style={styles.formInput}
        />
      </View>
      {!props.inputIsValid && props.inputIsTouched && (
        <Text style={styles.errorMsg}>{props.error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerView: {
    marginBottom: 5,
  },
  inputView: {
    paddingVertical: 10,
  },
  labelText: {
    fontFamily: 'Montserrat-Regular',
    paddingBottom: 3, //* REMOVE THIS IF INTERFACE GETS MESSED UP
  },
  formInput: {
    backgroundColor: colors.additional2,
    fontFamily: 'Montserrat-Regular',
  },
  // formInput: {
  //   paddingVertical: 10,
  //   borderRadius: 5,
  //   backgroundColor: 'transparent',
  //   borderColor: colors.grayishblack,
  //   borderWidth: 2,
  //   fontSize: 14,
  //   fontFamily: 'Montserrat-Regular',
  //   paddingHorizontal: 30,
  //   color: 'black',
  // },
  // formInputInvalid: {
  //   paddingVertical: 10,
  //   borderRadius: 5,
  //   backgroundColor: 'transparent',
  //   borderColor: colors.dutchred,
  //   borderWidth: 2,
  //   fontSize: 14,
  //   fontFamily: 'Montserrat-Regular',
  //   paddingHorizontal: 30,
  //   color: 'black',
  // },
  errorMsg: {
    color: colors.dutchred,
    fontFamily: 'Montserrat-Regular',
  },
});

export default Fields;
