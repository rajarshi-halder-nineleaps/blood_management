import React, {useState, useReducer, useEffect} from 'react';
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
  Alert,
  Platform,
} from 'react-native';
import colors from '../../constants/Colors';
import Input from '../../components/Input';
import * as places from '../../assets/places.json';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

let phoneCount = 0;
const UPDATE_FIELDS_REG = 'UPDATE_FIELDS';
const BLUR_FIELDS_REG = 'BLUR_FIELDS';

const regReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FIELDS_REG: {
      const newInputValue = {
        ...state.inputValues,
        [action.fieldId]: action.val,
      };
      const newInputValidity = {
        ...state.inputValidity,
        [action.fieldId]: action.isValid,
      };

      let newFinalFormState = true;
      for (const key in newInputValidity) {
        newFinalFormState = newFinalFormState && newInputValidity[key];
      }

      return {
        ...state,
        inputValues: newInputValue,
        inputValidity: newInputValidity,
        finalFormState: newFinalFormState,
      };
    }

    case BLUR_FIELDS_REG: {
      const newInputIsTouched = {...state.isTouched, [action.fieldId]: true};
      return {...state, isTouched: newInputIsTouched};
    }
    default:
      return state;
  }
};

const RegisterBbScreen = ({navigation}) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedStateindex, setselectedStateindex] = useState(0);
  const [distEnb, setdistEnb] = useState(false);

  const [selectedDistrict, setSelectedDistrict] = useState('');
  const word = places.states;

  //liscence

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    checkValidity(selectedDate, 'dob');
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const [regFormState, formDispatch] = useReducer(regReducer, {
    inputValues: {
      name: '',
      email: '',
      phone: '',
      dob: new Date(),
      bloodgroup: '',
      address: '',
      selectedState: '',
      selectedDistrict: '',
      pincode: '',
      password: '',
      cpassword: '',
      tnc: false,
    },
    inputValidity: {
      name: false,
      email: false,
      phone: false,
      dob: false,
      bloodgroup: false,
      address: false,
      selectedState: false,
      selectedDistrict: false,
      pincode: false,
      password: false,
      cpassword: false,
      tnc: false,
    },
    isTouched: {
      name: false,
      email: false,
      phone: false,
      dob: false,
      bloodgroup: false,
      address: false,
      selectedState: false,
      selectedDistrict: false,
      pincode: false,
      password: false,
      cpassword: false,
      tnc: false,
    },
    finalFormState: false,
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //? FUNCTION TO CHECK IF THE CURRENT FIELD IS TOUCHED OR NOT
  const blurListener = (fieldId) => {
    formDispatch({type: BLUR_FIELDS_REG, fieldId: fieldId});
  };
  //? FUNCTION TO CHECK VALIDITY.
  const checkValidity = (val, fieldId) => {
    console.log(fieldId);
    let isValid = true;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (fieldId === 'name' && val.trim().length < 3) {
      isValid = false;
    }

    if (fieldId === 'email' && !emailRegex.test(String(val).toLowerCase())) {
      isValid = false;
    }

    if (fieldId.includes('phone') && !phoneRegex.test(String(val))) {
      console.log('ok');
      isValid = false;
    }

    //todo check this
    if (fieldId === 'dob') {
      console.log(val);
      const age = new Date().getFullYear() - val.getFullYear();
      const m = new Date().getMonth() - val.getMonth();
      if (m < 0 || (m === 0 && new Date().getDate() < val.getDate())) {
        age--;
      }
      console.log(age);
      if (age < 18 || age > 65) {
        isValid = false;
      }
      console.log(isValid);
    }

    if (fieldId === 'address' && val.trim().length <= 0) {
      isValid = false;
    }

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

    if (fieldId === 'bloodgroup' && val === '0') {
      isValid = false;
    }

    if (fieldId === 'password' && !passwordRegex.test(String(val))) {
      isValid = false;
    }

    if (fieldId === 'cpassword' && val !== regFormState.inputValues.password) {
      isValid = false;
    }

    if (fieldId === 'tnc' && val === false) {
      isValid = false;
    }

    formDispatch({
      type: UPDATE_FIELDS_REG,
      val: val,
      fieldId: fieldId,
      isValid: isValid,
    });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //? SUBMIT HANDLER

  const sumbitHandler = () => {
    console.log(regFormState.finalFormState);
    console.log(regFormState.inputValidity);
    if (regFormState.finalFormState) {
      Alert.alert('Registration Successful', 'Success', [{text: 'Okay'}]);
    } else {
      Alert.alert(
        'Invalid Input',
        'Please check all the inputs before proceeding.',
        [{text: 'Okay'}],
      );
    }
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" color="white" size={30} style={{}} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.board}>
          <View style={styles.titleBoard}>
            <Text style={styles.heading}>Register</Text>
          </View>
          <View style={styles.contentBoard}>
            <Input
              label="Name"
              error="Invalid name!"
              returnKeyType="next"
              inputIsValid={regFormState.inputValidity.name}
              inputIsTouched={regFormState.isTouched.name}
              value={regFormState.inputValues.name}
              onChangeText={(val) => checkValidity(val, 'name')}
              onBlur={() => {
                blurListener('name');
              }}
            />

            <Input
              label="Email"
              error="Invalid email!"
              returnKeyType="next"
              keyboardType="email-address"
              inputIsValid={regFormState.inputValidity.email}
              inputIsTouched={regFormState.isTouched.email}
              value={regFormState.inputValues.email}
              onChangeText={(val) => checkValidity(val, 'email')}
              onBlur={() => {
                blurListener('email');
              }}
            />

            <Input
              label="Phone"
              error="Invalid phone!"
              returnKeyType="next"
              keyboardType="phone-pad"
              onChangeText={(val) => checkValidity(val, 'phone')}
              onBlur={() => {
                blurListener('phone');
              }}
              inputIsValid={regFormState.inputValidity.phone}
              inputIsTouched={regFormState.isTouched.phone}
              value={regFormState.inputValues.phone}
            />

            <TouchableOpacity
              onPress={showDatepicker}
              style={styles.pickerView}>
              <Text style={{fontSize: 18, fontFamily: 'sans-serif-condensed', paddingVertical: 15}}>
                Date of birth:   
                {regFormState.inputValues.dob.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {!regFormState.inputValidity.dob && regFormState.isTouched.dob && (
              <Text style={styles.errorMsg}>You are not of legal age</Text>
            )}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={regFormState.inputValues.dob}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}

            <View style={styles.pickerView}>
              <Picker
                mode="dropdown"
                iosIcon={<Feather name="arrow-down" style={{color: 'red'}} />}
                selectedValue={regFormState.inputValues.bloodgroup}
                style={{
                  color: 'black',
                  borderBottomWidth: 0.5,
                }}
                onValueChange={(selectedVal) => {
                  checkValidity(selectedVal, 'bloodgroup');
                  blurListener('bloodgroup');
                }}>
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
            {!regFormState.inputValidity.bloodgroup &&
              regFormState.isTouched.bloodgroup && (
                <Text style={styles.errorMsg}>
                  Please select your blood group
                </Text>
              )}

            <Input
              label="Current Address"
              error="This field is required"
              returnKeyType="next"
              error="Invalid Address!"
              inputIsValid={regFormState.inputValidity.address}
              inputIsTouched={regFormState.isTouched.address}
              value={regFormState.inputValues.address}
              onChangeText={(val) => checkValidity(val, 'address')}
              onBlur={() => {
                blurListener('address');
              }}
              returnKeyType="next"
            />

            <View style={styles.pickerView}>
              <Picker
                selectedValue={regFormState.inputValues.selectedState}
                onValueChange={(val, itemIndex) => {
                  blurListener('selectedState');
                  checkValidity(val, 'selectedState');
                  setdistEnb(true), setselectedStateindex(itemIndex);
                }}>
                {word.map((item, id) => (
                  <Picker.Item label={item.state} value={item.state} key={id} />
                ))}
              </Picker>
            </View>

            {!regFormState.inputValidity.selectedState &&
              regFormState.isTouched.selectedState && (
                <Text style={styles.errorMsg}>Please select your state</Text>
              )}

            <View style={styles.pickerView}>
              <Picker
                enabled={distEnb}
                selectedValue={regFormState.inputValues.selectedDistrict}
                onValueChange={(val, itemIndex) => {
                  blurListener('selectedDistrict');
                  checkValidity(val, 'selectedDistrict');
                }}>
                {word[selectedStateindex].districts.map((item, id) => (
                  <Picker.Item label={item} value={item} key={id} />
                ))}
              </Picker>
            </View>
            {!regFormState.inputValidity.selectedDistrict &&
              regFormState.isTouched.selectedDistrict && (
                <Text style={styles.errorMsg}>Please select your district</Text>
              )}

            <Input
              label="Pin code"
              error="Please enter valid pincode"
              keyboardType="number-pad"
              returnKeyType="next"
              inputIsValid={regFormState.inputValidity.pincode}
              inputIsTouched={regFormState.isTouched.pincode}
              inputIsTouched={regFormState.isTouched.pincode}
              value={regFormState.inputValues.pincode}
              onChangeText={(val) => checkValidity(val, 'pincode')}
              onBlur={() => {
                blurListener('pincode');
              }}
            />

            <Input
              secureTextEntry={true}
              label="Password"
              error="Please enter a stronger password"
              returnKeyType="next"
              inputIsValid={regFormState.inputValidity.password}
              inputIsTouched={regFormState.isTouched.password}
              value={regFormState.inputValues.password}
              onChangeText={(val) => checkValidity(val, 'password')}
              onBlur={() => {
                blurListener('password');
              }}
            />
            <Input
              secureTextEntry={true}
              label="Confirm Password"
              error="Password mismatch!"
              returnKeyType="next"
              inputIsValid={regFormState.inputValidity.cpassword}
              inputIsTouched={regFormState.isTouched.cpassword}
              value={regFormState.inputValues.cpassword}
              onChangeText={(val) => checkValidity(val, 'cpassword')}
              onBlur={() => {
                blurListener('cpassword');
              }}
            />

            <View>
              <View
                style={{
                  ...styles.inputView,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CheckBox
                  tintColors={{true: colors.primary, false: colors.accent}}
                  disabled={false}
                  value={regFormState.inputValues.tnc}
                  onValueChange={(val) => {
                    checkValidity(val, 'tnc');
                    blurListener('tnc');
                  }}
                />
                <Text style={styles.tncText}>Accept T&C</Text>
              </View>
              {!regFormState.inputValidity.tnc &&
                regFormState.isTouched.tnc && (
                  <Text style={styles.errorMsg}>
                    Please accept our terms and conditions.
                  </Text>
                )}
            </View>

            <View style={styles.btnHolder}>
              <View style={styles.loginCircle}>
                <TouchableOpacity
                  style={styles.loginPress}
                  onPress={() => {
                    sumbitHandler();
                  }}>
                  <Feather name="check" size={25} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.registerLinkView}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.registerLink}>
              Already have an account?
              <Text style={styles.signUpText}> LOG IN</Text>
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.additional2,
  },
  header: {
    padding: 20,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleBoard: {
    padding: 30,
    marginBottom: 50,
    backgroundColor: colors.primary,
  },
  heading: {
    color: colors.additional2,
    fontSize: 40,
    fontFamily: 'sans-serif-light',
  },
  contentBoard: {
    paddingHorizontal: 30,
  },
  btnHolder: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  loginCircle: {
    backgroundColor: colors.primary,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
  },
  inputView: {
    paddingVertical: 10,
    width: '100%',
  },
  formInput: {
    color: colors.additional1,
    fontSize: 18,
    fontFamily: 'qs-reg',
    width: '100%',
    height: '100',
    borderBottomWidth: 0.5,
    padding: 10,
    borderColor: colors.additional1,
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
  errorMsg: {
    color: colors.primary,
    fontFamily: 'qs-reg',
  },
  loginPress: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: colors.additional2,
  },
  forgotPassword: {
    color: colors.grayishblack,
    fontFamily: 'qs-reg',
  },
  registerLinkView: {
    paddingVertical: 30,
    marginTop: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  registerLink: {
    fontFamily: 'qs-reg',
    color: colors.additional1,
  },
  signUpText: {
    color: colors.primary,
  },
  tncText: {
    color: colors.additional1,
    fontFamily: 'qs-reg',
  },
  addPhoneView: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default RegisterBbScreen;
