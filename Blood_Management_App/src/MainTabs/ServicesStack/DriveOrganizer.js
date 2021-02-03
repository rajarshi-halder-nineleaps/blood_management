/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as places from '../../../assets/places.json';
import colors from '../../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import Input from '../../../components/Input';
import AreYouSure from '../../../components/AreYouSure';
import {pincodeRegex} from '../../../constants/Regexes';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  updateFields,
  blurFields,
  stateCleanup,
} from '../../../redux/driveOrganizer/actions';
import {organizeDriveConfirm} from '../../../redux/driveOrganizer/actions';
import bloodGroupsList from '../../../constants/BloodGroupsList';

const DriveOrganizer = ({navigation}) => {
  const driveOrganizerState = useSelector((state) => state.driveOrganizerState);
  const dispatch = useDispatch();

  const word = places.states;

  const [selectedGroups, setSelectedGroups] = useState([]);

  const [selectedStateindex, setselectedStateindex] = useState(0);
  const [distEnb, setdistEnb] = useState(false);

  const [rusure, setRusure] = useState(false);
  ////////////////////////////////////////////////////////////////////////////

  //todo start date start time end date end time

  /////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    setSelectedGroups([]);
    dispatch(stateCleanup());
  }, [dispatch]);

  const itemClickHandler = (item) => {
    setSelectedGroups((prevState) => {
      let newBloodgroups = [];

      if (prevState.indexOf(item) !== -1) {
        newBloodgroups = prevState.filter((val) => val !== item);
      } else {
        newBloodgroups = [...prevState, item];
      }
      checkValidity(newBloodgroups, 'bloodgroup');
      return newBloodgroups;
    });
    console.log(selectedGroups);
  };

  const blurListener = (fieldId) => {
    dispatch(blurFields(fieldId));
  };

  const checkValidity = (val, fieldId) => {
    let isValid = true;

    if (fieldId === 'bloodgroup' && val.length === 0) {
      isValid = false;
      console.log(fieldId, isValid);
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
      console.log('pincode');
      isValid = false;
    }

    dispatch(updateFields(val, fieldId, isValid));
  };

  const submitHandler = () => {
    console.log(driveOrganizerState.inputValidity);
    if (driveOrganizerState.finalFormState) {
      //TODO DISPLAY A CONFIRMATION MODAL
      setRusure(true);
      console.log('starting request for new drive!');
    } else {
      Alert.alert(
        'Invalid Input',
        'Please check all the inputs before proceeding.',
        [{text: 'Okay'}],
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <AreYouSure
          visibleState={rusure}
          visibleStateChanger={setRusure}
          dispatchable={organizeDriveConfirm}
          dispatchData={driveOrganizerState.inputValues}
          message="Are you sure you wish to conduct this drive?"
        />
        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        {/* todo start data start time end date end time */}
        {/* //////////////////////////////////////////////////////////////////////////////////// */}

        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <View style={styles.holderView}>
          <Text style={styles.holderText}>Blood groups to invite</Text>
          <View style={styles.rowView}>
            {bloodGroupsList.map((val, idx) => (
              <View key={idx} style={styles.openBtnView}>
                <TouchableOpacity
                  style={
                    selectedGroups.indexOf(val) === -1
                      ? styles.groupTouch
                      : styles.groupTouchSelected
                  }
                  onPress={() => {
                    itemClickHandler(val);
                    blurListener('bloodgroup');
                  }}>
                  <Text style={{color: colors.additional2}}>{val}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {!driveOrganizerState.inputValidity.bloodgroup &&
          driveOrganizerState.isTouched.bloodgroup && (
            <Text style={styles.errorMsg}>
              Please select at least one blood group!
            </Text>
          )}
        <Input
          label="Address"
          error="Invalid address!"
          multiline={true}
          returnKeyType="next"
          keyboardType="default"
          inputIsValid={driveOrganizerState.inputValidity.address}
          inputIsTouched={driveOrganizerState.isTouched.address}
          value={driveOrganizerState.inputValues.address}
          onChangeText={(val) => checkValidity(val, 'address')}
          onBlur={() => {
            blurListener('address');
          }}
        />
        <View style={styles.pickerView}>
          <Picker
            selectedValue={driveOrganizerState.inputValues.selectedState}
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
        {!driveOrganizerState.inputValidity.selectedState &&
          driveOrganizerState.isTouched.selectedState && (
            <Text style={styles.errorMsg}>Please select your state</Text>
          )}
        <View style={styles.pickerView}>
          <Picker
            enabled={distEnb}
            selectedValue={driveOrganizerState.inputValues.selectedDistrict}
            onValueChange={(val, itemIndex) => {
              blurListener('selectedDistrict');
              checkValidity(val, 'selectedDistrict');
            }}>
            {word[selectedStateindex].districts.map((item, id) => (
              <Picker.Item label={item} value={item} key={id} />
            ))}
          </Picker>
        </View>
        {!driveOrganizerState.inputValidity.selectedDistrict &&
          driveOrganizerState.isTouched.selectedDistrict && (
            <Text style={styles.errorMsg}>Please select your district</Text>
          )}
        <Input
          label="Pin code"
          error="Invalid pin code!"
          returnKeyType="next"
          keyboardType="default"
          inputIsValid={driveOrganizerState.inputValidity.pincode}
          inputIsTouched={driveOrganizerState.isTouched.pincode}
          value={driveOrganizerState.inputValues.pincode}
          onChangeText={(val) => checkValidity(val, 'pincode')}
          onBlur={() => {
            blurListener('pincode');
          }}
        />
        <Input
          label="Message (Optional)"
          multiline={true}
          returnKeyType="next"
          keyboardType="default"
          inputIsValid={driveOrganizerState.inputValidity.message}
          inputIsTouched={driveOrganizerState.isTouched.message}
          value={driveOrganizerState.inputValues.message}
          onChangeText={(val) => checkValidity(val, 'message')}
          onBlur={() => {
            blurListener('message');
          }}
        />
        <TouchableOpacity
          style={styles.inviteTouch}
          onPress={() => submitHandler()}>
          <Text style={styles.inviteTouchText}>Invite donors</Text>
          <Feather name="chevrons-right" color={colors.additional2} size={20} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectedView: {
    marginTop: 10,
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 2,
    justifyContent: 'center',
  },
  groupTouch: {
    alignItems: 'center',
    backgroundColor: '#777',
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },

  groupTouchSelected: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  container: {
    padding: 30,
  },
  errorMsg: {
    color: colors.primary,
    fontFamily: 'qs-reg',
  },
  holderView: {
    width: '100%',
  },
  holderText: {
    fontSize: 16,
    paddingBottom: 20,
  },
  rowView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  openBtnView: {},
  inviteTouch: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    elevation: 5,
    borderRadius: 100,
    width: 180,
    height: 50,
  },
  inviteTouchText: {
    color: colors.additional2,
  },
});

export default DriveOrganizer;
