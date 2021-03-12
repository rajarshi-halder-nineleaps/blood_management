import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {showMessage, hideMessage} from 'react-native-flash-message';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {pincodeRegex, numbersOnlyRegex} from '../../../constants/Regexes';
import * as places from '../../../assets/places.json';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {requestLocationPermission} from '../../../redux/geolocation/actions';
import colors from '../../../constants/Colors';
import {UIActivityIndicator} from 'react-native-indicators';
import {getDonorList} from '../../../redux/finddonors/actions';
import {
  updateFields,
  stateCleanup,
  blurFields,
} from '../../../redux/finddonors/actions';
import Fields from '../../../components/Fields';

const FindDonors = ({navigation}) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  const geolocationState = useSelector((state) => state.geolocationState);
  const finddonorFormState = useSelector((state) => state.finddonorFormState);
  const [selectedStateindex, setselectedStateindex] = useState(0);
  const [distEnb, setdistEnb] = useState(false);
  const word = places.states;
  let watchID;

  useEffect(() => {
    dispatch(stateCleanup());
  }, [dispatch]);

  useEffect(() => {
    const stateIndex = word.findIndex((val) =>
      val.state.includes(geolocationState.data.state),
    );
    if (stateIndex <= 0) {
      setselectedStateindex(0);
    } else {
      setselectedStateindex(stateIndex);
    }

    setdistEnb(true);

    const newInputValues = {
      selectedState: geolocationState.data.state,
      pincode: geolocationState.data.pincode,
    };
    const districtIndex = word[stateIndex].districts.findIndex((val) =>
      val.includes(geolocationState.data.district),
    );

    if (districtIndex > 0) {
      newInputValues.selectedDistrict =
        word[stateIndex].districts[districtIndex];
    } else {
      newInputValues.selectedDistrict = word[stateIndex].districts[0];
    }

    dispatch(updateFields(newInputValues.selectedState, 'state', true));
    dispatch(updateFields(newInputValues.selectedDistrict, 'district', true));
    dispatch(updateFields(newInputValues.pincode, 'pincode', true));
  }, [
    dispatch,
    geolocationState.data.district,
    geolocationState.data.pincode,
    geolocationState.data.state,
    word,
  ]);

  const blurListener = (fieldId) => {
    dispatch(blurFields(fieldId));
  };

  const checkValidity = (val, fieldId) => {
    console.log(fieldId);
    let isValid = true;

    if (fieldId === 'state' && val === 'Select state') {
      isValid = false;
      setdistEnb(false);
      setselectedStateindex(0);
    }

    if (fieldId === 'district' && val === 'Select district') {
      isValid = false;
    }
    if (fieldId === 'address' && val === '') {
      isValid = false;
    }

    if (fieldId === 'pincode' && val.length !== 0 && !pincodeRegex.test(val)) {
      isValid = false;
    }

    if (fieldId === 'blood_group' && val === 'Select Blood group') {
      isValid = false;
    }

    dispatch(updateFields(val, fieldId, isValid));
  };

  const getLocation = () => {
    dispatch(requestLocationPermission(watchID));

    // return () => {
    //   Geolocation.clearWatch(watchID);
    // };
  };

  const submitHandler = () => {
    console.log(finddonorFormState.inputValues);
    if (finddonorFormState.inputValidity.pincode) {
      if (finddonorFormState.inputValidity.blood_group) {
        if (finddonorFormState.inputValidity.address) {
          dispatch(
            getDonorList(authState.userToken, finddonorFormState.inputValues),
          );
          navigation.navigate('Donor List');
        } else {
          showMessage({
            message: 'Address of donation required.',
            description: 'Please enter an address of donation to continue.',
            type: 'warning',
          });
        }
      } else {
        showMessage({
          message: 'Blood group required.',
          description: 'Please select a blood group to continue.',
          type: 'warning',
        });
      }
    } else {
      showMessage({
        message: 'Invalid pin code.',
        description: 'Please enter a valid pincode or leave the field empty',
        type: 'warning',
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.imageBoard}>
          <Image
            source={require('../../../assets/images/findDrives.png')}
            style={styles.image}
            resizeMode="center"
          />
          <Text style={{...styles.searchInfoText}}>
            Please input the required details below
          </Text>
        </View>
      </View>

      <View style={{marginHorizontal: 20}}>
        {/* <Text style={styles.pickerLabel}>Blood group</Text> */}
        <View style={styles.pickerView}>
          <Picker
            style={styles.picker}
            selectedValue={finddonorFormState.inputValues.blood_group}
            onValueChange={(val, itemIndex) => {
              blurListener('blood_group');
              checkValidity(val, 'blood_group');
            }}>
            <Picker.Item
              label="Select Blood Group"
              value="Select Blood Group"
            />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
          </Picker>
        </View>

        <Fields
          label="Address of Donation"
          error="Invalid address!"
          numberOfLines={3}
          returnKeyType="next"
          multiline={true}
          inputIsValid={finddonorFormState.inputValidity.address}
          inputIsTouched={finddonorFormState.isTouched.address}
          value={finddonorFormState.inputValues.address}
          onChangeText={(val) => checkValidity(val, 'address')}
          onBlur={() => {
            blurListener('address');
          }}
        />

        <View style={styles.filterInfoBoard}>
          <Text style={styles.filterInfoText}>Optional Filters</Text>
        </View>

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
              <Text style={styles.locationText}>Use my current location</Text>
            </>
          )}
        </TouchableOpacity>

        {/* <Text style={styles.pickerLabel}>State</Text> */}
        <View style={styles.pickerView}>
          <Picker
            style={styles.picker}
            selectedValue={finddonorFormState.inputValues.state}
            onValueChange={(val, itemIndex) => {
              blurListener('state');
              checkValidity(val, 'state');
              setdistEnb(true);
              setselectedStateindex(itemIndex);
            }}>
            {word.map((item, id) => (
              <Picker.Item label={item.state} value={item.state} key={id} />
            ))}
          </Picker>
        </View>

        {!finddonorFormState.inputValidity.state &&
          finddonorFormState.isTouched.state && (
            <Text style={styles.errorMsg}>Please select your state</Text>
          )}

        {/* <Text style={styles.pickerLabel}>District</Text> */}
        <View style={styles.pickerView}>
          <Picker
            enabled={distEnb}
            selectedValue={finddonorFormState.inputValues.district}
            onValueChange={(val, itemIndex) => {
              blurListener('district');
              checkValidity(val, 'district');
            }}>
            {word[selectedStateindex].districts.map((item, id) => (
              <Picker.Item label={item} value={item} key={id} />
            ))}
          </Picker>
        </View>

        {!finddonorFormState.inputValidity.district &&
          finddonorFormState.isTouched.district && (
            <Text style={styles.errorMsg}>Please select your district</Text>
          )}

        <Fields
          label="Pincode"
          error="Invalid pincode!"
          returnKeyType="next"
          inputIsValid={finddonorFormState.inputValidity.pincode}
          inputIsTouched={finddonorFormState.isTouched.pincode}
          value={finddonorFormState.inputValues.pincode}
          onChangeText={(val) => checkValidity(val, 'pincode')}
          onBlur={() => {
            blurListener('pincode');
          }}
        />
      </View>
      <View style={styles.touchBoard}>
        <TouchableOpacity
          style={styles.finderTouch}
          onPress={() => submitHandler()}>
          <ImageBackground
            style={styles.imgBtnBkg}
            source={require('../../../assets/images/invBkg.png')}>
            <Feather name="search" color={colors.additional2} size={20} />
            <Text style={styles.finderTouchText}>Find donors</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  header: {
    marginBottom: 20,
    backgroundColor: 'transparent',
    paddingTop: 10,
    flexDirection: 'row',
  },
  headertitle: {
    fontSize: 50,
    backgroundColor: 'transparent',
    marginLeft: 10,
    color: colors.primary,
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
    borderColor: colors.accent,
    borderWidth: 2,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 10,
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
  },
  picker: {
    color: colors.grayishblack,
    fontFamily: 'Montserrat-Regular',
  },
  errorMsg: {
    color: colors.dutchred,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
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
  title: {
    fontSize: 25,
  },
  filterInfoBoard: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 100,
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 30,
    color: colors.additional2,
    paddingVertical: 10,
  },
  buttontext: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2,
  },
  filterInfoText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.primary,
    fontSize: 18,
  },
  searchInfoText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.primary,
    fontSize: 14,
  },
  touchBoard: {
    borderRadius: 100,
    marginTop: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 55,
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
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
});

export default FindDonors;
