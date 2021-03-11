/* eslint-disable prettier/prettier */
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import Fields from '../../../components/Fields';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../constants/Colors';
import * as places from '../../../assets/places.json';
import {upcomingDrivesSearch} from '../../../redux/upcomingDrives/actions';
import {pincodeRegex} from '../../../constants/Regexes';
import {showMessage, hideMessage} from 'react-native-flash-message';

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
      pincode: true,
    },
    isTouched: {
      pincode: false,
    },
  });

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);

  const searchSubmitHandler = () => {
    if (inputs.inputValidity.pincode) {
      dispatch(upcomingDrivesSearch(authState.userToken, inputs.inputValues));
      navigation.navigate('upcomingDrives', {
        searchData: inputs.inputValues,
      });
    } else {
      showMessage({
        message: 'Invalid pincode',
        description: 'Please enter a valid pincode or leave the field empty',
        type: 'danger',
      });
      setInputs((prevState) => ({...prevState, isTouched: {pincode: true}}));
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
        val.trim().length !== 0 &&
        !pincodeRegex.test(String(val.trim()))
      ) {
        isValid = false;
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
    <>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.searchBoard}>
            <View style={styles.imageBoard}>
              <Image
                source={require('../../../assets/images/findDrives.png')}
                style={styles.image}
                resizeMode="center"
              />
              <Text style={styles.searchInfoText}>All fields are optional</Text>
            </View>
            {/* <Text style={styles.pickerLabel}>State</Text> */}
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
            <Fields
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
                  <Text style={styles.finderTouchText}>
                    Find donation drives
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
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
    width: 250,
    height: 50,
  },
  finderTouchText: {
    color: colors.additional2,
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
  imgBtnBkg: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  searchInfoText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.primary,
    fontSize: 14,
  },
});

export default UpcomingDrivesSearch;
