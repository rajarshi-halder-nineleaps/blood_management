import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';


import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as places from '../../../assets/places.json';
import colors from '../../../constants/Colors'
import { getDonorList } from '../../../redux/finddonors/actions';
import {
  updateFields,
  stateCleanup,
  blurFields
} from '../../../redux/finddonors/actions';

import Input from '../../../components/Input';



const FindDonors = ({ navigation }) => {

  const dispatch = useDispatch();
  const finddonorFormState = useSelector((state) => state.finddonorFormState);
  const [selectedStateindex, setselectedStateindex] = useState(0);
  const [distEnb, setdistEnb] = useState(false);
  const word = places.states;





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


    dispatch(updateFields(val, fieldId, isValid));
  };


  const sumbitHandler = () => {
    console.log(finddonorFormState.inputValues)
    if (finddonorFormState.inputValidity.blood_group) {
      dispatch(getDonorList({ ...finddonorFormState.inputValues }));
      navigation.navigate("Donor List")

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
        <Text style={styles.headertitle}>Find Donors</Text>

      </View>

      <View style={{ marginHorizontal: 20 }}>
        <View style={styles.pickerView} >
          <Picker
            style={styles.picker}
            selectedValue={finddonorFormState.inputValues.blood_group}
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
        <View style={styles.pickerView}>
          <Picker
            style={styles.picker}
            selectedValue={finddonorFormState.inputValues.selectedState}
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

        {!finddonorFormState.inputValidity.state &&
          finddonorFormState.isTouched.state && (
            <Text style={styles.errorMsg}>Please select your state</Text>
          )}

        <View style={styles.pickerView}>
          <Picker
            enabled={distEnb}
            selectedValue={finddonorFormState.inputValues.district}
            onValueChange={(val, itemIndex) => {
              blurListener('selectedDistrict');
              checkValidity(val, 'selectedDistrict');
            }}>
            {word[selectedStateindex].districts.map((item, id) => (
              <Picker.Item label={item} value={item} key={id} />
            ))}
          </Picker>
        </View>

        {!finddonorFormState.inputValidity.district &&
          finddonorFormState.isTouched.district && (
            <Text style={styles.errorMsg}>Please select your district</Text>
          )}

        <Input
          label="Pincode"
          error="Invalid pincode!"
          returnKeyType="next"
          inputIsValid={finddonorFormState.inputValidity.pincode}
          inputIsTouched={finddonorFormState.isTouched.pincode}
          value={finddonorFormState.inputValues.pincode}
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
    color: colors.additional2
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
    backgroundColor: colors.additional2,
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 30,
    color: 'black',
  },
  picker: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',

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
  }
})

export default FindDonors