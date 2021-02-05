import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';


import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native'
import {Picker} from '@react-native-picker/picker';
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



const FindDonors = ({navigation}) => {

  const dispatch = useDispatch();
  const buybloodFormState = useSelector((state) => state.buybloodFormState);
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

    if (fieldId === 'blood_component' && val=== 'Select Blood Component ') {
      isValid = false;
    }

    if (fieldId === 'units' && val=== 0) {
      isValid = false;
    }




    dispatch(updateFields(val, fieldId, isValid));
  };


  const sumbitHandler = () => {
    console.log(buybloodFormState.inputValues)
    if (buybloodFormState.inputValidity.blood_group) {
      dispatch(getBuyBloodList({...buybloodFormState.inputValues}));
          navigation.navigate("Buy Blood List")
      
       
      
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
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" color="white" size={30} />
      </TouchableOpacity>
      <Text  style={styles.headertitle}>Buy Blood</Text>
      </View>
        
        <View style={{marginHorizontal:30}}>
        <View style={styles.pickerView}>
              <Picker
                style={styles.picker}
                selectedValue={buybloodFormState.inputValues.selectedState}
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

            {!buybloodFormState.inputValidity.selectedState &&
              buybloodFormState.isTouched.selectedState && (
                <Text style={styles.errorMsg}>Please select your state</Text>
              )}

            <View style={styles.pickerView}>
              <Picker
                enabled={distEnb}
                selectedValue={buybloodFormState.inputValues.selectedDistrict}
                onValueChange={(val, itemIndex) => {
                  blurListener('selectedDistrict');
                  checkValidity(val, 'selectedDistrict');
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
            <View style={styles.pickerView} >
                <Picker 
                style={styles.picker}
                selectedValue={buybloodFormState.inputValues.blood_group}
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
                <View style={styles.pickerView} >
                <Picker 
                style={styles.picker}
                selectedValue={buybloodFormState.inputValues.blood_component}
                onValueChange={(val, itemIndex) => {
                  blurListener('blood_component');
                  checkValidity(val, 'blood_component');
                }}>
                    <Picker.Item label = "Select Blood Component" value = "Select Blood Group"/>
                    <Picker.Item label = "Whole Blood" value = "Whole Blood"/>
                    <Picker.Item label = "Plasma" value = "Plasma"/>
                    <Picker.Item label = "Red Blood Cell" value = "Red Blood Cell"/>
                    <Picker.Item label = "White Blood Cell" value = "White Blood Cell"/>
                    <Picker.Item label = "Platelets" value = "Platelets"/>
                    
                </Picker>
                </View>
                <View style={styles.pickerView} >
                <Picker 
                style={styles.picker}
                selectedValue={buybloodFormState.inputValues.units}
                onValueChange={(val, itemIndex) => {
                  blurListener('units');
                  checkValidity(val, 'units');
                }}>
                    <Picker.Item label = "Select Units" value = {0} />
                    <Picker.Item label = "1" value = {1}/>
                    <Picker.Item label = "2" value = {2}/>
                    <Picker.Item label = "3" value = {3}/>
                    <Picker.Item label = "4" value = {4}/>
                    
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
        marginBottom:20,
        backgroundColor:colors.primary,
        paddingHorizontal:30,
        paddingTop:10,
        
    },
    headertitle:{
      fontSize:50,
        fontWeight:'bold',
        marginBottom:20,
        backgroundColor:colors.primary,
        fontFamily: 'sans-serif-condensed',      
        paddingTop:10,
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
      },
      backbutton:{
        backgroundColor: colors.primary
      },
      icon: {
        color: colors.additional2,
      },
})

export default FindDonors