import React from 'react';
import {StyleSheet, View, Text, Image, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

const slides = [
  {
    key: 1,
    title: 'User Types',
    text:
      'Avail our services as either an individual,a hospital or a blood bank',
    //todo make a vector for multi user, ive got a vision in my mind.
    image: require('../../assets/images/empty.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Find blood',
    text: 'Buy blood components or find donors near you in case of emergencies',
    image: require('../../assets/images/servicesScreen/findDonors.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Inventory Management',
    text:
      'If you are a hospital or blood bank and are looking for a way to manage your inventory hassle free, yoy have come to the right place.',
    image: require('../../assets/images/servicesScreen/inventory.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 4,
    title: 'Organize donation drives',
    text:
      'the community of donors at redBank is always ready for an opportunity to save lives. Give them the opportunity to do so by organizing donation drives from within the app.',
    image: require('../../assets/images/servicesScreen/drives.png'),
    backgroundColor: '#22bcb5',
  },
];

const IntroSlider = ({navigation}) => {
  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={[styles.buttonCircle, {width: 50}]}>
        <Feather
          name="chevron-right"
          size={35}
          style={styles.icon}
          color={colors.primary}
        />
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.loginText}>LOG IN</Text>
        {/* <Feather
          name="chevrons-right"
          size={35}
          style={styles.icon}
          color={colors.primary}
        /> */}
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={[styles.buttonCircle, {width: 50}]}>
        <Feather
          name="check"
          size={35}
          style={styles.icon}
          color={colors.primary}
        />
      </View>
    );
  };

  return (
    <>
      <StatusBar hidden />

      <AppIntroSlider
        data={slides}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderSkipButton={renderSkipButton}
        renderItem={renderItem}
        keyExtractor={(item) => item.key + ''}
        onDone={() => navigation.navigate('LoginScreen')}
        onSkip={() => navigation.navigate('LoginScreen')}
        showSkipButton={true}
        activeDotStyle={styles.activeDotStyle}
        dotStyle={styles.dotStyle}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonCircle: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    flexDirection: 'row',
  },
  slide: {
    backgroundColor: colors.additional2,
    flex: 1,
    alignItems: 'center',
    padding: 50,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 30,
    color: colors.primary,
    width: '100%',
    textAlign: 'center',
    padding: 30,
  },
  image: {
    width: 250,
    height: 200,
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontSize: 15,
    color: colors.grayishblack,
  },
  activeDotStyle: {
    backgroundColor: colors.primary,
    width: 20,
  },
  dotStyle: {
    backgroundColor: colors.accent,
    width: 10,
  },
  loginText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.primary,
    fontSize: 18,
  },
});

export default IntroSlider;
