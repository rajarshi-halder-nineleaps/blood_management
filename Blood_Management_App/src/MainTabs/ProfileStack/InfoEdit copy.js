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
} from 'react-native';
import colors from '../../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import Fields from '../../../components/Fields';
import {useSelector, useDispatch} from 'react-redux';
import {getProfileData, setDonorStatus} from '../../../redux/profile/actions';
import {Picker} from '@react-native-picker/picker';
import * as places from '../../../assets/places.json';
import {phoneRegex, pincodeRegex} from '../../../constants/Regexes';

const InfoEdit = () => {
  const profileState = useSelector((state) => state.profileState);
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  let initialFormState = {
    inputValues: {
      address: profileState.profileData.address,
      selectedDistrict: profileState.profileData.dirstrict,
      selectedState: profileState.profileData.state,
      pincode: profileState.profileData.pincode,
    },
    inputValidity: {
      address: true,
      selectedDistrict: true,
      selectedState: true,
      pincode: true,
    },
    isTouched: {
      address: false,
      selectedDistrict: false,
      selectedState: false,
      pincode: false,
    },
    finalFormState: false,
  };

  if (authState.userType === 1) {
    initialFormState.inputValues.phone = profileState.profileData.phone;
    initialFormState.inputValues.bloodgroup =
      profileState.profileData.bloodgroup;
    initialFormState.inputValidity.phone = true;
    initialFormState.inputValidity.bloodgroup = true;
    initialFormState.isTouched.phone = false;
    initialFormState.isTouched.bloodgroup = false;
  } else {
    initialFormState.inputValues.phone = [...profileState.profileData.phone];
    initialFormState.inputValidity.phone = [false];
    initialFormState.isTouched.phone = [false];
    for (var i = profileState.profileData.phone.length; i--; ) {
      initialFormState.inputValidity.phone.push(true);
    }
    for (var i = profileState.profileData.phone.length; i--; ) {
      initialFormState.isTouched.phone.push(false);
    }
  }

  const [formState, setFormState] = useState(initialFormState);

  const [selectedStateindex, setselectedStateindex] = useState(0);
  const [distEnb, setdistEnb] = useState(false);
  const word = places.states;

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  //* for regular fields
  const blurListener = (fieldId) => {
    setFormState((prevState) => {
      const newFormState = {...prevState};
      newFormState.isTouched[fieldId] = true;
      return newFormState;
    });
  };
  const checkValidity = (val, fieldId) => {
    console.log(fieldId);
    let isValid = true;

    if (fieldId.includes('phone') && !phoneRegex.test(String(val))) {
      console.log('phone clicked');
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

    if (fieldId === 'pincode' && !pincodeRegex.test(String(val.trim()))) {
      isValid = false;
    }

    if (fieldId === 'bloodgroup' && val === '0') {
      isValid = false;
    }
    setFormState((prevState) => {
      const newInputValues = {...prevState.inputValues, [fieldId]: val};
      const newInputValidity = {...prevState.inputValidity, [fieldId]: isValid};

      let newFinalFormState = true;

      if (authState.userType !== 1) {
        for (const key in newInputValidity.phone) {
          newFinalFormState = newFinalFormState && newInputValidity.phone[key];
        }
      }
      for (const key in newInputValidity) {
        if (typeof newInputValidity[key] === 'boolean') {
          newFinalFormState = newFinalFormState && newInputValidity[key];
        }
      }

      return {
        ...prevState,
        inputValues: newInputValues,
        inputValidity: newInputValidity,
        finalFormState: newFinalFormState,
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

  const submitHandler = () => {};

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.fieldsView}>
          {authState.userType === 1 ? (
            <Fields
              label="Phone"
              error="Please enter a valid Phone number"
              value={formState.inputValues.phone}
              inputIsValid={formState.inputValidity.phone}
              inputIsTouched={formState.isTouched.phone}
            />
          ) : (
            <>
              {formState.inputValues.phone.map((val, idx) => {
                return (
                  <Fields
                    label={'Phone #' + (idx + 1)}
                    key={idx}
                    error="Invalid phone!"
                    returnKeyType="next"
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

              <TouchableOpacity
                style={styles.phoneAdd}
                onPress={() => phoneAdder()}>
                <Text>Add new Phone</Text>
              </TouchableOpacity>
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

          <View style={styles.pickerView}>
            <Picker
              style={styles.picker}
              selectedValue={formState.inputValues.selectedState}
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

          {!formState.inputValidity.selectedState &&
            formState.isTouched.selectedState && (
              <Text style={styles.errorMsg}>Please select your state</Text>
            )}

          <View style={styles.pickerView}>
            <Picker
              enabled={distEnb}
              selectedValue={formState.inputValues.selectedDistrict}
              onValueChange={(val, itemIndex) => {
                blurListener('selectedDistrict');
                checkValidity(val, 'selectedDistrict');
              }}>
              {word[selectedStateindex].districts.map((item, id) => (
                <Picker.Item label={item} value={item} key={id} />
              ))}
            </Picker>
          </View>

          {!formState.inputValidity.selectedDistrict &&
            formState.isTouched.selectedDistrict && (
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
        <View style={styles.touchView}>
          <TouchableOpacity
            style={styles.submitTouch}
            onPress={() => submitHandler()}>
            Save
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    paddingVertical: 20,
    backgroundColor: colors.additional2,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.additional2,
  },
  fieldsView: {
    padding: 20,
  },
});

export default InfoEdit;
