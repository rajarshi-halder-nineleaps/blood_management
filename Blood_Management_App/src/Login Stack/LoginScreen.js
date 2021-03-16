/* eslint-disable prettier/prettier */
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../constants/Colors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { emailRegex, passwordRegex } from '../../constants/Regexes';
//* setting up the actions for auth.
import { logUserIn } from '../../redux/auth/actions';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  updateFields,
  blurFields,
  stateCleanup,
} from '../../redux/login/actions.js';
import Fields from '../../components/Fields';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loginFormState = useSelector((state) => state.loginFormState);
  const authState = useSelector((state) => state.authState);

  //? state cleanup useEffect on first render.
  useEffect(() => {
    dispatch(stateCleanup());
  }, [dispatch]);

  //? login touch submit handler.
  const onSubmitHandler = () => {
    if (
      loginFormState.inputValidity.email &&
      loginFormState.inputValidity.password
    ) {
      console.log('All fields validated');
      dispatch(logUserIn(loginFormState.inputValues));
      // console.log("ok", authState)
      //* the log in and all the checks are now happening via redux thunk. All we have to do now is to redirect the user based on the state.
    } else {
      showMessage({
        message: 'Invalid inputs',
        description: 'Please check your inputs before proceeding',
        type: 'warning',
      });
    }
  };

  //? blur listener to set field isTouched state.
  const blurListener = (fieldId) => {
    dispatch(blurFields(fieldId));
  };

  //? validations
  const checkValidity = (val, fieldId) => {
    let isValid = true;
    if (fieldId === 'email' && !emailRegex.test(String(val).toLowerCase())) {
      isValid = false;
    }

    if (fieldId === 'password' && !passwordRegex.test(String(val))) {
      isValid = false;
    }
    dispatch(updateFields(val, fieldId, isValid));
  };

  return (
    <View style={styles.body}>
      <View style={styles.colorView}>
        <Text style={styles.titlefont}>{'Welcome \nback'}</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.contentView}>
          <View style={styles.inputView}>
            <Fields
              keyboardType="default"
              label="Email"
              error="Invalid email"
              value={loginFormState.inputValues.email}
              inputIsValid={loginFormState.inputValidity.email}
              inputIsTouched={loginFormState.isTouched.email}
              onChangeText={(val) => checkValidity(val, 'email')}
              onBlur={() => {
                blurListener('email');
              }}
            />

            <Fields
              keyboardType="default"
              label="Password"
              error="Invalid password"
              secureTextEntry={true}
              value={loginFormState.inputValues.password}
              inputIsValid={loginFormState.inputValidity.password}
              inputIsTouched={loginFormState.isTouched.password}
              onChangeText={(val) => checkValidity(val, 'password')}
              onBlur={() => {
                blurListener('password');
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.forgotTouch}
            onPress={() => navigation.navigate('FindAccount')}>
            <Text
              style={{
                color: colors.primary,
                fontFamily: 'Montserrat-Bold',
                fontSize: 18
              }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => onSubmitHandler()}>
              <Feather name="arrow-right" size={30} style={styles.icon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.registerTouch}
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.registerOuterText}>
              New user? <Text style={styles.register}>Register Now</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const { height } = Dimensions.get('screen');
const height_logo = height * 0.2;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.additional2,
  },
  colorView: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingTop: 100,
    paddingBottom: 60,
    justifyContent: 'center',
    flex: 1,
  },
  contentView: {
    paddingHorizontal: 20,
    backgroundColor: colors.additional2,
  },
  body: {
    flex: 1,
    backgroundColor: colors.green,
  },
  titlefont: {
    fontSize: 30,
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2,
    marginBottom: 20,
  },
  inputView: {
    paddingTop: 30,
  },
  input: {
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 100,
    backgroundColor: colors.accent,
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 30,
    color: 'black',
  },
  errMsg: {
    color: colors.primary,
  },
  forgotTouch: {},
  button: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  icon: {
    color: colors.additional2,
  },
  registerTouch: {
    alignItems: 'center',
    padding: 40,
  },
  registerOuterText: {
    color: colors.grayishblack,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
  },
  register: {
    color: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
  },
});

export default LoginScreen;
