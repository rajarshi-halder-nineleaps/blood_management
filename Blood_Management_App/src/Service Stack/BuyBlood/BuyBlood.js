import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {pincodeRegex, numbersOnlyRegex} from '../../../constants/Regexes';
import * as places from '../../../assets/places.json';
import colors from '../../../constants/Colors';
import {getBuyBloodList} from '../../../redux/buyblood/actions';
import {
  updateFields,
  stateCleanup,
  blurFields,
} from '../../../redux/buyblood/actions';

import Fields from '../../../components/Fields';

const FindDonors = ({navigation}) => {
  const dispatch = useDispatch();
  const buybloodFormState = useSelector((state) => state.buybloodFormState);
  const [selectedStateindex, setselectedStateindex] = useState(0);
  const [distEnb, setdistEnb] = useState(false);
  const authState = useSelector((state) => state.authState);
  const word = places.states;

  useEffect(() => {
    dispatch(stateCleanup());
  }, [dispatch]);

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

    if (fieldId === 'pincode' && val.length !== 0 && !pincodeRegex.test(val)) {
      isValid = false;
    }

    if (fieldId === 'blood_group' && val === 'Select Blood group') {
      isValid = false;
    }

    if (fieldId === 'component' && val === 'Select Blood Component ') {
      isValid = false;
    }

    if (fieldId === 'req_units' && (val === 0 || !numbersOnlyRegex.test(val))) {
      isValid = false;
      //todo reduxify this field for only int.
    }

    dispatch(updateFields(val, fieldId, isValid));
  };

  const submitHandler = () => {
    console.log(buybloodFormState.inputValues);
    if (buybloodFormState.inputValidity.pincode) {
      if (buybloodFormState.inputValidity.blood_group) {
        if (buybloodFormState.inputValidity.component) {
          if (buybloodFormState.inputValidity.req_units) {
            dispatch(
              getBuyBloodList(
                buybloodFormState.inputValues,
                authState.userToken,
              ),
            );
            navigation.navigate('Buy Blood List');
          } else {
            showMessage({
              message: 'Units required',
              description:
                'Please input the number of units required to continue.',
              type: 'warning',
            });
          }
        } else {
          showMessage({
            message: 'Component required',
            description: 'Please select a blood component to continue.',
            type: 'warning',
          });
        }
      } else {
        showMessage({
          message: 'Blood group required',
          description: 'Please select a blood group to continue.',
          type: 'warning',
        });
      }
    } else {
      showMessage({
        message: 'Invalid pincode',
        description: 'Please enter a valid pincode or leave the field empty.',
        type: 'warning',
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" color={colors.primary} size={30} />
        </TouchableOpacity>
        <Text style={styles.headertitle}>Buy Blood</Text>
      </View> */}

      <View>
        <View style={styles.imageBoard}>
          <Image
            source={require('../../../assets/images/servicesScreen/buyBlood.png')}
            style={styles.image}
            resizeMode="center"
          />
          <Text style={{...styles.searchInfoText}}>
            Please input the required details below
          </Text>
        </View>
      </View>

      <View style={{marginHorizontal: 30}}>
        {/* <Text style={styles.pickerLabel}>*Blood group</Text> */}
        <View style={styles.pickerView}>
          <Picker
            style={styles.picker}
            selectedValue={buybloodFormState.inputValues.blood_group}
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

        {/* <Text style={styles.pickerLabel}>*Component</Text> */}
        <View style={styles.pickerView}>
          <Picker
            style={styles.picker}
            selectedValue={buybloodFormState.inputValues.component}
            onValueChange={(val, itemIndex) => {
              blurListener('component');
              checkValidity(val, 'component');
            }}>
            <Picker.Item
              label="Select Blood Component"
              value="Select Blood Component"
            />
            <Picker.Item label="Blood" value="Blood" />
            <Picker.Item label="Plasma" value="Plasma" />
            <Picker.Item label="Platelet" value="Platelet" />
          </Picker>
        </View>
        {/* <View style={styles.pickerView}>
          <Picker
            style={styles.picker}
            selectedValue={buybloodFormState.inputValues.req_units}
            onValueChange={(val, itemIndex) => {
              blurListener('req_units');
              checkValidity(val, 'req_units');
            }}>
            <Picker.Item label="Select Units" value={0} />

            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
          </Picker>
        </View> */}

        <Fields
          label="*Units"
          error="Invalid input"
          returnKeyType="next"
          keyboardType="number-pad"
          inputIsValid={buybloodFormState.inputValidity.req_units}
          inputIsTouched={buybloodFormState.isTouched.req_units}
          value={buybloodFormState.inputValues.req_units}
          onChangeText={(val) => checkValidity(val, 'req_units')}
          onBlur={() => {
            blurListener('req_units');
          }}
        />

        <View style={styles.filterInfoBoard}>
          <Text style={styles.filterInfoText}>Optional Filters</Text>
        </View>

        {/* <Text style={styles.pickerLabel}>State</Text> */}
        <View style={styles.pickerView}>
          <Picker
            style={styles.picker}
            selectedValue={buybloodFormState.inputValues.state}
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

        {!buybloodFormState.inputValidity.selectedState &&
          buybloodFormState.isTouched.selectedState && (
            <Text style={styles.errorMsg}>Please select your state</Text>
          )}

        {/* <Text style={styles.pickerLabel}>District</Text> */}
        <View style={styles.pickerView}>
          <Picker
            enabled={distEnb}
            selectedValue={buybloodFormState.inputValues.district}
            onValueChange={(val, itemIndex) => {
              blurListener('district');
              checkValidity(val, 'district');
            }}>
            {word[selectedStateindex].districts.map((item, id) => (
              <Picker.Item label={item} value={item} key={id} />
            ))}
          </Picker>
        </View>

        {!buybloodFormState.inputValidity.selectedDistrict &&
          buybloodFormState.isTouched.selectedDistrict && (
            <Text style={styles.errorMsg}>Please select your district</Text>
          )}

        <Fields
          label="Pincode"
          error="Please enter a valid pincode or leave the field empty"
          returnKeyType="next"
          keyboardType="number-pad"
          inputIsValid={buybloodFormState.inputValidity.pincode}
          inputIsTouched={buybloodFormState.isTouched.pincode}
          value={buybloodFormState.inputValues.pincode}
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
            <Text style={styles.finderTouchText}>Find blood banks</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            submitHandler();
          }}>
          <Text style={styles.buttontext}>Find </Text>
        </TouchableOpacity>
      </View> */}
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 25,
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
  backbutton: {
    backgroundColor: colors.primary,
  },
  icon: {
    color: colors.additional2,
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
