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
import {
  updateFields,
  blurFields,
  addPhoneState,
  phoneStateSet,
  phoneTouchSet,
  stateCleanup
} from '../../redux/register/actions';
import React, {useState, useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {emailRegex, passwordRegex, phoneRegex} from '../../constants/Regexes';
import colors from '../../constants/Colors';
import Input from '../../components/Input';
import * as places from '../../assets/places.json';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather';

//* IMPORTING THE AUTH CONTEXT FOR THE signUp FUNCTION.
import {AuthContext} from '../../components/context';

const RegisterHosScreen = ({navigation}) => {
  //* GETTING THE signUp FUNCTION USING useContext HOOK FROM AuthContext.
  const {signUp} = useContext(AuthContext);

  const [selectedState, setSelectedState] = useState('');
  const [selectedStateindex, setselectedStateindex] = useState(0);
  const [distEnb, setdistEnb] = useState(false);

  const [selectedDistrict, setSelectedDistrict] = useState('');
  const word = places.states;

  const dispatch = useDispatch();
  const regFormState = useSelector((state) => state.regFormState);

  //* cleans up the state on first render.
  useEffect(() => {
    dispatch(stateCleanup());
  }, []);

  const blurListener = (fieldId) => {
    dispatch(blurFields(fieldId));
  };
  const checkValidity = (val, fieldId) => {
    console.log(fieldId);
    let isValid = true;

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

    dispatch(updateFields(val, fieldId, isValid));
  };

  const phoneAdder = () => {
    if (regFormState.inputValues.phone.length < 5) {
      dispatch(addPhoneState());
    } else {
      Alert.alert(
        'Maximum limit reached',
        'You have added the maximum possible phone number fields.',
        [{text: 'Okay'}],
      );
    }
  };

  const sumbitHandler = () => {
    console.log(regFormState);
    console.log(regFormState.inputValidity);
    if (regFormState.finalFormState) {
      console.log('Registration Successful');
      //* HERE WE SEND DATA TO THE signUp FUNCTION.
      signUp(regFormState);
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
                    dispatch(phoneStateSet(newText, idx));
                  }}
                  onBlur={() => {
                    dispatch(phoneTouchSet(idx));
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
            <View style={styles.pickerView}>
              <Picker
                style={styles.picker}
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
  board: {},
  titleBoard: {
    padding: 30,
    marginBottom: 50,
    backgroundColor: colors.primary,
  },
  contentBoard: {
    paddingHorizontal: 30,
  },
  heading: {
    color: colors.additional2,
    fontSize: 40,
    fontFamily: 'sans-serif-light',
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
  addPhoneView: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20,
  },
  addPhoneTouch: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
  addPhoneText: {
    color: colors.additional2,
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
});

export default RegisterHosScreen;
