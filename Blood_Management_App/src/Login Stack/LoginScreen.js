//TODO make the app not look cheap ...

import React from 'react';
import {useState, useContext, useReducer} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../../components/context';
import colors from '../../constants/Colors';

const UPDATE_FIELDS = 'UPDATE_FIELDS';
const BLUR_FIELDS = 'BLUR_FIELDS';

const loginReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FIELDS: {
      const newInputValue = {
        ...state.inputValues,
        [action.fieldId]: action.val,
      };
      const newInputValidity = {
        ...state.inputValidity,
        [action.fieldId]: action.isValid,
      };
      return {
        ...state,
        inputValues: newInputValue,
        inputValidity: newInputValidity,
      };
    }

    case BLUR_FIELDS: {
      const newInputIsTouched = {...state.isTouched, [action.fieldId]: true};
      return {...state, isTouched: newInputIsTouched};
    }
    default:
      return state;
  }
};

const LoginScreen = ({navigation}) => {
  const {signIn} = useContext(AuthContext);

  const [data, formDispatch] = useReducer(loginReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidity: {
      email: false,
      password: false,
    },
    isTouched: {
      email: false,
      password: false,
    },
  });

  const onSubmitHandler = () => {
    if (data.inputValidity.email && data.inputValidity.password) {
      signIn(data.inputValues.email, data.inputValues.password);
    } else {
      Alert.alert(
        'Invalid Credentials',
        'Entered Email or Password is Incorrect',
        [{text: 'Okay'}],
      );
    }
  };

  const blurListener = (fieldId) => {
    formDispatch({type: BLUR_FIELDS, fieldId: fieldId});
  };

  //? FUNCTION TO CHECK VALIDITY.
  const checkValidity = (val, fieldId) => {
    let isValid = true;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
    if (fieldId === 'email' && !emailRegex.test(String(val).toLowerCase())) {
      isValid = false;
    }

    if (fieldId === 'password' && !passwordRegex.test(String(val))) {
      isValid = false;
    }

    formDispatch({
      type: UPDATE_FIELDS,
      val: val,
      fieldId: fieldId,
      isValid: isValid,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.colorView}>
          <Text style={styles.titlefont}>Login</Text>
        </View>
        <View style={styles.contentView}>
          <View style={styles.inputView}>
            <TextInput
              value={data.inputValues.email}
              keyboardType="email-address"
              style={styles.input}
              placeholder="Email"
              onChangeText={(val) => checkValidity(val, 'email')}
              onBlur={() => {
                blurListener('email');
              }}
            />
            {!data.inputValidity.email && data.isTouched.email && (
              <Text style={styles.errMsg}>Invalid email address!</Text>
            )}

            <TextInput
              value={data.inputValues.password}
              keyboardType="default"
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(val) => checkValidity(val, 'password')}
              onBlur={() => {
                blurListener('password');
              }}
            />
            {!data.inputValidity.password && data.isTouched.password && (
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
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
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
    justifyContent: "flex-end",
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
  icon: {
    color: colors.additional2,
  },
  registerTouch: {
    alignItems: 'center', 
    padding: 40
  },
  register: {
    color: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "sans-serif-light",
    fontSize: 18,
  },
});

export default LoginScreen;
