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
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {
  updateFields,
  blurFields,
  resetDoneState,
  postCurrentPassword,
} from '../../../redux/changePassword/actions';
import {useDispatch, useSelector} from 'react-redux';
import {passwordRegex} from '../../../constants/Regexes';

const ConfirmPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const changePasswordState = useSelector((state) => state.changePasswordState);
  const authState = useSelector((state) => state.authState);

  useEffect(() => {
    if (changePasswordState.passwordSent) {
      navigation.navigate('newPassword');
    }
  }, [changePasswordState.passwordSent, navigation]);

  const handleOTP = (val, fieldId) => {
    let isValid = true;
    if (!passwordRegex.test(String(val.trim()))) {
      isValid = false;
    }
    dispatch(updateFields(val, fieldId, isValid));
  };

  const handleSubmit = () => {
    if (changePasswordState.inputValidity.currPassword) {
      dispatch(
        postCurrentPassword(
          authState.userToken,
          changePasswordState.inputValues.currPassword,
        ),
      );
    } else {
      Alert.alert('Invalid Password', 'Please enter your valid password');
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
            <Text style={styles.titlefont}>Current Password</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.titlefontdesc}>
              Please enter your current Password so that we can verify your
              Identity.
            </Text>

            <TextInput
              keyboardType="default"
              secureTextEntry={true}
              value={changePasswordState.inputValues.currPassword}
              style={[styles.input, {marginTop: 30}]}
              placeholder="Current password"
              onChangeText={(val) => handleOTP(val, 'currPassword')}
              onBlur={() => {
                dispatch(blurFields('currPassword'));
              }}
            />
            {!changePasswordState.inputValidity.currPassword &&
              changePasswordState.isTouched.currPassword && (
                <Text style={styles.errMsg}>Inavlid Password!</Text>
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

export default ConfirmPassword;
