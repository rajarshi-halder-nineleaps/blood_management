import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import colors from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const checkFirstLaunch = useCallback(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      // if (value == null) {
      //   AsyncStorage.setItem('alreadyLaunched', JSON.stringify(true));
      navigation.navigate('IntroSlider');
      // } else {
      //   navigation.navigate('LoginScreen');
      // }
    });
  }, [navigation]);

  useEffect(() => {
    setTimeout(() => {
      checkFirstLaunch();
    }, 2000);
  }, [checkFirstLaunch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentBoard}>
        <Image
          source={require('../../assets/logonobk.png')}
          style={styles.image}
          resizeMode="center"
        />
        <Text style={styles.text}>Red Bank</Text>
      </View>
      <View style={styles.indicatorBoard}>
        <SkypeIndicator color={colors.additional2} />
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
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBoard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  text: {
    color: colors.additional2,
    marginTop: 30,
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
  },
  image: {
    width: 150,
    height: 150,
  },
  indicatorBoard: {
    width: 150,
    height: 150,
  },
});

export default SplashScreen;
