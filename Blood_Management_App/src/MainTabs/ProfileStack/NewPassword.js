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
import Fields from '../../../components/Fields';

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
        <View style={styles.body}>
          <Text style={styles.titlefontdesc}>Enter a new password</Text>

          <Text style={{marginTop: 20, fontFamily: 'Montserrat-Regular'}}>
            Password must be at least 8 characters long and must contain at
            least 1 number, 1 special character, 1 uppercase and 1 lowercase
            alphabet.
          </Text>
          <Fields
            label="New Password"
            secureTextEntry={true}
            error="Invalid Password Format!"
            keyboardType="default"
            value={changePasswordState.inputValues.password}
            style={[styles.input, {marginTop: 30}]}
            placeholder="Password"
            onChangeText={(val) => handlepassword(val, 'password')}
            inputIsValid={changePasswordState.inputValidity.password}
            inputIsTouched={changePasswordState.isTouched.password}
            onBlur={() => {
              dispatch(blurFields('password'));
            }}
          />
          <Fields
            label="Confirm Password"
            secureTextEntry={true}
            error="Password Mismatch!"
            keyboardType="default"
            value={changePasswordState.inputValues.cpassword}
            style={[styles.input, {marginTop: 30}]}
            placeholder="Password"
            onChangeText={(val) => handlepassword(val, 'cpassword')}
            inputIsValid={changePasswordState.inputValidity.cpassword}
            inputIsTouched={changePasswordState.isTouched.cpassword}
            onBlur={() => {
              dispatch(blurFields('cpassword'));
            }}
          />
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
    fontFamily: 'Montserrat-Bold',
    color: colors.additional2,
    marginBottom: 20,
  },
  titlefontdesc: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '500',
  },
  input: {
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderColor: colors.grayishblack,
    borderWidth: 2,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 30,
    color: 'black',
  },
  errMsg: {
    color: colors.dutchred,
    fontFamily: 'Montserrat-Bold',
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
    borderRadius: 5,
    backgroundColor: colors.grayishblack,
  },
  textSign: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
});

export default NewPassword;
