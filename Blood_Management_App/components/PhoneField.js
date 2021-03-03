/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

const Fields = (props) => {
  return (
    <View style={styles.outerView}>
      <View style={styles.inputView}>
        <Text style={styles.labelText}>{props.label}</Text>
        <View style={styles.removerView}>
          <TextInput
            {...props}
            style={
              !props.inputIsValid && props.inputIsTouched
                ? styles.formInputInvalid
                : styles.formInput
            }
            // placeholder={props.label}
            placeholderTextColor={colors.grayishblack}
            onFocus={() => {}}
          />
          {props.length > 1 ? (
            <TouchableOpacity
              style={styles.removePhoneTouch}
              onPress={() => props.phoneRemover(props.idx)}>
              <Feather name="x" color={colors.additional2} size={15} />
            </TouchableOpacity>
          ) : null}
        </View>
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
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderColor: colors.grayishblack,
    borderWidth: 2,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 30,
    color: 'black',
    flex: 1,
  },
  formInputInvalid: {
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderColor: colors.dutchred,
    borderWidth: 2,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 30,
    color: 'black',
    flex: 1,
  },
  errorMsg: {
    color: colors.dutchred,
    fontFamily: 'Montserrat-Regular',
  },
  removerView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  removePhoneBoard: {
    width: '100%',
    alignItems: 'flex-start',
  },
  removePhoneTouch: {
    flexDirection: 'row',
    marginLeft: 5,
    backgroundColor: colors.grayishblack,
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removePhoneText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2,
    marginRight: 5,
  },
});

export default Fields;
