//TODO NOT ABLE TO STYLE THE PICKER FOR ICON COLOR AND FONT FAMILY

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
  Button
  
} from "react-native";
import colors from "../../constants/Colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from "../../components/Input";
import CheckBox from "@react-native-community/checkbox";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';
const RegisterIndScreen = ({navigation}) => {
  const [state, setState] = useState("Blood Group");
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.board}>
      <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Feather
                            name= "chevron-left"
                            color= 'black'
                            size= {30} 
                            style={{}}
                        />
                    </TouchableOpacity >
            </View>
        <View style={styles.titleBoard}>
          <Text style={styles.heading}>Register: Individual</Text>
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
<Button onPress={showDatepicker} title="Show date picker!" />
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

        <View>
          <View style={styles.inputView}></View>
            <Picker
              mode="dropdown"
              iosIcon={<Ionicons name="arrow-down" style={{ color: "red" }} />}
              selectedValue={state}
              style={{
                color: "white",
                fontFamily: "qs-reg",
                borderBottomWidth: 0.5,
              }}
              onValueChange={(selectedVal) => setState(selectedVal)}
            >
              <Picker.Item label="Blood Group" value="0" />
              <Picker.Item label="B+" value="b+" />
              <Picker.Item label="A+" value="a+" />
              <Picker.Item label="B-" value="b-" />
              <Picker.Item label="A-" value="a-" />
              <Picker.Item label="O+" value="o+" />
              <Picker.Item label="O-" value="o-" />
              <Picker.Item label="AB+" value="ab+" />
              <Picker.Item label="AB-" value="ab-" />
            </Picker>
          </View>
          <Text style={styles.errorMsg}>Please select your blood group</Text>
        </View>

        <Input
          label="Current Address"
          error="Invalid Address!"
          returnKeyType="next"
        />
        <Input
          label="Pin code"
          error="Invalid pin code!"
          returnKeyType="next"
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
    backgroundColor: colors.additional2,
    
  },
  header:{
    
    flex:0.1,
    padding: 10,
    backgroundColor:'transparent',
    flexDirection:'row',
    alignItems:'center'
},
  board: {
    paddingHorizontal: 30,
    
  },
  titleBoard: {
    marginBottom: 50,
  },
  heading: {
    color: colors.additional1,
    fontSize:40,
        fontWeight:'bold'
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
    width: "100%",
  },
  formInput: {
    color: colors.additional1,
    fontSize: 18,
    fontFamily: "qs-reg",
    width: "100%",
    height: "100",
    borderBottomWidth: 0.5,
    padding: 10,
    borderColor: colors.additional1,
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
    color: colors.additional1,
  },
  forgotPassword: {
    color: colors.grayishblack,
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
    color: colors.additional1,
  },
  signUpText: {
    color: colors.primary,
  },
  tncText: {
    color: colors.additional1,
    fontFamily: "qs-reg",
  },
  addPhoneView:{
    flex:1,
    flexDirection:'row'
  }
});

export default RegisterIndScreen;
