//* only those drives will be shown to user that matches his/her blood group.

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {Header} from '@react-navigation/stack';
import Input from '../../../components/Input';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../constants/Colors';
import * as places from '../../../assets/places.json';
import {
  upcomingDrivesSearch,
  registerUserForDrive,
} from '../../../redux/upcomingDrives/actions';
import {pincodeRegex} from '../../../constants/Regexes';

const UpcomingDrives = ({navigation}) => {
  const authState = useSelector((state) => state.authState);
  const upcomingDrivesState = useSelector((state) => state.upcomingDrivesState);
  const dispatch = useDispatch();

  //? Input state management and validation.
  const word = places.states;
  const [selectedStateindex, setselectedStateindex] = useState(0);
  const [distEnb, setdistEnb] = useState(false);
  const [inputs, setInputs] = useState({
    inputValues: {
      selectedState: '',
      selectedDistrict: '',
      pincode: '',
    },
    inputValidity: {
      selectedState: false,
      selectedDistrict: true,
      pincode: false,
    },
    isTouched: {
      selectedState: false,
      pincode: false,
    },
  });

  //? here, we disptach the asynchronous action creator

  const searchSubmitHandler = () => {
    if (inputs.inputValidity.selectedState && inputs.inputValidity.pincode) {
      dispatch(upcomingDrivesSearch(authState.userToken, inputs.inputValues));
    } else if (!inputs.inputValidity.selectedState) {
      Alert.alert('State is required', 'Please enter a desired input state');
    } else if (!inputs.inputValidity.selectedState) {
      Alert.alert(
        'Invalid pincode',
        'Please enter a valid pincode or leave the field empty',
      );
    }
  };

  const blurListener = (fieldId) => {
    setInputs((prevState) => {
      const newIsTouched = {
        ...prevState.isTouched,
        [fieldId]: true,
      };
      return {...prevState, isTouched: newIsTouched};
    });
  };

  const checkValidity = (val, fieldId) => {
    setInputs((prevState) => {
      let isValid = true;
      const newInputValues = {
        ...prevState.inputValues,
        [fieldId]: val,
      };
      //TODO CHECK THE PINCODE VALIDATION.
      // if (
      //   fieldId === 'pincode' &&
      //   !(pincodeRegex.test(String(val.trim())) || val.trim().length === 0)
      // ) {
      //   isValid = false;
      // }

      if (fieldId === 'selectedState' && val === 'Select state') {
        isValid = false;
        setdistEnb(false);
        setselectedStateindex(0);
      }
      const newInputValidity = {...prevState.inputValidity, [fieldId]: isValid};

      return {
        ...prevState,
        inputValues: newInputValues,
        inputValidity: newInputValidity,
      };
    });
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.touchboard}>
        <View style={styles.touch}>
          <View style={styles.labelBoard}>
            <Text style={styles.label}>
              Drive ID :<Text style={styles.content}>{item.driveId}</Text>
            </Text>
            <Text style={styles.label}>
              Start :
              <Text style={styles.content}>
                {item.startDate} at {item.startTime}
              </Text>
            </Text>
            <Text style={styles.label}>
              End:
              <Text style={styles.content}>
                {item.endDate} at {item.endTime}
              </Text>
            </Text>
            <Text style={styles.label}>
              Address: <Text style={styles.content}>{item.address}</Text>
            </Text>
            <Text style={styles.label}>
              District: <Text style={styles.content}>{item.district}</Text>
            </Text>
            <Text style={styles.label}>
              State: <Text style={styles.content}>{item.state}</Text>
            </Text>
            <Text style={styles.label}>
              Pincode: <Text style={styles.content}>{item.pincode}</Text>
            </Text>
            <Text style={styles.label}>
              Blood groups invited:
              <Text style={styles.content}>{item.bloodGroupsInvited}</Text>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.donorListTouch}
            onPress={() => {
              console.log(
                'initiated user registration for drive',
                item.driveId,
              );
              dispatch(registerUserForDrive(authState.userToken, item.driveId));
            }}>
            <Text style={styles.touchText}>Register for this drive</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const searchBoard = () => {
    return (
      <View style={styles.searchBoard}>
        <View style={styles.imageBoard}>
          <Image
            source={require('../../../assets/images/findDrives.png')}
            style={styles.image}
            resizeMode="center"
          />
          <Text style={{color: colors.primary}}>
            Please input your desired search filters below
          </Text>
        </View>
        <View style={styles.pickerView}>
          <Picker
            style={styles.picker}
            selectedValue={inputs.inputValues.selectedState}
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

        {!inputs.inputValidity.selectedState &&
          inputs.isTouched.selectedState && (
            <Text style={styles.errorMsg}>Please select a state</Text>
          )}

        <View style={styles.pickerView}>
          <Picker
            enabled={distEnb}
            selectedValue={inputs.inputValues.selectedDistrict}
            onValueChange={(val, itemIndex) => {
              checkValidity(val, 'selectedDistrict');
            }}>
            {word[selectedStateindex].districts.map((item, id) => (
              <Picker.Item label={item} value={item} key={id} />
            ))}
          </Picker>
        </View>
        <Input
          label="Pin code"
          error="Please enter valid pincode or leave the field empty"
          returnKeyType="next"
          keyboardType="number-pad"
          inputIsValid={inputs.inputValidity.pincode}
          inputIsTouched={inputs.isTouched.pincode}
          value={inputs.inputValues.pincode}
          onChangeText={(val) => checkValidity(val, 'pincode')}
          onBlur={() => {
            blurListener('pincode');
          }}
        />
        <View style={styles.touchBoard}>
          <TouchableOpacity
            style={styles.finderTouch}
            onPress={() => searchSubmitHandler()}>
            <Feather name="search" color={colors.additional2} size={20} />
            <Text style={styles.finderTouchText}>Find donation drives</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const wowSuchEmpty = () => {
    return upcomingDrivesState.gotData &&
      upcomingDrivesState.upcomingDrivesList.length === 0 ? (
      <View style={styles.suchEmpty}>
        <Image
          style={styles.suchEmptyImg}
          source={require('../../../assets/images/empty.png')}
        />
        <Text style={styles.emptyInfo}>
          No drives found with your specified search filters! Try again.
        </Text>
      </View>
    ) : null;
  };

  return (
    <View style={styles.conatiner}>
      {upcomingDrivesState.loading ? (
        <ActivityIndicator
          visible={upcomingDrivesState.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          animating={true}
          color={colors.primary}
          size="large"
        />
      ) : (
        <View style={styles.scroll}>
          <FlatList
            style={styles.scroll}
            data={upcomingDrivesState.upcomingDrivesList}
            renderItem={renderItem}
            keyExtractor={(item) => item.driveId}
            ListHeaderComponent={() => searchBoard()}
            ListFooterComponent={() => wowSuchEmpty()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    height: '100%',
    paddingHorizontal: 20,
    backgroundColor: colors.additional2,
  },
  imageBoard: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    height: 150,
    width: 150,
  },
  searchBoard: {
    paddingVertical: 20,
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
  picker: {
    fontFamily: 'sans-serif-condensed',
  },
  touchBoard: {
    borderRadius: 100,
    marginTop: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finderTouch: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    elevation: 5,
    borderRadius: 100,
    width: 200,
    height: 50,
  },
  finderTouchText: {
    color: colors.additional2,
  },
  errorMsg: {
    color: colors.primary,
    fontFamily: 'qs-reg',
  },
  suchEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    backgroundColor: colors.additional2,
  },
  suchEmptyImg: {
    height: 150,
    width: 150,
  },
  emptyInfo: {
    color: colors.primary,
    fontSize: 10,
  },

  touchboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  touch: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.additional2,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  label: {
    padding: 2,
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
  },
  content: {
    color: colors.additional1,
  },
  donorListTouch: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
  },
  touchText: {
    color: colors.additional2,
    fontFamily: 'sans-serif-light',
  },
});

export default UpcomingDrives;
