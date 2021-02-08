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
import Fields from '../../../components/Fields';
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
      dispatch(resetDoneState());
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
          <View style={styles.body}>
            <Text style={styles.titlefontdesc}>
              Please enter your current Password so that we can verify your
              Identity.
            </Text>

            {/* <TextInput
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
              )} */}

            <Fields
              keyboardType="default"
              secureTextEntry={true}
              value={changePasswordState.inputValues.currPassword}
              style={[styles.input, {marginTop: 30}]}
              label="Current password"
              error="Invalid Password"
              inputIsValid={changePasswordState.inputValidity.currPassword}
              inputIsTouched={changePasswordState.isTouched.currPassword}
              onChangeText={(val) => handleOTP(val, 'currPassword')}
              onBlur={() => {
                dispatch(blurFields('currPassword'));
              }}
            />

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
    justifyContent: 'center',
    paddingTop: 40,
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
  },
  body: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  titlefont: {
    fontSize: 30,
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  titlefontdesc: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    color: colors.grayishblack,
    marginVertical: 20,
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
