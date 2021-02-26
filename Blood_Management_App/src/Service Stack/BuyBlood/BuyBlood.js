import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';


import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as places from '../../../assets/places.json';
import colors from '../../../constants/Colors'
import { getBuyBloodList } from '../../../redux/buyblood/actions';
import {
  updateFields,
  stateCleanup,
  blurFields
} from '../../../redux/buyblood/actions';

import Input from '../../../components/Input';



const FindDonors = ({ navigation }) => {

  const dispatch = useDispatch();
  const buybloodFormState = useSelector((state) => state.buybloodFormState);
  const [selectedStateindex, setselectedStateindex] = useState(0);
  const [distEnb, setdistEnb] = useState(false);
  const authState = useSelector((state) => state.authState)
  const word = places.states;


  useEffect(() => {
    dispatch(stateCleanup());
  }, [dispatch]);


  const blurListener = (fieldId) => {
    dispatch(blurFields(fieldId));
  };


  const checkValidity = (val, fieldId) => {
    console.log(fieldId);
    let isValid = true;


    if (fieldId === 'state' && val === 'Select state') {
      isValid = false;
      setdistEnb(false);
      setselectedStateindex(0);
    }

    if (fieldId === 'district' && val === 'Select district') {
      isValid = false;
    }

    if (fieldId === 'pincode' && val.trim().length !== 6) {
      isValid = false;
    }

    if (fieldId === 'blood_group' && val === 'Select Blood group') {
      isValid = false;
    }

    if (fieldId === 'component' && val === 'Select Blood Component ') {
      isValid = false;
    }

    if (fieldId === 'req_units' && val === 0) {
      isValid = false;
    }




    dispatch(updateFields(val, fieldId, isValid));
  };


  const sumbitHandler = () => {
    console.log(buybloodFormState.inputValues)
    if (buybloodFormState.inputValidity.blood_group) {
      if (buybloodFormState.inputValidity.component) {
        if (buybloodFormState.inputValidity.req_units) {
          dispatch(getBuyBloodList(buybloodFormState.inputValues, authState.userToken));
          navigation.navigate("Buy Blood List")
        } else {
          Alert.alert(
            'Invalid Input',
            'Please select Units to continue',
            [{ text: 'Okay' }],
          );
        }

      } else {
        Alert.alert(
          'Invalid Input',
          'Please select Blood Component to continue',
          [{ text: 'Okay' }],
        );
      }

    } else {
      Alert.alert(
        'Invalid Input',
        'Please select Blood Group to continue',
        [{ text: 'Okay' }],
      );
    }
  };



  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" color={colors.primary} size={30} />
        </TouchableOpacity>
        <Text style={styles.headertitle}>Buy Blood</Text>

      </View>

      <View style={{ marginHorizontal: 30 }}>
        <View style={styles.pickerView} >
          <Picker
            style={styles.picker}
            selectedValue={buybloodFormState.inputValues.blood_group}
            onValueChange={(val, itemIndex) => {
              blurListener('blood_group');
              checkValidity(val, 'blood_group');
            }}>
            <Picker.Item label="Select Blood Group" value="Select Blood Group" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />

          </Picker>
        </View>
        <View style={styles.pickerView} >
          <Picker
            style={styles.picker}
            selectedValue={buybloodFormState.inputValues.component}
            onValueChange={(val, itemIndex) => {
              blurListener('component');
              checkValidity(val, 'component');
            }}>
            <Picker.Item label="Select Blood Component" value="Select Blood Component" />
            <Picker.Item label="Blood" value="Blood" />
            <Picker.Item label="Plasma" value="Plasma" />
            <Picker.Item label="Platelet" value="Platelet" />

          </Picker>
        </View>
        <View style={styles.pickerView} >
          <Picker
            style={styles.picker}
            selectedValue={buybloodFormState.inputValues.req_units}
            onValueChange={(val, itemIndex) => {
              blurListener('req_units');
              checkValidity(val, 'req_units');
            }}>
            <Picker.Item label="Select Units" value={0} />

            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />

          </Picker>
        </View>

        <View style={styles.pickerView}>
          <Picker
            style={styles.picker}
            selectedValue={buybloodFormState.inputValues.state}
            onValueChange={(val, itemIndex) => {
              blurListener('state');
              checkValidity(val, 'state');
              setdistEnb(true);
              setselectedStateindex(itemIndex);
            }}>
            {word.map((item, id) => (
              <Picker.Item label={item.state} value={item.state} key={id} />
            ))}
          </Picker>
        </View>

        {!buybloodFormState.inputValidity.selectedState &&
          buybloodFormState.isTouched.selectedState && (
            <Text style={styles.errorMsg}>Please select your state</Text>
          )}

        <View style={styles.pickerView}>
          <Picker
            enabled={distEnb}
            selectedValue={buybloodFormState.inputValues.district}
            onValueChange={(val, itemIndex) => {
              blurListener('district');
              checkValidity(val, 'district');
            }}>
            {word[selectedStateindex].districts.map((item, id) => (
              <Picker.Item label={item} value={item} key={id} />
            ))}
          </Picker>
        </View>

        {!buybloodFormState.inputValidity.selectedDistrict &&
          buybloodFormState.isTouched.selectedDistrict && (
            <Text style={styles.errorMsg}>Please select your district</Text>
          )}

        <Input
          label="Pincode"
          error="Invalid pincode!"
          returnKeyType="next"
          inputIsValid={buybloodFormState.inputValidity.pincode}
          inputIsTouched={buybloodFormState.isTouched.pincode}
          value={buybloodFormState.inputValues.pincode}
          onChangeText={(val) => checkValidity(val, 'pincode')}
          onBlur={() => {
            blurListener('pincode');
          }}
        />
      </View>

      <View style={styles.button}>
        <TouchableOpacity onPress={() => { sumbitHandler() }}>
          <Text style={styles.buttontext}>Find</Text>
        </TouchableOpacity>
      </View>












    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {


    flex: 1,




  },
  header: {
    marginBottom: 20,
    backgroundColor: 'transparent',
    paddingTop: 10,
    flexDirection: 'row'

  },
  headertitle: {
    fontSize: 50,
    backgroundColor: 'transparent',
    marginLeft: 10,
    color: colors.primary,
    fontFamily: 'Montserrat-Regular',
  },
  pickerView: {
    marginVertical: 10,
    paddingVertical: 3,
    borderRadius: 100,
    backgroundColor: colors.accent,
    fontSize: 18,
    fontFamily: 'sans-serif-condensed',
    paddingHorizontal: 30,
    color: 'black',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20
  },
  title: {
    fontSize: 25,
  },
  button: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 100,
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 30,
    color: colors.additional2,
    paddingVertical: 10
  },
  buttontext: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2,
  },
  backbutton: {
    backgroundColor: colors.primary
  },
  icon: {
    color: colors.additional2,
  },
})

export default FindDonors