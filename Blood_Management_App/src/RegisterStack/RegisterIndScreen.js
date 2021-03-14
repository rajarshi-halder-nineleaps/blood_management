/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {
  updateFields,
  blurFields,
  stateCleanup,
} from '../../redux/registerInd/actions';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {SkypeIndicator, UIActivityIndicator} from 'react-native-indicators';
import {setUserVerified, sendOtp} from '../../redux/register/actions';
import colors from '../../constants/Colors';
import {requestLocationPermission} from '../../redux/geolocation/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  emailRegex,
  passwordRegex,
  phoneRegex,
  pincodeRegex,
} from '../../constants/Regexes';
import Fields from '../../components/Fields';
import * as places from '../../assets/places.json';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegisterBbScreen = ({navigation}) => {
  const [selectedStateindex, setselectedStateindex] = useState(0);
  const [distEnb, setdistEnb] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const word = places.states;
  let watchID;

  const dispatch = useDispatch();
  const regFormState = useSelector((state) => state.regIndFormState);
  const geolocationState = useSelector((state) => state.geolocationState);
  const otpState = useSelector((state) => state.regFormState);

  //* cleans up the state on first render.
  useEffect(() => {
    //* SETTING USER TYPE STATE TO FALSE ON FIRST RENDER.
    dispatch(setUserVerified(1));
    return () => dispatch(stateCleanup());
  }, [dispatch]);

  useEffect(() => {
    dispatch(updateFields(geolocationState.data.address, 'address', true));

    dispatch(
      updateFields(
        geolocationState.data.pincode,
        'pincode',
        pincodeRegex.test(String(geolocationState.data.pincode.trim())),
      ),
    );

    const stateIndex = word.findIndex((val) =>
      val.state.includes(geolocationState.data.state),
    );
    if (stateIndex <= 0) {
      setselectedStateindex(0);
      dispatch(
        updateFields(
          word[0].state,
          'selectedState',
          geolocationState.data.state !== '' ? true : false,
        ),
      );
    } else {
      setselectedStateindex(stateIndex);
      dispatch(
        updateFields(
          word[stateIndex].state,
          'selectedState',
          geolocationState.data.state !== '' ? true : false,
        ),
      );
    }
    setdistEnb(true);
    // dispatch(updateFields(geolocationState.data.state, 'selectedState', true));

    const districtIndex = word[stateIndex].districts.findIndex((val) =>
      val.includes(geolocationState.data.district),
    );

    if (districtIndex > 0) {
      dispatch(
        updateFields(
          word[stateIndex].districts[districtIndex],
          'selectedDistrict',
          geolocationState.data.district !== '' ? true : false,
        ),
      );
    } else {
      dispatch(
        updateFields(
          word[stateIndex].districts[0],
          'selectedDistrict',
          geolocationState.data.district !== '' ? true : false,
        ),
      );
    }
  }, [
    dispatch,
    geolocationState.data.address,
    geolocationState.data.district,
    geolocationState.data.pincode,
    geolocationState.data.state,
    word,
  ]);

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    checkValidity(selectedDate, 'dob');
    dispatch(blurFields('dob'));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  //? FUNCTION TO CHECK IF THE CURRENT FIELD IS TOUCHED OR NOT
  const blurListener = (fieldId) => {
    dispatch(blurFields(fieldId));
  };
  //? FUNCTION TO CHECK VALIDITY.
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
      console.log('ok');
      isValid = false;
    }

    if (fieldId === 'dob') {
      console.log(val);
      let age = new Date().getFullYear() - val.getFullYear();
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

    if (fieldId === 'pincode' && !pincodeRegex.test(String(val.trim()))) {
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
    dispatch(updateFields(val, fieldId, isValid));
  };

  //? SUBMIT HANDLER

  const sumbitHandler = () => {
    if (regFormState.finalFormState) {
      // dispatch(regUserUp({formData: regFormState.inputValues, userType: 1}));
      dispatch(
        sendOtp(regFormState.inputValues.email, () => {
          navigation.navigate('OtpScreen');
        }),
      );
    } else {
      showMessage({
        message: 'Invalid Inputs',
        description: 'Please check all the inputs before proceeding.',
        type: 'warning',
      });
    }
  };

  const getLocation = () => {
    dispatch(requestLocationPermission(watchID));
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" color="white" size={30} style={{}} />
        </TouchableOpacity>
      </View>
      {otpState.loading ? (
        <View style={styles.progressBoard}>
          <SkypeIndicator color={colors.primary} />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.board}>
            <View style={styles.titleBoard}>
              <Text style={styles.heading}>Register</Text>
            </View>
            <View style={styles.contentBoard}>
              <Fields
                label="Name*"
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

              <Fields
                label="Email*"
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

              {/* <Text style={styles.pickerLabel}>Date of birth*</Text> */}
              <TouchableOpacity
                onPress={showDatepicker}
                style={
                  !regFormState.inputValidity.dob && regFormState.isTouched.dob
                    ? styles.pickerViewInvalid
                    : styles.pickerView
                }>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 15,
                    paddingVertical: 18,
                    color: colors.grayishblack,
                  }}>
                  {'Date of birth*:   ' +
                    regFormState.inputValues.dob.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              {!regFormState.inputValidity.dob &&
                regFormState.isTouched.dob && (
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
              {/* <Text style={styles.pickerLabel}>Select blood group*</Text> */}

              <Fields
                label="Phone*"
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

              <View
                style={
                  !regFormState.inputValidity.bloodgroup &&
                  regFormState.inputValues.bloodgroup
                    ? styles.pickerViewInvalid
                    : styles.pickerView
                }>
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
                  <Picker.Item label="B+" value="B+" />
                  <Picker.Item label="A+" value="A+" />
                  <Picker.Item label="B-" value="B-" />
                  <Picker.Item label="A-" value="A-" />
                  <Picker.Item label="O+" value="O+" />
                  <Picker.Item label="O-" value="O-" />
                  <Picker.Item label="AB+" value="AB+" />
                  <Picker.Item label="AB-" value="AB-" />
                </Picker>
              </View>
              {!regFormState.inputValidity.bloodgroup &&
                regFormState.isTouched.bloodgroup && (
                  <Text style={styles.errorMsg}>
                    Please select your blood group
                  </Text>
                )}

              <TouchableOpacity
                style={styles.locationTouch}
                onPress={() => getLocation()}>
                {geolocationState.loading ? (
                  <UIActivityIndicator color={colors.additional2} size={25} />
                ) : (
                  <>
                    <MaterialIcons
                      name="gps-fixed"
                      color={colors.additional2}
                      size={25}
                    />
                    <Text style={styles.locationText}>
                      Use my current location
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <Fields
                label="Current Address*"
                error="This field is required"
                returnKeyType="next"
                multiline={true}
                numberOfLines={3}
                inputIsValid={regFormState.inputValidity.address}
                inputIsTouched={regFormState.isTouched.address}
                value={regFormState.inputValues.address}
                onChangeText={(val) => checkValidity(val, 'address')}
                onBlur={() => {
                  blurListener('address');
                }}
              />

              {/* <Text style={styles.pickerLabel}>State*</Text> */}
              <View
                style={
                  !regFormState.inputValidity.selectedState &&
                  regFormState.isTouched.selectedState
                    ? styles.pickerViewInvalid
                    : styles.pickerView
                }>
                <Picker
                  selectedValue={regFormState.inputValues.selectedState}
                  onValueChange={(val, itemIndex) => {
                    blurListener('selectedState');
                    checkValidity(val, 'selectedState');
                    setdistEnb(true), setselectedStateindex(itemIndex);
                  }}>
                  {word.map((item, id) => (
                    <Picker.Item
                      label={item.state}
                      value={item.state}
                      key={id}
                    />
                  ))}
                </Picker>
              </View>

              {!regFormState.inputValidity.selectedState &&
                regFormState.isTouched.selectedState && (
                  <Text style={styles.errorMsg}>Please select your state</Text>
                )}

              {/* <Text style={styles.pickerLabel}>District*</Text> */}

              <View
                style={
                  !regFormState.inputValidity.selectedDistrict &&
                  regFormState.isTouched.selectedDistrict
                    ? styles.pickerViewInvalid
                    : styles.pickerView
                }>
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
                  <Text style={styles.errorMsg}>
                    Please select your district
                  </Text>
                )}

              <Fields
                label="Pin code*"
                error="Please enter valid pincode"
                keyboardType="number-pad"
                returnKeyType="next"
                inputIsValid={regFormState.inputValidity.pincode}
                inputIsTouched={regFormState.isTouched.pincode}
                value={regFormState.inputValues.pincode}
                onChangeText={(val) => checkValidity(val, 'pincode')}
                onBlur={() => {
                  blurListener('pincode');
                }}
              />

              <Fields
                secureTextEntry={true}
                label="Password*"
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
              <Fields
                secureTextEntry={true}
                label="Confirm Password*"
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
                <View style={styles.inputView}>
                  <CheckBox
                    tintColors={{true: colors.primary, false: colors.accent}}
                    disabled={false}
                    value={regFormState.inputValues.tnc}
                    onValueChange={(val) => {
                      checkValidity(val, 'tnc');
                      blurListener('tnc');
                    }}
                  />
                  <Text style={styles.tncText}>
                    Accept Terms and Conditions.
                  </Text>
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  progressBoard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    fontFamily: 'Montserrat-Regular',
  },
  locationTouch: {
    backgroundColor: colors.grayishblack,
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    marginBottom: 10,
    marginTop: 20,
  },
  locationText: {
    color: colors.additional2,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    marginHorizontal: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
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
  pickerLabel: {
    color: colors.grayishblack,
    fontFamily: 'Montserrat-Regular',
    marginTop: 10,
    paddingBottom: 3,
  },
  pickerView: {
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderColor: colors.accent,
    borderWidth: 2,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 10,
    color: 'black',
    marginBottom: 10,
    marginTop: 10,
    paddingVertical: 3,
  },
  pickerViewInvalid: {
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderColor: colors.dutchred,
    borderWidth: 2,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 30,
    paddingVertical: 3,
  },
  picker: {
    color: colors.grayishblack,
    fontFamily: 'Montserrat-Regular',
  },
  errorMsg: {
    color: colors.dutchred,
    fontFamily: 'qs-reg',
    marginBottom: 10,
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
