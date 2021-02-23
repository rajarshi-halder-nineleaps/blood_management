import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableHighlight
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../../constants/Colors'
import Feather from 'react-native-vector-icons/Feather';
import { buyit } from '../../../redux/buyblood/actions';

const ConfirmBuy = ({ route, navigation }) => {

  const { price } = route.params;
  const buybloodFormState = useSelector((state) => state.buybloodFormState);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch()
  const buysuccess = buybloodFormState.boughtit;
  const buyfailure = buybloodFormState.tryagain;

  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(price * buybloodFormState.inputValues.req_units)
  });
  return (
    <View style={styles.container}>
      {buysuccess ?
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>{ }
              <Text style={styles.modalText}>Purchase Confirmed!</Text>
              <Text style={styles.modalTextmore}> Check "My Purchases" for more info</Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: colors.primary }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate("Services")
                }}
              >
                <Text style={styles.textStyle}>OK!</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        :
        null

      }

      <View style={styles.header}>

      </View>



      <View style={styles.infobox}>
        <View style={styles.inforow}>
          <Text style={styles.texts}>Blood Group :</Text>
          <Text style={styles.text}>{buybloodFormState.inputValues.blood_group}</Text>
        </View>


        <View style={styles.inforow}>
          <Text style={styles.texts}>Components :</Text>
          <Text style={styles.text}>{buybloodFormState.inputValues.component}</Text>
        </View>

        <View style={styles.inforow}>
          <Text style={styles.texts}>Units Required :</Text>
          <Text style={styles.text}>{buybloodFormState.inputValues.req_units}</Text>
        </View>

      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
        <View style={styles.inforow}>
          <Text style={styles.texts}>Total Amount:</Text>
        </View>

        <View style={styles.inforow}>
          <Text style={styles.texts}>Rs {total}</Text>
        </View>
        <TouchableOpacity onPress={() => {
          dispatch(buyit(buybloodFormState.inputValues));
          setModalVisible(!modalVisible);
        }} style={styles.invite}>
          <Text style={styles.invitebutton}>
            Confirm Buy
            </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    borderRadius: 20
  },
  title: {
    fontSize: 18,

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
    color: 'white'
  },
  header2: {
    fontSize: 50,
    fontWeight: '500',
    marginBottom: 20,
    backgroundColor: colors.primary,
    fontFamily: 'sans-serif-condensed',
    color: 'white'


  },
  container: {
    flex: 1
  },
  inforow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
    alignContent: 'center'
  },
  texts: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 22,
    fontWeight: '500'
  },
  infobox: {
    marginHorizontal: 30,
    marginTop: 50
  },
  invite: {
    marginTop: 30,
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 10
  },
  invitebutton: {
    color: 'white'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 25,
    fontWeight: 'bold'
  },
  modalTextmore: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,

  }
})

export default ConfirmBuy