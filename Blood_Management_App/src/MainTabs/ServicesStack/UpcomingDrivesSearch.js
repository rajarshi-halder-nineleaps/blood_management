/* eslint-disable prettier/prettier */
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
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
      selectedState: 'All',
      selectedDistrict: 'All',
      pincode: '',
    },
    inputValidity: {
      selectedState: true, //?set to false if needed to make it mandatory
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
      navigation.navigate('upcomingDrives', {
        params: {searchData: inputs.inputValues},
      });
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

      // if (fieldId === 'selectedState' && val === 'Select state') {
      //   isValid = false;
      //   setdistEnb(false);
      //   setselectedStateindex(0);
      // }
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
            <Text style={{color: colors.primary}}>All fields are optional</Text>
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
              <ImageBackground
                style={styles.imgBtnBkg}
                source={require('../../../assets/images/invBkg.png')}>
                <Feather name="search" color={colors.additional2} size={20} />
                <Text style={styles.finderTouchText}>Find donation drives</Text>
              </ImageBackground>
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
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 30,
    color: 'black',
  },
  picker: {
    fontFamily: 'Montserrat-Regular',
  },
  touchBoard: {
    borderRadius: 100,
    marginTop: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finderTouch: {
    backgroundColor: colors.primary,
    elevation: 5,
    borderRadius: 100,
    overflow: 'hidden',
    width: 200,
    height: 50,
  },
  imgBtnBkg: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  finderTouchText: {
    color: colors.additional2,
    paddingLeft: 10,
  },
  errorMsg: {
    color: colors.primary,
    fontFamily: 'Montserrat-Regular',
  },
});

export default UpcomingDrivesSearch;
