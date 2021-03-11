/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  ToastAndroid,
  Platform,
  AlertIOS,
  TextInput,
} from 'react-native';
import colors from '../constants/Colors';
import Fields from './Fields';
import {useSelector, useDispatch} from 'react-redux';

const AreYouSure = (props) => {
  const authState = useSelector((state) => state.authState);
  const inventoryState = useSelector((state) => state.inventoryState);
  const dispatch = useDispatch();

  const [passwordVal, setPasswordVal] = useState('');

  useEffect(() => {
    setPasswordVal('');
    if (inventoryState.secure) {
      props.visibleStateChanger(!props.visibleState);
      props.verified();
      if (Platform.OS === 'android') {
        ToastAndroid.show('Verified!', ToastAndroid.SHORT);
      } else {
        AlertIOS.alert('Verified!');
      }
    }
  }, [inventoryState.secure]);

  return (
    // <View style={styles.centeredView}>
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visibleState}
      onRequestClose={() => {}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            style={styles.image}
            source={require('../assets/logonobk.png')}
          />
          <Text style={styles.modalText}>
            For security reasons, we need to verify your identity. Please enter
            your password below.
          </Text>

          <TextInput
            style={
              inventoryState.passwordValidity
                ? styles.formInput
                : styles.formInputInvalid
            }
            placeholder="Password"
            value={passwordVal}
            onChangeText={(val) => {
              setPasswordVal(val);
            }}
            secureTextEntry={true}
          />
          {!inventoryState.passwordValidity && (
            <Text style={styles.errorMsg}>Invalid password!</Text>
          )}

          <View style={styles.touchBoard}>
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: colors.primary}}
              onPress={() => {
                dispatch(props.dispatchable(authState.userToken, passwordVal));
              }}>
              <Text style={styles.textStyle}>Confirm</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: colors.secondary,
              }}
              onPress={() => {
                setPasswordVal('');
                props.visibleStateChanger(!props.visibleState);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  image: {
    width: 100,
    height: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  touchBoard: {
    flexDirection: 'row',
    width: '100%',
  },
  openButton: {
    padding: 10,
    marginHorizontal: 20,
    width: 100,
    borderRadius: 5,
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    padding: 20,
  },
  labelText: {
    fontFamily: 'Montserrat-Regular',
    paddingBottom: 3, //* REMOVE THIS IF INTERFACE GETS MESSED UP
  },
  formInput: {
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderColor: colors.grayishblack,
    borderWidth: 2,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 15,
    color: 'black',
    marginBottom: 30,
  },
  formInputInvalid: {
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderColor: colors.dutchred,
    borderWidth: 2,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 15,
    color: 'black',
  },
  errorMsg: {
    color: colors.dutchred,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 30,
    padding: 5,
  },
});

export default AreYouSure;
