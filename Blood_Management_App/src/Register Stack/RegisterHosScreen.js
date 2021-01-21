import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import colors from "../../constants/Colors";
import * as places from '../../assets/places.json'
import { Picker } from "@react-native-picker/picker";

import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from "../../components/Input";

import CheckBox from "@react-native-community/checkbox";

const RegisterHosScreen = (props) => {
  const [selectedState,setSelectedState]= useState("")
  const [selectedStateindex,setselectedStateindex] = useState(0)
  const [distEnb,setdistEnb] = useState(false)
  const [DistrictsArr,setDistrictsArr] = useState([])
  const [selectedDistrict,setSelectedDistrict]= useState("")
  const word = places.states;
  const dist = places.districts;
  const [state, setState] = useState("Blood Group");
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.board}>
        <View style={styles.titleBoard}>
          <Text style={styles.heading}>Register: Hospital/Clinic</Text>
        </View>
        <Input
          label="Name"
          error="Invalid name!"
          returnKeyType="next"
          keyboardType="default"
        />
        <Input
          label="Email"
          error="Invalid email!"
          returnKeyType="next"
          keyboardType="email-address"
        />

        <Input
          label="Phone"
          error="Invalid phone!"
          returnKeyType="next"
          keyboardType="phone-pad"
        />

        <View style={styles.addPhoneTouchBoard}>
          <TouchableOpacity style={styles.addPhoneTouch} onPress={() => {}}>
            <Text style={styles.addPhoneText}>Add another phone number</Text>
          </TouchableOpacity>
        </View>

        <Input
          label="License Number"
          error="This field is required"
          returnKeyType="next"
          keyboardType="default"
        />

        <Input
          label="Current Address"
          error="Invalid Address!"
          returnKeyType="next"
        />

        <Picker 
          selectedValue={selectedState}
          onValueChange={(modeValue,itemIndex) => {
            setSelectedState(modeValue),
            setdistEnb(true),
            setselectedStateindex(itemIndex)
                }}>
            <Picker.Item label="Select Value" value="0" />
            {word.map((item, id)=>(
            <Picker.Item label={item.state} value={item.state} key={id} />
            ))}
          </Picker>

          <Picker 
          enabled={distEnb}
          selectedValue={selectedDistrict}
          onValueChange={(modeValue,itemIndex) => setSelectedDistrict(modeValue)}>
            <Picker.Item label="Select Value" value="0" />
            {word[selectedStateindex-1].districts.map((item, id)=>(
            <Picker.Item label={item} value={item} key={id} />
            ))}
          </Picker>
        <Input
          label="Pin code"
          error="Invalid pin code!"
          returnKeyType="next"
          keyboardType="number-pad"
        />
        <Input
          label="Password"
          error="Invalid password!"
          returnKeyType="next"
        />
        <Input
          label="Confirm Password"
          error="Password mismatch!"
          returnKeyType="next"
        />

        <View>
          <View
            style={{
              ...styles.inputView,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CheckBox
              tintColors={{ true: colors.primary, false: colors.accent }}
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text style={styles.tncText}>Accept T&C</Text>
          </View>
        </View>

        <View style={styles.btnHolder}>
          <View style={styles.loginCircle}>
            <TouchableOpacity
              style={styles.loginPress}
              onPress={() => props.navigation.navigate("Main")}
            >
              <Ionicons
                name="arrow-forward-outline"
                size={25}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.registerLinkView}>
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate("Login")}
        >
          <Text style={styles.registerLink}>
            Already have an account?
            <Text style={styles.signUpText}> LOG IN</Text>
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayishblack,
    
  },
  board: {
    paddingHorizontal: 50,
    
  },
  titleBoard: {
    marginBottom: 100,
  },
  heading: {
    color: colors.additional2,
    fontSize: 60,
    fontFamily: "qs-reg",
  },
  btnHolder: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  loginCircle: {
    backgroundColor: colors.primary,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1000,
  },
  inputView: {
    paddingVertical: 10,
  },
  formInput: {
    color: colors.additional2,
    fontSize: 18,
    fontFamily: "qs-reg",
    borderBottomWidth: 0.5,
    padding: 10,
    borderColor: colors.additional2,
  },
  errorMsg: {
    color: colors.primary,
    fontFamily: "qs-reg",
  },
  loginPress: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: colors.additional2,
  },
  forgotPassword: {
    color: colors.accent,
    fontFamily: "qs-reg",
  },
  registerLinkView: {
    paddingVertical: 30,
    marginTop: "auto",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  registerLink: {
    fontFamily: "qs-reg",
    color: colors.additional2,
  },
  signUpText: {
          
       
    color: colors.primary,
  },
  tncText: {
    color: colors.additional2,
    fontFamily: "qs-reg",
  },
  addPhoneTouchBoard: {
    alignItems: "center",
    marginVertical: 10,
  },
  addPhoneTouch: {
    backgroundColor: colors.primary,
    width: "100%",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
  },
  addPhoneText: {
    color: colors.additional2,
    fontFamily: "qs-reg",
  }
})


export default RegisterHosScreen;
