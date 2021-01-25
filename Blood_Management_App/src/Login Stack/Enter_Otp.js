import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

const enterotp = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const [isValidOtp, setisValidOtp] = useState(true);

  const handleOTP = (val) => {
    let reg = /^\d{4}$/;
    if (reg.test(val) == true) {
      setOtp(val);
      setisValidOtp(true);
    } else {
      setOtp(val);
      setisValidOtp(false);
    }
  };

  const handleSubmit = () => {
    if (otp == '') {
      setisValidOtp(false);
    } else {
      if (isValidOtp == true) {
        navigation.navigate('ResetPassword');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
              Check your mailbox for One-Time-Password sent for verification
            </Text>

            <TextInput
              keyboardType="numeric"
              style={[styles.input, {marginTop: 30}]}
              placeholder="Code"
              onChangeText={(val) => handleOTP(val)}
            />
            {isValidOtp ? null : (
              <Text style={styles.errMsg}>Should be Valid OTP</Text>
            )}

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
    </SafeAreaView>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.2;
const WIDTH = Dimensions.get('window').width;

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
    justifyContent: 'center',
    alignItems: 'center',
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

export default enterotp;
