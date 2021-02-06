/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {
  updateFields,
  blurFields,
  resetDoneState,
  stateCleanup,
  postResetPassword,
} from '../../../redux/changePassword/actions';
import {useDispatch, useSelector} from 'react-redux';
import {passwordRegex} from '../../../constants/Regexes';

const NewPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const changePasswordState = useSelector((state) => state.changePasswordState);
  const authState = useSelector((state) => state.authState);

  useEffect(() => {
    if (changePasswordState.passwordReset) {
      dispatch(stateCleanup());
      navigation.navigate('profile');
    }
  }, [dispatch, changePasswordState.passwordReset, navigation]);

  const handlepassword = (val, fieldId) => {
    let isValid = true;
    if (passwordRegex.test(val) !== true) {
      isValid = false;
    }

    if (
      fieldId === 'cpassword' &&
      val !== changePasswordState.inputValues.password
    ) {
      isValid = false;
    }
    dispatch(updateFields(val, fieldId, isValid));
  };

  const handleSubmit = () => {
    if (
      changePasswordState.inputValidity.password &&
      changePasswordState.inputValidity.cpassword
    ) {
      dispatch(
        postResetPassword(
          authState.userToken,
          changePasswordState.inputValues.password,
        ),
      );
    } else {
      Alert.alert(
        'Invalid Inputs',
        'Please check all the inputs before proceeding.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" color="white" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.colorView}>
          <Text style={styles.titlefont}>Set new password</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.titlefontdesc}>Enter a new password</Text>
          <Text style={{marginTop: 20}}>
            Password must be at least 8 characters long and must contain at
            least 1 number, 1 special character, 1 uppercase and 1 lowercase
            alphabet.
          </Text>

          <TextInput
            secureTextEntry={true}
            keyboardType="default"
            value={changePasswordState.inputValues.password}
            style={[styles.input, {marginTop: 30}]}
            placeholder="Password"
            onChangeText={(val) => handlepassword(val, 'password')}
            onBlur={() => {
              dispatch(blurFields('password'));
            }}
          />

          {!changePasswordState.inputValidity.password &&
            changePasswordState.isTouched.password && (
              <Text style={styles.errMsg}>Invalid password format!</Text>
            )}

          <TextInput
            secureTextEntry={true}
            keyboardType="default"
            value={changePasswordState.inputValues.cpassword}
            style={[styles.input, {marginTop: 30}]}
            placeholder="Confirm Password"
            onChangeText={(val) => handlepassword(val, 'cpassword')}
            onBlur={() => {
              dispatch(blurFields('cpassword'));
            }}
          />
          {!changePasswordState.inputValidity.cpassword &&
            changePasswordState.isTouched.cpassword && (
              <Text style={styles.errMsg}>Password mismatch!</Text>
            )}

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => handleSubmit()}>
              <Text style={[styles.textSign, {color: 'white'}]}>
                Set Password
              </Text>
            </TouchableOpacity>
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
    flex: 0.8,
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
    marginVertical: 10,
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  signIn: {
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: colors.primary,
  },
  textSign: {
    fontSize: 18,
    fontFamily: 'sans-serif-light',
  },
});

export default NewPassword;
