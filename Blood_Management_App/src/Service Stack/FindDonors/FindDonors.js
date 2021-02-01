import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux';


import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    SafeAreaView,
    Alert
} from 'react-native'
import {Picker} from '@react-native-picker/picker';
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



const FindDonors = ({navigation}) => {

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


    if (fieldId === 'selectedState' && val === 'Select state') {
      isValid = false;
      setdistEnb(false);
      setselectedStateindex(0);
    }

    if (fieldId === 'selectedDistrict' && val === 'Select district') {
      isValid = false;
    }

    if (fieldId === 'pincode' && val.trim().length !== 6) {
      isValid = false;
    }

    if (fieldId === 'blood_group' && val=== 'Select Blood group') {
      isValid = false;
    }


    dispatch(updateFields(val, fieldId, isValid));
  };


  const sumbitHandler = () => {
    console.log(finddonorFormState.inputValues)
    if (finddonorFormState.inputValidity.blood_group) {
      dispatch(getDonorList({...finddonorFormState.inputValues}));
      navigation.navigate("Donor List")
      // console.log('Registration Successful');
      //* now we can either edirect to hone screen or show errors (if any).
    } else {
      Alert.alert(
        'Invalid Input',
        'Please select Blood Group to continue',
        [{text: 'Okay'}],
      );
    }
  };



    return(
    <ScrollView style={styles.container}>
        <Text style={styles.header}>Find Donors</Text>
        <View style={{marginHorizontal:30}}>
        <View style={styles.pickerView}>
              <Picker
                style={styles.picker}
                selectedValue={finddonorFormState.inputValues.selectedState}
                onValueChange={(val, itemIndex) => {
                  blurListener('selectedState');
                  checkValidity(val, 'selectedState');
                  setdistEnb(true);
                  setselectedStateindex(itemIndex);
                }}>
                {word.map((item, id) => (
                  <Picker.Item label={item.state} value={item.state} key={id} />
                ))}
              </Picker>
            </View>

            {!finddonorFormState.inputValidity.selectedState &&
              finddonorFormState.isTouched.selectedState && (
                <Text style={styles.errorMsg}>Please select your state</Text>
              )}

            <View style={styles.pickerView}>
              <Picker
                enabled={distEnb}
                selectedValue={finddonorFormState.inputValues.selectedDistrict}
                onValueChange={(val, itemIndex) => {
                  blurListener('selectedDistrict');
                  checkValidity(val, 'selectedDistrict');
                }}>
                {word[selectedStateindex].districts.map((item, id) => (
                  <Picker.Item label={item} value={item} key={id} />
                ))}
              </Picker>
            </View>

            {!finddonorFormState.inputValidity.selectedDistrict &&
              finddonorFormState.isTouched.selectedDistrict && (
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
            <View style={styles.pickerView} >
                <Picker 
                style={styles.picker}
                selectedValue={finddonorFormState.inputValues.blood_group}
                onValueChange={(val, itemIndex) => {
                  blurListener('blood_group');
                  checkValidity(val, 'blood_group');
                }}>
                    <Picker.Item label = "Select Blood Group" value = "Select Blood Group"/>
                    <Picker.Item label = "A+" value = "A+"/>
                    <Picker.Item label = "A-" value = "A-"/>
                    <Picker.Item label = "B+" value = "B+"/>
                    <Picker.Item label = "B-" value = "B-"/>
                    <Picker.Item label = "O+" value = "O+"/>
                    <Picker.Item label = "O-" value = "O-"/>
                    <Picker.Item label = "AB+" value = "AB+"/>
                    <Picker.Item label = "AB-" value = "AB-"/>

                </Picker>
                </View>
                </View>

                <View style={styles.button}>
                <TouchableOpacity onPress={()=>{sumbitHandler()}}>
                  <Text style={styles.buttontext}>Find</Text>
                </TouchableOpacity>
                </View>
               
              
              
              
              
           
      




              
    </ScrollView>
    );
}

const styles= StyleSheet.create({
    container:{
        
        
        flex:1,
        
        
       

    },
    header:{
        fontSize:50,
        fontWeight:'bold',
        marginBottom:50,
        backgroundColor:colors.primary,
        fontFamily: 'sans-serif-condensed',
        paddingHorizontal:30,
        paddingVertical:30,
        color:'white'
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
        borderRadius:20
      },
      title: {
        fontSize: 25,
      },
      button:{
        backgroundColor:"#f9c2ff",
        alignSelf:'center',
        marginTop:20,

        
        borderRadius: 100,
        backgroundColor: colors.accent,
        fontSize: 18,
        fontFamily: 'sans-serif-condensed',
        paddingHorizontal: 30,
        color: 'black',
        paddingVertical:10
        
      },
      buttontext:{
        fontSize:20,
        fontWeight:'bold'
      }
})

export default FindDonors