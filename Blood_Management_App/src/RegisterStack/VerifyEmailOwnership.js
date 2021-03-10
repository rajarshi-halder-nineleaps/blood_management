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
import {useDispatch, useSelector} from 'react-redux';
import Fields from '../../components/Fields';
//todo make these action creators.
import {
  verifyOTP,
  sendOtp,
  updateOtp,
  blurOtp,
  resetOtpState,
} from '../../redux/register/actions';
import {otpRegex} from '../../constants/Regexes';
import {regUserUp} from '../../redux/auth/actions';

const Enterotp = ({navigation}) => {
  const dispatch = useDispatch();
  const regFormState = useSelector((state) => state.regFormState);
  const regIndFormState = useSelector((state) => state.regIndFormState);

  useEffect(() => {
    dispatch(resetOtpState());
  }, [dispatch]);

  useEffect(() => {
    console.log(regFormState.userVerified);
  }, [regFormState.userVerified]);

  const handleOTP = (val) => {
    let isValid = true;
    if (!otpRegex.test(String(val.trim()))) {
      isValid = false;
    }
    dispatch(updateOtp(val, isValid));
  };

  const handleSubmit = () => {
    if (regFormState.otp.validity) {
      if (regFormState.userVerified === 2 || regFormState.userVerified === 3) {
        dispatch(
          verifyOTP(
            regFormState.inputValues.email,
            regFormState.otp.value,
            () => {
              dispatch(
                regUserUp({
                  formData: regFormState.inputValues,
                  userType: regFormState.userVerified,
                }),
              );
            },
          ),
        );
      } else {
        dispatch(
          verifyOTP(
            regFormState.inputValues.email,
            regFormState.otp.value,
            dispatch(
              regUserUp({
                formData: regIndFormState.inputValues,
                userType: 1,
              }),
            ),
          ),
        );
      }
    } else {
      Alert.alert('Invalid OTP', 'Please enter a valid OTP');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {regFormState.loading ? (
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
                Please verify your email by entering the OTP that has been sent
                to the entered email address.
              </Text>
              <Fields
                keyboardType="numeric"
                label="OTP"
                error="Invalid OTP"
                secureTextEntry={true}
                value={regFormState.otp.values}
                placeholder="Code"
                inputIsValid={regFormState.otp.validity}
                inputIsTouched={regFormState.otp.touched}
                onChangeText={(val) => handleOTP(val)}
                onBlur={() => {
                  dispatch(blurOtp());
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  if (Platform.OS === 'android') {
                    ToastAndroid.show('Resending OTP', ToastAndroid.SHORT);
                  } else {
                    AlertIOS.alert('Resending OTP');
                  }
                  dispatch(sendOtp(regFormState.inputValues.email));
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
