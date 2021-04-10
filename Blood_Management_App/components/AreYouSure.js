import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';
import colors from '../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';

const AreYouSure = (props) => {
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();

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
          <Text style={styles.modalText}>{props.message}</Text>

          <View style={styles.touchBoard}>
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: colors.primary}}
              onPress={() => {
                props.visibleStateChanger(!props.visibleState);
                dispatch(
                  props.dispatchable(
                    authState.userToken,
                    props.dispatchData ? props.dispatchData : null,
                  ),
                );
              }}>
              <Text style={styles.textStyle}>Yes</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: colors.secondary,
              }}
              onPress={() => {
                props.visibleStateChanger(!props.visibleState);
              }}>
              <Text style={styles.textStyle}>No</Text>
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
});

export default AreYouSure;
