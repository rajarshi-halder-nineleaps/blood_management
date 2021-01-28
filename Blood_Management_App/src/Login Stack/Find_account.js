/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {updateFields, blurFields} from '../../redux/forgotpassword/actions';
import {useDispatch, useSelector} from 'react-redux';
import {emailRegex} from '../../constants/Regexes';
import {TextInput} from 'react-native-gesture-handler';
import {postEmail, resetDoneState} from '../../redux/forgotpassword/actions';
import colors from '../../constants/Colors';

import Feather from 'react-native-vector-icons/Feather';

const Findaccount = ({navigation}) => {
  const dispatch = useDispatch();
  const forgotState = useSelector((state) => state.forgotState);

  useEffect(() => {
    dispatch(resetDoneState('emailSent'));
    console.log('emailSent set to false');
  }, [dispatch]);

  const handleEmail = (val, fieldId) => {
    let isValid = true;
    if (emailRegex.test(val) !== true) {
      isValid = false;
    }
    dispatch(updateFields(val, fieldId, isValid));
  };

  const submitHandler = () => {
    if (forgotState.inputValidity.email) {
      dispatch(postEmail(forgotState.inputValues.email));
      if (forgotState.emailSent) {
        navigation.navigate('EnterOTP');
      }
    } else {
      Alert.alert('Invalid email', 'Please enter a valid email address!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" color="white" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.colorView}>
            <Text style={styles.titlefont}>Find Your Account</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.titlefontdesc}>
              Help us find your Account by entering your Registered Email
            </Text>

            <TextInput
              keyboardType="email-address"
              style={[styles.input, {marginTop: 30}]}
              value={forgotState.inputValues.email}
              placeholder="Email"
              onChangeText={(val) => handleEmail(val, 'email')}
              onBlur={() => {
                dispatch(blurFields('email'));
              }}
            />
            {!forgotState.inputValidity.email &&
              forgotState.isTouched.email && (
                <Text style={styles.errMsg}>Invalid email!</Text>
              )}

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => submitHandler()}>
                <Feather name="arrow-right" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 20,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorView: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingBottom: 10,
    paddingTop: 80,
  },
  body: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  titlefont: {
    fontSize: 40,
    fontFamily: 'sans-serif-light',
    color: colors.additional2,
    marginBottom: 20,
  },
  titlefontdesc: {
    fontSize: 20,
    fontWeight: '500',
  },
  input: {
    paddingVertical: 15,
    marginVertical: 20,
    borderRadius: 100,
    backgroundColor: colors.accent,
    fontSize: 18,
    fontFamily: 'sans-serif-condensed',
    paddingHorizontal: 30,
    color: 'black',
  },
  errMsg: {
    color: colors.primary,
  },
  button: {
    marginTop: 30,
    alignItems: 'center',
  },
  signIn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
  },
  textSign: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
});

export default Findaccount;
