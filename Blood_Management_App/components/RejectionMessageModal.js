/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Image,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import colors from '../constants/Colors';
import Fields from './Fields';
import {useSelector, useDispatch} from 'react-redux';
// import { TextInput } from 'react-native-gesture-handler';

const RejectionMessageModal = (props) => {
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  const [rejectionMsg, setRejectionMsg] = useState('');

  return (
    // <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visibleState}
      onRequestClose={() => {}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            style={styles.image}
            source={require('../assets/logonobk.png')}
          />
          <Text style={styles.modalText}>{props.message}</Text>

          <TextInput
            placeholder="Rejection message (Optional)"
            returnKeyType="next"
            value={rejectionMsg}
            style={styles.formInput}
            multiline={true}
            numberOfLines={2}
            inputIsValid={true}
            inputIsTouched={true}
            onChangeText={(val) => {
              setRejectionMsg(val);
            }}
          />
          <View style={styles.touchBoard}>
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: colors.primary}}
              onPress={() => {
                props.dispatchData.rejectionMessage = rejectionMsg;
                if (Platform.OS === 'android') {
                  ToastAndroid.show('Invitation rejected!', ToastAndroid.SHORT);
                } else {
                  AlertIOS.alert('Invitation rejected!');
                }
                props.visibleStateChanger(!props.visibleState);
                dispatch(
                  props.dispatchable(
                    authState.userToken,
                    props.dispatchData ? props.dispatchData : null,
                  ),
                );
              }}>
              <Text style={styles.textStyle}>Reject</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: colors.secondary,
              }}
              onPress={() => {
                props.visibleStateChanger(!props.visibleState);
              }}>
              <Text style={styles.textStyle}>Back</Text>
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formInput: {
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderColor: colors.grayishblack,
    borderWidth: 2,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 15,
    color: 'black',
    marginBottom: 20,
  },
  touchBoard: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  openButton: {
    padding: 10,
    marginHorizontal: 10,
    width: 100,
    borderRadius: 5,
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    padding: 20,
  },
});

export default RejectionMessageModal;
