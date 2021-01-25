import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from '../../constants/Colors';

const SplashScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{alignSelf: 'center', alignItems: 'center', paddingTop: 200}}>
        <View style={styles.profileImage}>
          <Image
            source={require('../../assets/logonobk.png')}
            style={styles.image}
            resizeMode="center"></Image>
        </View>

        <Text style={styles.text}>Red Bank</Text>
      </View>

      <View style={styles.button}>
        <TouchableOpacity
          style={styles.signIn}
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}>
          <Text style={[styles.textSign, {color: colors.primary}]}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.2;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  textSign: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  text: {
    color: colors.additional2,
    marginTop: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    width: WIDTH,
    borderTopEndRadius: 10,
  },
  signIn: {
    width: WIDTH - 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: colors.additional2,
    elevation: 5,
  },

  profileImage: {
    width: '100%',
    height: 100,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    flex: 1,
  },
});

export default SplashScreen;
