import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

const RegisterSelectScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.board}>
        <View style={styles.titleBoard}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerTouch}>
              <Feather name="chevron-left" color="black" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.titleTextBoard}>
            <Text style={styles.heading}>You are ...</Text>
            <Text style={styles.info}>
              Please choose the type of user u wish to be registered as below:{' '}
            </Text>
          </View>
        </View>
        <View style={styles.touchBoard}>
          <View style={styles.touchHolder}>
            <TouchableOpacity
              style={styles.selectTouch}
              onPress={() => navigation.navigate('RegisterInd')}>
              <View style={styles.userTypeView}>
                <Text style={styles.userTypeText}>An Individual</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.touchHolder}>
            <TouchableOpacity
              style={styles.selectTouch}
              onPress={() => navigation.navigate('RegisterHos')}>
              <View style={styles.userTypeView}>
                <Text style={styles.userTypeText}>A Hospital or Clinic</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.touchHolder}>
            <TouchableOpacity
              style={styles.selectTouch}
              onPress={() => navigation.navigate('RegisterBb')}>
              <View style={styles.userTypeView}>
                <Text style={styles.userTypeText}>A Blood bank</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.additional2,
  },
  board: {
    flex: 1,
  },
  titleBoard: {
    marginBottom: 20,
  },
  header: {
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTextBoard: {
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  heading: {
    color: colors.additional1,
    fontSize: 40,
    fontFamily: 'sans-serif-light',
  },
  info: {
    color: colors.additional1,
    fontSize: 18,
    fontFamily: 'qs-light',
    marginVertical: 20,
    fontFamily: 'sans-serif-light',
  },
  touchBoard: {
    padding: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  touchHolder: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    elevation: 10,
    backgroundColor: 'transparent',
  },
  selectTouch: {
    backgroundColor: colors.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 100,
  },
  userTypeView: {
    backgroundColor: 'transparent',
  },
  userTypeText: {
    color: colors.additional2,
    fontFamily: 'qs-reg',
  },
});

export default RegisterSelectScreen;
