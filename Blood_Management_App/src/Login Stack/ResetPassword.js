/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Fields from '../../components/Fields';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {updateFields, blurFields} from '../../redux/forgotpassword/actions';
import {useDispatch, useSelector} from 'react-redux';
import {passwordRegex} from '../../constants/Regexes';
import {
  postResetPassword,
  resetDoneState,
  stateCleanup,
} from '../../redux/forgotpassword/actions';

const Resetpassword = ({navigation}) => {
  const dispatch = useDispatch();
  const forgotState = useSelector((state) => state.forgotState);

  useEffect(() => {
    dispatch(resetDoneState('passwordReset'));
    console.log('passwordReset set to false');
  }, [dispatch]);

  useEffect(() => {
    if (forgotState.passwordReset) {
      dispatch(stateCleanup());
      navigation.navigate('LoginScreen');
    }
  }, [dispatch, forgotState.passwordReset, navigation]);

  const handlepassword = (val, fieldId) => {
    let isValid = true;
    if (passwordRegex.test(val) !== true) {
      isValid = false;
    }

    if (fieldId === 'cpassword' && val !== forgotState.inputValues.password) {
      isValid = false;
    }

    dispatch(updateFields(val, fieldId, isValid));
  };

  const handleSubmit = () => {
    if (
      forgotState.inputValidity.password &&
      forgotState.inputValidity.cpassword
    ) {
      dispatch(
        postResetPassword(
          forgotState.inputValues.email,
          forgotState.inputValues.password,
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
      {forgotState.loading ? (
        <View style={styles.progressBoard}>
          <ActivityIndicator
            visible={forgotState.loading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
            animating={true}
            color={colors.primary}
            size="large"
          />
        </View>
      ) : (
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

            {/* <TextInput
            secureTextEntry={true}
            keyboardType="default"
            value={forgotState.inputValues.password}
            style={[styles.input, {marginTop: 30}]}
            placeholder="Password"
            onChangeText={(val) => handlepassword(val, 'password')}
            onBlur={() => {
              dispatch(blurFields('password'));
            }}
          />

          {!forgotState.inputValidity.password &&
            forgotState.isTouched.password && (
              <Text style={styles.errMsg}>Invalid password format!</Text>
            )} */}

            <Fields
              keyboardType="default"
              label="Password"
              error="Invalid password"
              secureTextEntry={true}
              value={forgotState.inputValues.password}
              inputIsValid={forgotState.inputValidity.password}
              inputIsTouched={forgotState.isTouched.password}
              onChangeText={(val) => handlepassword(val, 'password')}
              onBlur={() => {
                dispatch(blurFields('password'));
              }}
            />

            <Fields
              keyboardType="default"
              label="Password"
              error="Password mismatch"
              secureTextEntry={true}
              value={forgotState.inputValues.cpassword}
              inputIsValid={forgotState.inputValidity.cpassword}
              inputIsTouched={forgotState.isTouched.cpassword}
              onChangeText={(val) => handlepassword(val, 'cpassword')}
              onBlur={() => {
                dispatch(blurFields('cpassword'));
              }}
            />

            {/* <TextInput
            secureTextEntry={true}
            keyboardType="default"
            value={forgotState.inputValues.cpassword}
            style={[styles.input, {marginTop: 30}]}
            placeholder="Confirm Password"
            onChangeText={(val) => handlepassword(val, 'cpassword')}
            onBlur={() => {
              dispatch(blurFields('cpassword'));
            }}
          />
          {!forgotState.inputValidity.cpassword &&
            forgotState.isTouched.cpassword && (
              <Text style={styles.errMsg}>Password mismatch!</Text>
            )} */}

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

export default Resetpassword;
