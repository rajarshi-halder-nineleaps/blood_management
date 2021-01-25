import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

const resetpassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [isValidpassword, setisValidP] = useState(true);
  const [isValidcpass, setisValidCP] = useState(true);

  const handlepassword = (val) => {
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
    if (reg.test(val) == true) {
      setPassword(val);
      setisValidP(true);
    } else {
      setPassword(val);
      setisValidP(false);
    }
  };

  const handlecpassword = (val) => {
    if (val == password) {
      setcPassword(val);
      setisValidCP(true);
    } else {
      setcPassword(val);
      setisValidCP(false);
    }
  };
  const handleSubmit = () => {
    if (password == '' && cpassword == '') {
      setisValidP(false);
      setisValidCP(false);
    } else {
      if (isValidpassword == true && isValidcpass == true) {
        navigation.navigate('LoginScreen');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" color="white" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.colorView}>
          <Text style={styles.titlefont}>Find Your Account</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.titlefontdesc}>Enter a new password</Text>

          <TextInput
            secureTextEntry={true}
            keyboardType="default"
            style={[styles.input, {marginTop: 30}]}
            placeholder="Password"
            onChangeText={(val) => handlepassword(val)}
          />

          {isValidpassword ? null : (
            <Text style={styles.errMsg}>Enter a Valid Password</Text>
          )}

          <TextInput
            secureTextEntry={true}
            keyboardType="default"
            style={[styles.input, {marginTop: 30}]}
            placeholder="Confirm Password"
            onChangeText={(val) => handlecpassword(val)}
          />
          {isValidcpass ? null : (
            <Text style={styles.errMsg}>Password doesn't match</Text>
          )}

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

export default resetpassword;
