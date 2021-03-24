import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {buyit} from '../../../redux/buyblood/actions';
import {ScrollView} from 'react-native-gesture-handler';

const ConfirmBuy = ({route, navigation}) => {
  const {
    sellerId,
    blood_group,
    component,
    units,
    price,
    sellerDetails,
  } = route.params;
  const buybloodFormState = useSelector((state) => state.buybloodFormState);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const buysuccess = buybloodFormState.boughtit;
  const buyfailure = buybloodFormState.tryagain;
  const authState = useSelector((state) => state.authState);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal((+buybloodFormState.inputValues.req_units * price).toFixed(2));
  }, [buybloodFormState.inputValues.req_units, price]);
  //TODO CHECK WITH RAJARSHI IF DEPENDENCY ARRAY IS OK.
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        {buysuccess ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Purchase Confirmed!</Text>
                <Text style={styles.modalTextmore}>
                  Check the "My Purchasees" section under services for details.
                </Text>

                <TouchableHighlight
                  style={styles.openButton}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.navigate('Services');
                  }}>
                  <Text style={styles.textStyle}>Okay</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        ) : null}

        <View style={styles.header}>
          <View style={styles.imageBoard}>
            <Image
              source={require('../../../assets/images/logotransparentbkg.png')}
              style={styles.image}
              resizeMode="center"
            />
          </View>
          <Text style={styles.headerText}>
            Please check all the details shown below. If there is any mistake
            kindly go back and change it.
          </Text>
        </View>

        <View style={styles.infoBoard}>
          <View style={styles.infobox}>
            <View style={styles.inforow}>
              <View>
                <Text style={styles.texts}>Seller datails :</Text>
              </View>
              <View style={styles.infoRowView}>
                <Text style={styles.text}>{sellerDetails}</Text>
              </View>
            </View>

            <View style={styles.inforow}>
              <Text style={styles.texts}>Blood Group :</Text>
              <Text style={styles.text}>
                {buybloodFormState.inputValues.blood_group}
              </Text>
            </View>

            <View style={styles.inforow}>
              <Text style={styles.texts}>Component :</Text>
              <Text style={styles.text}>
                {buybloodFormState.inputValues.component}
              </Text>
            </View>

            <View style={styles.inforow}>
              <Text style={styles.texts}>Units required :</Text>
              <Text style={styles.text}>
                {buybloodFormState.inputValues.req_units}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <View style={styles.inforow}>
                <Text style={styles.texts}>Total Amount:</Text>
              </View>

              <View style={styles.inforow}>
                <Text style={styles.bill}>₹ {total}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    buyit(
                      sellerId,
                      blood_group,
                      component,
                      units,
                      authState.userToken,
                      buybloodFormState.inputValues.reasonOfPurchase,
                      buybloodFormState.inputValues.location,
                    ),
                  );
                  setModalVisible(!modalVisible);
                }}
                style={styles.invite}>
                <Text style={styles.invitebutton}>Confirm Purchase</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: colors.additional2,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.primary,
    textAlign: 'center',
  },
  imageBoard: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    height: 70,
    width: 80,
  },
  inforow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
  },
  texts: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: colors.grayishblack,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.grayishblack,
  },
  bill: {
    color: colors.primary,
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
  infoBoard: {
    marginTop: 30,
    width: '100%',
    padding: 20,
  },

  infoRowView: {
    // backgroundColor: colors.primary,
  },
  infobox: {
    padding: 30,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  invite: {
    marginTop: 30,
    paddingHorizontal: 15,
    backgroundColor: colors.grayishblack,
    paddingVertical: 10,
    borderRadius: 5,
  },
  invitebutton: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
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
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: colors.grayishblack,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  modalTextmore: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
    color: colors.grayishblack,
    fontFamily: 'Montserrat-Regular',
  },
});

export default ConfirmBuy;
