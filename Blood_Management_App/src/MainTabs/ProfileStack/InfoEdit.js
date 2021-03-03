/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import colors from '../../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import Fields from '../../../components/Fields';
import {useSelector, useDispatch} from 'react-redux';
import {
  changeDetails,
  setDataSaved,
  removePhone,
} from '../../../redux/profile/actions';
import {Picker} from '@react-native-picker/picker';
import * as places from '../../../assets/places.json';
import {phoneRegex, pincodeRegex} from '../../../constants/Regexes';
import PhoneField from '../../../components/PhoneField';

const InfoEdit = ({navigation}) => {
  const word = places.states;

  const profileState = useSelector((state) => state.profileState);
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  let initialFormState = {
    inputValues: {
      address: profileState.profileData.address,
      district: profileState.profileData.district,
      state: profileState.profileData.state,
      pincode: profileState.profileData.pincode,
    },
    inputValidity: {
      address: true,
      district: true,
      state: true,
      pincode: true,
    },
    isTouched: {
      address: false,
      district: true,
      state: true,
      pincode: false,
    },
    finalFormState: true,
  };

  if (authState.userType === 1) {
    initialFormState.inputValues.phone = profileState.profileData.phone;
    initialFormState.inputValues.bloodGroup =
      profileState.profileData.bloodGroup;
    initialFormState.inputValidity.phone = true;
    initialFormState.inputValidity.bloodGroup = true;
    initialFormState.isTouched.phone = false;
    initialFormState.isTouched.bloodGroup = false;
  } else {
    initialFormState.inputValues.phone = [...profileState.profileData.phone];
    initialFormState.inputValidity.phone = [];
    initialFormState.isTouched.phone = [];
    for (var i = profileState.profileData.phone.length; i--; ) {
      initialFormState.inputValidity.phone.push(true);
    }
    for (var i = profileState.profileData.phone.length; i--; ) {
      initialFormState.isTouched.phone.push(false);
    }
  }

  const [formState, setFormState] = useState(initialFormState);

  const [stateindex, setstateindex] = useState(
    word.findIndex((val) => val.state === profileState.profileData.state),
  );

  const [distEnb, setdistEnb] = useState(true);

  useEffect(() => {
    dispatch(setDataSaved());
    if (profileState.dataSaved) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
      } else {
        AlertIOS.alert('Profile updated successfully!');
      }
      navigation.navigate('userInfo');
    }
  }, [dispatch, navigation, profileState.dataSaved]);

  //* for regular fields
  const blurListener = (fieldId) => {
    setFormState((prevState) => {
      const newFormState = {...prevState};
      newFormState.isTouched[fieldId] = true;
      return newFormState;
    });
  };
  const checkValidity = (val, fieldId) => {
    let isValid = true;

    if (fieldId.includes('phone') && !phoneRegex.test(String(val))) {
      isValid = false;
    }

    if (fieldId === 'address' && val.trim().length <= 0) {
      isValid = false;
    }

    if (fieldId === 'state' && val === 'Select state') {
      isValid = false;
      setdistEnb(false);
      setstateindex(0);
    }

    if (fieldId === 'district' && val === 'Select district') {
      isValid = false;
    }

    if (fieldId === 'pincode' && !pincodeRegex.test(String(val.trim()))) {
      isValid = false;
    }

    if (fieldId === 'bloodGroup' && val === '0') {
      isValid = false;
    }
    setFormState((prevState) => {
      const newInputValues = {...prevState.inputValues, [fieldId]: val};
      const newInputValidity = {...prevState.inputValidity, [fieldId]: isValid};

      return {
        ...prevState,
        inputValues: newInputValues,
        inputValidity: newInputValidity,
      };
    });
  };

  //* for non ind phone fields

  const phoneAdder = () => {
    if (formState.inputValues.phone.length < 5) {
      setFormState((prevState) => {
        const newFormState = {...prevState};
        newFormState.inputValues.phone = [...prevState.inputValues.phone, ''];
        newFormState.inputValidity.phone = [
          ...prevState.inputValidity.phone,
          false,
        ];
        newFormState.isTouched.phone = [...prevState.isTouched.phone, false];
        console.log(formState);

        return newFormState;
      });
    } else {
      Alert.alert(
        'Maximum limit reached',
        'You have added the maximum possible phone number fields.',
        [{text: 'Okay'}],
      );
    }
  };

  const phoneRemover = (idx) => {
    // const idx = formState.inputValues.phone.length - 1;
    if (formState.inputValues.phone.length > 1) {
      setFormState((prevState) => {
        const newFormState = {...prevState};
        newFormState.inputValues.phone.splice(idx, 1);
        newFormState.inputValidity.phone.splice(idx, 1);
        newFormState.isTouched.phone.splice(idx, 1);
        console.log(formState);

        return newFormState;
      });
    } else {
      Alert.alert(
        'Phone nummber required',
        'A minimum of 1 phone number is required.',
        [{text: 'Okay'}],
      );
    }
  };

  const phonesUpdateHandler = (val, idx) => {
    setFormState((prevState) => {
      const newValPhoneState = [...prevState.inputValues.phone];
      const newisValidPhoneState = [...prevState.inputValidity.phone];

      if (!phoneRegex.test(String(val.trim()))) {
        newisValidPhoneState[idx] = false;
      } else {
        newisValidPhoneState[idx] = true;
      }

      newValPhoneState[idx] = val;

      const newInputValidity = {
        ...prevState.inputValidity,
        phone: newisValidPhoneState,
      };

      let newFinalFormState = true;

      for (const key in newInputValidity.phone) {
        newFinalFormState = newFinalFormState && newInputValidity.phone[key];
      }

      for (const key in newInputValidity) {
        if (typeof newInputValidity[key] === 'object') {
          newFinalFormState = newFinalFormState && newInputValidity[key];
        }
      }

      return {
        ...prevState,
        inputValues: {...prevState.inputValues, phone: newValPhoneState},
        inputValidity: newInputValidity,
        finalFormState: newFinalFormState,
      };
    });
  };

  const phonesBlurHandler = (idx) => {
    setFormState((prevState) => {
      const newisTouchedPhoneState = [...prevState.isTouched.phone];
      newisTouchedPhoneState[idx] = true;
      return {
        ...prevState,
        isTouched: {...prevState.isTouched, phone: newisTouchedPhoneState},
      };
    });
  };

  const submitHandler = () => {
    let newFinalFormState = true;

    if (authState.userType !== 1) {
      for (const key in formState.inputValidity.phone) {
        newFinalFormState =
          newFinalFormState && formState.inputValidity.phone[key];
        setFormState((prevState) => {
          let newFormState = {...prevState};
          newFormState.isTouched.phone[key] = true;
          return newFormState;
        });
      }
    }
    for (const key in formState.inputValidity) {
      if (typeof formState.inputValidity[key] === 'boolean') {
        newFinalFormState = newFinalFormState && formState.inputValidity[key];
        setFormState((prevState) => {
          let newFormState = {...prevState};
          newFormState.isTouched[key] = true;
          return newFormState;
        });
      }
    }
    if (newFinalFormState) {
      dispatch(
        changeDetails(
          authState.userToken,
          authState.userType,
          formState.inputValues,
        ),
      );

      console.log(formState.inputValues);
    }
    // else {
    //   Alert.alert('Invalid Inputs', 'Please check all inputs before saving.');
    // }
  };

  return (
    <>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.fieldsView}>
            {authState.userType === 1 ? (
              <>
                <Fields
                  label="Phone"
                  error="Please enter a valid Phone number"
                  value={formState.inputValues.phone}
                  inputIsValid={formState.inputValidity.phone}
                  inputIsTouched={formState.isTouched.phone}
                  onChangeText={(val) => {
                    checkValidity(val, 'phone');
                  }}
                  onBlur={() => {
                    blurListener('phone');
                  }}
                />

                <Text style={styles.pickerLabel}>Blood Group</Text>
                <View style={styles.pickerView}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Feather name="chevron-down" />}
                    selectedValue={formState.inputValues.bloodGroup}
                    style={{
                      color: 'black',
                      borderBottomWidth: 0.5,
                    }}
                    onValueChange={(selectedVal) => {
                      checkValidity(selectedVal, 'bloodGroup');
                      blurListener('bloodGroup');
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
                {!formState.inputValidity.bloodgroup &&
                  formState.isTouched.bloodgroup && (
                    <Text style={styles.errorMsg}>
                      Please select your blood group
                    </Text>
                  )}
              </>
            ) : (
              <>
                {formState.inputValues.phone.map((val, idx) => {
                  return (
                    <PhoneField
                      label={'Phone #' + (idx + 1)}
                      key={idx}
                      idx={idx}
                      error="Invalid phone!"
                      returnKeyType="next"
                      phoneRemover={phoneRemover}
                      length={formState.inputValues.phone.length}
                      keyboardType="phone-pad"
                      value={val}
                      inputIsValid={formState.inputValidity.phone[idx]}
                      inputIsTouched={formState.isTouched.phone[idx]}
                      onChangeText={(newText) =>
                        phonesUpdateHandler(newText, idx)
                      }
                      onBlur={() => phonesBlurHandler(idx)}
                    />
                  );
                })}
                <View style={styles.phoneAddView}>
                  {formState.inputValues.phone.length < 5 ? (
                    <TouchableOpacity
                      style={styles.phoneAdd}
                      onPress={() => phoneAdder()}>
                      <Text style={styles.phoneAddText}>Add new Phone</Text>
                      <Feather
                        name="plus"
                        color={colors.additional2}
                        size={15}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </>
            )}
            <Fields
              label="Address"
              error="This field is required"
              numberOfLines={3}
              value={formState.inputValues.address}
              inputIsValid={formState.inputValidity.address}
              inputIsTouched={formState.isTouched.address}
              multiline={true}
              onChangeText={(val) => {
                checkValidity(val, 'address');
              }}
              onBlur={() => {
                blurListener('address');
              }}
            />

            <Text style={styles.pickerLabel}>State</Text>
            <View
              style={
                !formState.inputValidity.state && formState.isTouched.state
                  ? styles.pickerViewInvalid
                  : styles.pickerView
              }>
              <Picker
                style={styles.picker}
                iosIcon={<Feather name="chevron-down" />}
                selectedValue={formState.inputValues.state}
                onValueChange={(val, itemIndex) => {
                  blurListener('state');
                  checkValidity(val, 'state');
                  setdistEnb(true);
                  setstateindex(itemIndex);
                }}>
                {word.map((item, id) => (
                  <Picker.Item label={item.state} value={item.state} key={id} />
                ))}
              </Picker>
            </View>

            {!formState.inputValidity.state && formState.isTouched.state && (
              <Text style={styles.errorMsg}>Please select your state</Text>
            )}

            <Text style={styles.pickerLabel}>District</Text>
            <View
              style={
                !formState.inputValidity.district &&
                formState.isTouched.district
                  ? styles.pickerViewInvalid
                  : styles.pickerView
              }>
              <Picker
                style={styles.picker}
                enabled={distEnb}
                iosIcon={<Feather name="chevron-down" />}
                selectedValue={formState.inputValues.district}
                onValueChange={(val, itemIndex) => {
                  blurListener('district');
                  checkValidity(val, 'district');
                }}>
                {word[stateindex].districts.map((item, id) => (
                  <Picker.Item label={item} value={item} key={id} />
                ))}
              </Picker>
            </View>

            {!formState.inputValidity.district &&
              formState.isTouched.district && (
                <Text style={styles.errorMsg}>Please select your district</Text>
              )}

            <Fields
              label="Pin code"
              error="Please enter a valid pincode"
              value={formState.inputValues.pincode}
              inputIsValid={formState.inputValidity.pincode}
              inputIsTouched={formState.isTouched.pincode}
              onChangeText={(val) => {
                checkValidity(val, 'pincode');
              }}
              onBlur={() => {
                blurListener('pincode');
              }}
            />
          </View>

          {/* <TouchableOpacity
            style={styles.submitTouch}
            onPress={() => submitHandler()}>
            <Text style={styles.submitTouchText}>Save</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>

      <View style={styles.cancelTouchBoard}>
        <TouchableOpacity
          style={styles.editToggle}
          onPress={() => {
            navigation.navigate('userInfo');
          }}>
          <Feather name="x" color={colors.additional2} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.toggleTouchBoard}>
        <TouchableOpacity
          style={styles.editToggle}
          onPress={() => {
            submitHandler();
          }}>
          <Feather name="save" color={colors.additional2} size={20} />
        </TouchableOpacity>
      </View>
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
    paddingBottom: 50,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.additional2,
  },
  customHeader: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
  },
  customHeaderText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 24,
    color: colors.additional2,
  },
  customHeaderBack: {
    paddingHorizontal: 20,
  },
  fieldsView: {
    padding: 20,
  },
  toggleTouchBoard: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  cancelTouchBoard: {
    position: 'absolute',
    bottom: 20,
    right: 90,
    zIndex: 1,
  },
  editToggle: {
    zIndex: 1,
    backgroundColor: colors.grayishblack,
    width: 60,
    height: 60,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  labelText: {
    fontFamily: 'Montserrat-Regular',
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
    borderColor: colors.grayishblack,
    borderWidth: 2,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 30,
    color: 'black',
  },
  pickerViewInvalid: {
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderColor: colors.dutchred,
    borderWidth: 2,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 30,
    color: 'black',
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
  phoneAddView: {
    flexDirection: 'row',
  },
  phoneAdd: {
    flexDirection: 'row',
    backgroundColor: colors.grayishblack,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneAddText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2,
    marginRight: 5,
  },
});

export default InfoEdit;
