/* eslint-disable prettier/prettier */
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
import Input from '../../../components/Input';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../constants/Colors';
import * as places from '../../../assets/places.json';
import {upcomingDrivesSearch} from '../../../redux/upcomingDrives/actions';
import {pincodeRegex} from '../../../constants/Regexes';

const UpcomingDrivesSearch = ({navigation}) => {
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
      pincode: true,
    },
    isTouched: {
      selectedState: false,
      selectedDistrict: true,
      pincode: false,
    },
  });

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);

  const searchSubmitHandler = () => {
    if (inputs.inputValidity.selectedState && inputs.inputValidity.pincode) {
      dispatch(upcomingDrivesSearch(authState.userToken, inputs.inputValues));
      navigation.navigate('upcomingDrives');
    } else if (!inputs.inputValidity.selectedState) {
      Alert.alert('State is required', 'Please enter a desired input state');
    } else if (!inputs.inputValidity.pincode) {
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

      if (
        fieldId === 'pincode' &&
        !(val.trim().length === 0 || pincodeRegex.test(String(val.trim())))
      ) {
        isValid = false;
      }

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

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.additional2,
  },
  scroll: {
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
});

export default UpcomingDrivesSearch;
