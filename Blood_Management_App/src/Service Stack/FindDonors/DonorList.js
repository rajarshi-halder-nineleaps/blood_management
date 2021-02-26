import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../../constants/Colors';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather';
import { updateselected, selectall, submitinvite, invitesuccess } from '../../../redux/finddonors/actions';

const DonorList = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const authState = useSelector((state) => state.authState);
  const finddonorFormState = useSelector((state) => state.finddonorFormState);
  const [allselected, setallselected] = useState(false)
  const dispatch = useDispatch();
  const onValueChange = (item, index) => {
    dispatch(updateselected(item));
  };

  const submitHandler = () => {
    if (finddonorFormState.selectedids.length == 0) {
      Alert.alert(
        'Error',
        'Please select users before proceeding',
        [{ text: 'Okay' }],
      );
    } else {
      dispatch(submitinvite(authState.userToken, finddonorFormState.inputValues, finddonorFormState.selectedids));
      dispatch(invitesuccess(true))
    }

  }

  const Item = ({ item, onPress, style, index }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <CheckBox
          disabled={false}
          onAnimationType="fill"
          offAnimationType="fade"
          value={item.selected}
          onValueChange={() => onValueChange(item, index)}
        />
        <Text style={styles.title}> {item.userId}</Text>
        <Text style={styles.name}> {item.name} </Text>
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item, index }) => {
    const backgroundColor = item.id === selectedId ? '#f9c2ff' : 'white';

    return (
      <View>
        <Item
          item={item}
          index={index}
          onPress={() => setSelectedId(item.userId)}
          style={{ backgroundColor }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={finddonorFormState.success ? true : false}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Invite Sent!</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: colors.primary }}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('Services');
                dispatch(invitesuccess(false))
              }}>
              <Text style={styles.textStyle}>OK!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <View style={styles.header}></View>

      <View>
        <View style={styles.inputView}>
          <View style={styles.check}>
            <CheckBox
              tintColors={{ true: colors.primary, false: colors.accent }}
              disabled={false}
              value={allselected}
              onValueChange={(val) => {
                setallselected(!allselected ? true : false)
                dispatch(selectall(allselected ? false : true, finddonorFormState.list));
              }}
            />
            <Text style={styles.tncText}>Select All</Text>
          </View>
          <TouchableOpacity
            style={styles.invite}
            onPress={() => submitHandler()}>
            <Text style={styles.invitebutton}>Send Invites</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={finddonorFormState.list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={finddonorFormState.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    borderRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    backgroundColor: 'transparent',
    marginLeft: 10,
    color: colors.primary,
    fontFamily: 'Montserrat-Regular',
  },
  header: {
    marginBottom: 20,

    paddingHorizontal: 30,
    paddingTop: 10,
  },
  headertitle: {
    fontSize: 50,
    fontWeight: 'bold',
    backgroundColor: colors.primary,
    fontFamily: 'sans-serif-condensed',
    paddingTop: 10,
    color: 'white',
  },
  header2: {
    fontSize: 50,
    fontWeight: '500',
    marginBottom: 20,
    backgroundColor: colors.primary,
    fontFamily: 'sans-serif-condensed',
    color: 'white',
  },
  container: {
    flex: 1,
  },
  inputView: {
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  check: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  invite: {
    paddingHorizontal: 10,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
  },
  invitebutton: {
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
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
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  modalTextmore: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  name: {
    fontSize: 20,
    backgroundColor: 'transparent',
    marginLeft: 10,
    color: colors.coolblue,
    fontFamily: 'Montserrat-Regular',
  }
});

export default DonorList;
