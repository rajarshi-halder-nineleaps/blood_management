/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  AlertIOS,
} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {updateFields, blurFields} from '../../redux/forgotpassword/actions';
import {useDispatch, useSelector} from 'react-redux';
import Fields from '../../components/Fields';
import {
  postEmail,
  postOTP,
  resetDoneState,
} from '../../redux/forgotpassword/actions';
import {otpRegex} from '../../constants/Regexes';

const Enterotp = ({navigation}) => {
  const dispatch = useDispatch();
  const forgotState = useSelector((state) => state.forgotState);

  // useEffect(() => {
  //   dispatch(resetDoneState('otpVerified'));
  //   console.log('otpVerified set to false');
  // }, [dispatch]);

  useEffect(() => {
    dispatch(resetDoneState());
    if (forgotState.otpVerified) {
      navigation.navigate('ResetPassword');
    }
  }, [dispatch, forgotState.otpVerified, navigation]);

  const handleOTP = (val, fieldId) => {
    let isValid = true;
    if (!otpRegex.test(String(val.trim()))) {
      isValid = false;
    }
    dispatch(updateFields(val, fieldId, isValid));
  };

  const handleSubmit = () => {
    if (forgotState.inputValidity.otp) {
      dispatch(
        postOTP(forgotState.inputValues.email, forgotState.inputValues.otp),
      );
    } else {
      Alert.alert('Invalid OTP', 'Please enter a valid OTP');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {forgotState.loading ? (
        <View style={styles.progressBoard}>
          <SkypeIndicator color={colors.primary} />
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <ScrollView>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="chevron-left" color="white" size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.colorView}>
              <Text style={styles.titlefont}>Enter OTP</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.titlefontdesc}>
                If your provided email matches with any of the accounts
                registered with us, we will send you an OTP.
              </Text>
              <Fields
                keyboardType="numeric"
                label="OTP"
                error="Invalid OTP"
                secureTextEntry={true}
                value={forgotState.inputValues.otp}
                placeholder="Code"
                inputIsValid={forgotState.inputValidity.otp}
                inputIsTouched={forgotState.isTouched.otp}
                onChangeText={(val) => handleOTP(val, 'otp')}
                onBlur={() => {
                  dispatch(blurFields('otp'));
                }}
              />

              {
                //TODO REMOVE IF ABOVE FIELD WORKS OUT WELL
              }
              {/* <TextInput
              keyboardType="numeric"
              value={forgotState.inputValues.otp}
              style={[styles.input, {marginTop: 30}]}
              placeholder="Code"
              onChangeText={(val) => handleOTP(val, 'otp')}
              onBlur={() => {
                dispatch(blurFields('otp'));
              }}
            />
            {!forgotState.inputValidity.otp && forgotState.isTouched.otp && (
              <Text style={styles.errMsg}>Inavlid OTP!</Text>
            )} */}
              <TouchableOpacity
                onPress={() => {
                  if (Platform.OS === 'android') {
                    ToastAndroid.show('Resending OTP', ToastAndroid.SHORT);
                  } else {
                    AlertIOS.alert('Resending OTP');
                  }
                  dispatch(postEmail(forgotState.inputValues.email));
                }}>
                <Text style={styles.resendotp}>Resend OTP</Text>
              </TouchableOpacity>
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => handleSubmit()}>
                  <Feather name="check" size={30} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  progressBoard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingTop: 50,
  },
  body: {
    flex: 0.8,
    paddingHorizontal: 40,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  titlefont: {
    fontSize: 25,
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2,
    marginBottom: 20,
  },
  titlefontdesc: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  input: {
    paddingVertical: 15,
    marginVertical: 20,
    borderRadius: 100,
    backgroundColor: colors.accent,
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 30,
    color: 'black',
  },
  errMsg: {
    fontFamily: 'Montserrat-Regular',
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
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
  },
  resendotp: {
    fontFamily: 'Montserrat-Regular',
    color: colors.coolblue,
  },
});

export default Enterotp;
