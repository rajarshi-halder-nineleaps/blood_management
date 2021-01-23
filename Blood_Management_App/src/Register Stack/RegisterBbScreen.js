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
} from 'react-native';
import colors from '../../constants/Colors';
import Input from '../../components/Input';
import * as places from '../../assets/places.json';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather';

let phoneCount = 1;
const UPDATE_FIELDS_REG = 'UPDATE_FIELDS';
const BLUR_FIELDS_REG = 'BLUR_FIELDS';
const ADD_PHONE_STATE = 'ADD_PHONE_STATE';
const PHONE_STATE_SET = 'PHONE_STATE_SET';
const PHONE_TOUCH_SET = 'PHONE_TOUCH_SET';

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

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      //todo check every phone number in new final form state
      let newFinalFormState = true;
      
      for (const key in newInputValidity.phone) {
        console.log("new input validity: ", newInputValidity.phone[key])
        newFinalFormState = newFinalFormState && newInputValidity.phone[key];
      }

      for (const key in newInputValidity) {
        if(typeof(newInputValidity[key]) === "boolean"){
          newFinalFormState = newFinalFormState && newInputValidity[key]
        }
      }
      
      console.log(newFinalFormState);

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    case ADD_PHONE_STATE: {
      const newValPhoneState = [...state.inputValues.phone, ''];
      const newisValidPhoneState = [...state.inputValidity.phone, false];
      const newisTouchedPhoneState = [...state.isTouched.phone, false];
      return {
        ...state,
        inputValues: {...state.inputValues, phone: newValPhoneState},
        inputValidity: {...state.inputValidity, phone: newisValidPhoneState},
        isTouched: {...state.isTouched, phone: newisTouchedPhoneState},
      };
    }

    case PHONE_STATE_SET: {
      const newValPhoneState = [...state.inputValues.phone];
      const newisValidPhoneState = [...state.inputValidity.phone];
      const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

      if (!phoneRegex.test(String(action.val))) {
        newisValidPhoneState[action.idx] = false;
      } else {
        newisValidPhoneState[action.idx] = true;
      }

      newValPhoneState[action.idx] = action.val;

      const newInputValidity = {
        ...state.inputValidity,
        phone: newisValidPhoneState,
      };

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      //todo check every phone number in new final form state

      let newFinalFormState = true;


      for (const key in newInputValidity.phone) {
        console.log('new input validity: ', newInputValidity.phone[key]);
        newFinalFormState = newFinalFormState && newInputValidity.phone[key];
      }

      for (const key in newInputValidity) {
        if (typeof newInputValidity[key] === 'object') {
          newFinalFormState = newFinalFormState && newInputValidity[key];
        }
      }
      


      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      return {
        ...state,
        inputValues: {...state.inputValues, phone: newValPhoneState},
        inputValidity: newInputValidity,
        finalFormState: newFinalFormState,
      };
    }

    case PHONE_TOUCH_SET: {
      const newisTouchedPhoneState = [...state.isTouched.phone];
      newisTouchedPhoneState[action.idx] = true;
      return {
        ...state,
        isTouched: {...state.isTouched, phone: newisTouchedPhoneState},
      };
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

  const [regFormState, formDispatch] = useReducer(regReducer, {
    inputValues: {
      name: '',
      email: '',
      phone: [''],
      license: '',
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
      phone: [false],
      license: false,
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
      phone: [false],
      license: false,
      address: false,
      selectedState: false,
      district: false,
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
      console.log('phone clicked');
      isValid = false;
    }

    if (fieldId === 'license' && val.trim().length <= 0) {
      isValid = false;
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

  const phoneAdder = () => {
    if (regFormState.inputValues.phone.length < 5) {
      formDispatch({type: ADD_PHONE_STATE});
    } else {
      Alert.alert(
        'Maximum limit reached',
        'You have added the maximum possible phone number fields.',
        [{text: 'Okay'}],
      );
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //? SUBMIT HANDLER

  const sumbitHandler = () => {
    console.log(regFormState);
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" color="black" size={30} style={{}} />
        </TouchableOpacity>
      </View>
      <View style={styles.board}>
        <View style={styles.titleBoard}>
          <Text style={styles.heading}>Register: Blood bank</Text>
        </View>
        <Input
          label="Name of the institution"
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

        {regFormState.inputValues.phone.map((val, idx) => {
          return (
            <Input
              label={'Phone #' + (idx + 1)}
              key={idx}
              error="Invalid phone!"
              returnKeyType="next"
              keyboardType="phone-pad"
              value={val}
              inputIsValid={regFormState.inputValidity.phone[idx]}
              inputIsTouched={regFormState.isTouched.phone[idx]}
              onChangeText={(newText) => {
                formDispatch({type: PHONE_STATE_SET, val: newText, idx: idx});
              }}
              onBlur={() => {
                formDispatch({type: PHONE_TOUCH_SET, idx: idx});
              }}
            />
          );
        })}

        <View style={styles.addPhoneView}>
          <TouchableOpacity
            style={styles.addPhoneTouch}
            onPress={() => {
              phoneAdder();
            }}>
            <Feather name="plus" color="white" size={20} />
            <Text style={styles.addPhoneText}>Add new number</Text>
          </TouchableOpacity>
        </View>

        <Input
          label="Liscence Number"
          error="This field is required"
          returnKeyType="next"
          inputIsValid={regFormState.inputValidity.license}
          inputIsTouched={regFormState.isTouched.license}
          value={regFormState.inputValues.license}
          onChangeText={(val) => checkValidity(val, 'license')}
          onBlur={() => {
            blurListener('license');
          }}
        />
        <Input
          label="Registered Address"
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
        {!regFormState.inputValidity.selectedState &&
          regFormState.isTouched.selectedState && (
            <Text style={styles.errorMsg}>Please select your state</Text>
          )}
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
        {!regFormState.inputValidity.selectedDistrict &&
          regFormState.isTouched.selectedDistrict && (
            <Text style={styles.errorMsg}>Please select your district</Text>
          )}
        <Input
          label="Pin code"
          error="Please enter valid pincode"
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
          {!regFormState.inputValidity.tnc && regFormState.isTouched.tnc && (
            <Text>Please accept our terms and conditions.</Text>
          )}
        </View>
        <View style={styles.btnHolder}>
          <View style={styles.loginCircle}>
            <TouchableOpacity
              style={styles.loginPress}
              onPress={() => sumbitHandler()}>
              <Feather name="check" size={25} style={styles.icon} />
            </TouchableOpacity>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.additional2,
  },
  header: {
    flex: 0.1,
    padding: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  board: {
    paddingHorizontal: 30,
  },
  titleBoard: {
    marginBottom: 50,
  },
  heading: {
    color: colors.additional1,
    fontSize: 40,
    fontWeight: 'bold',
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
  errorMsg: {
    color: colors.primary,
    fontFamily: 'qs-reg',
  },
  loginPress: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: colors.additional1,
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
