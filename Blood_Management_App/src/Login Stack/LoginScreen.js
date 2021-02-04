/* eslint-disable prettier/prettier */
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../constants/Colors';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {emailRegex, passwordRegex} from '../../constants/Regexes';
import {TextInput} from 'react-native-gesture-handler';
//* setting up the actions for auth.
import {logUserIn} from '../../redux/auth/actions';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  updateFields,
  blurFields,
  stateCleanup,
} from '../../redux/login/actions.js';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const loginFormState = useSelector((state) => state.loginFormState);
  const authState = useSelector((state) => state.authState);

  //? state cleanup useEffect on first render.
  useEffect(() => {
    dispatch(stateCleanup());
  }, []);

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
      Alert.alert(
        'Invalid inputs',
        'Please check your inputs before proceeding',
        [{text: 'Okay'}],
      );
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.colorView}>
            <Text style={styles.titlefont}>Login</Text>
          </View>

          <View style={styles.contentView}>
            <View style={styles.inputView}>
              <TextInput
                value={loginFormState.inputValues.email}
                keyboardType="email-address"
                style={styles.input}
                placeholder="Email"
                onChangeText={(val) => checkValidity(val, 'email')}
                onBlur={() => {
                  blurListener('email');
                }}
              />
              {!loginFormState.inputValidity.email &&
                loginFormState.isTouched.email && (
                  <Text style={styles.errMsg}>Invalid email address!</Text>
                )}

              <TextInput
                value={loginFormState.inputValues.password}
                keyboardType="default"
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(val) => checkValidity(val, 'password')}
                onBlur={() => {
                  blurListener('password');
                }}
              />
              {!loginFormState.inputValidity.password &&
                loginFormState.isTouched.password && (
                  <Text style={styles.errMsg}>Invalid password!</Text>
                )}
            </View>
            <TouchableOpacity
              style={styles.forgotTouch}
              onPress={() => navigation.navigate('FindAccount')}>
              <Text style={{color: colors.grayishblack}}>Forgot Password?</Text>
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
              <Text style={{fontSize: 18}}>
                New user? <Text style={styles.register}>Register Now</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.2;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.additional2,
  },
  colorView: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingBottom: 10,
    paddingTop: 80,
  },
  contentView: {
    paddingHorizontal: 40,
    flex: 1,
  },
  body: {
    flex: 1,
  },
  titlefont: {
    fontSize: 40,
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2,
    marginBottom: 20,
  },
  inputView: {
    paddingTop: 30,
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
  forgotTouch: {
    marginTop: 20,
  },
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
  register: {
    color: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif-light',
    fontSize: 18,
  },
});

export default LoginScreen;
