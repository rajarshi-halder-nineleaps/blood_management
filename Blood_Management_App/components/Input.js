import React from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import colors from "../constants/Colors";

const Input = (props) => {
  return (
    <View>
      <View style={styles.inputView}>
        <TextInput
        { ...props }
          style={styles.formInput}
          placeholder={props.label}
          placeholderTextColor={colors.grayishblack}
        />
      </View>
      {!props.inputIsValid && props.inputIsTouched && <Text style={styles.errorMsg}>{props.error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    paddingVertical: 10,
  },
  formInput: {
    paddingVertical: 15,
    borderRadius: 100,
    backgroundColor: colors.accent,
    fontSize: 18,
    fontFamily: 'sans-serif-condensed',
    paddingHorizontal: 30,
    color: 'black',
  },
  errorMsg: {
    color: colors.primary,
    fontFamily: 'qs-reg',
  },
});

export default Input;
