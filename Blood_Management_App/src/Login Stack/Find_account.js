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
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../../constants/Colors';

import Feather from 'react-native-vector-icons/Feather';

const findaccount = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setisValidEmail] = useState(true);

  const handleEmail = (val) => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

    if (reg.test(val) == true) {
      setEmail(val);
      setisValidEmail(true);
    } else {
      setEmail(val);
      setisValidEmail(false);
    }
  };

  const handleSubmit = () => {
    if (email == '') {
      setisValidEmail(false);
    } else {
      if (isValidEmail == true) {
        navigation.navigate('EnterOTP');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" color="white" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.colorView}>
            <Text style={styles.titlefont}>Find Your Account</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.titlefontdesc}>
              Help us find your Account by entering your Registered Email
            </Text>

            <TextInput
              keyboardType="email-address"
              style={[styles.input, {marginTop: 30}]}
              placeholder="Email"
              onChangeText={(val) => handleEmail(val)}
            />
            {isValidEmail ? null : (
              <Text style={styles.errMsg}>Invalid email!</Text>
            )}

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => handleSubmit()}>
                <Feather name="arrow-right" size={30} color="white" />
              </TouchableOpacity>
            </View>
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
    flex: 1,
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

export default findaccount;
