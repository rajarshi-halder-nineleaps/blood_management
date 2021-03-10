/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import colors from '../../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {updateFields, makeContact} from '../../redux/about/actions';
import Feather from 'react-native-vector-icons/Feather';
import Fields from '../../components/Fields';

const About = ({navigation}) => {
  const dispatch = useDispatch();
  const aboutState = useSelector((state) => state.aboutState);
  const authState = useSelector((state) => state.authState);

  const [touchedState, setTouchedState] = useState({sub: false, msg: false});

  const contacter = () => {
    setTouchedState({sub: true, msg: true});
    //* Anandhu | Alerts can be un commented if later its is required to show alerts
    // BEST FORM IN THE APP.
    if (!aboutState.inputValues.subject) {
      null;
      // Alert.alert('Missing Subject', 'The subject field cannot be empty');
    } else if (!aboutState.inputValues.message) {
      null;
      // Alert.alert('Missing Message', 'The message field cannot be empty');
    } else {
      setTouchedState({sub: false, msg: false});
      dispatch(makeContact(authState.userToken, aboutState.inputValues));
    }
  };

  const aboutUs =
    "As the saying goes: 'Don't let fools or mosquitoes suck your  blood, Put it to good use. Donate blood, save a life'.";

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBkg}
          source={require('../../assets/images/realpic1.png')}>
          <View style={styles.about}>
            <View style={styles.heading}>
              <Text style={{...styles.headingText, color: colors.additional2}}>
                About Us...
              </Text>
            </View>
            <View style={styles.imageView}>
              <Image
                style={styles.image}
                source={require('../../assets/images/logotransparentbkg.png')}
              />
            </View>
            <View style={styles.content}>
              <Text style={{...styles.contentText, color: colors.additional2}}>
                "Rakt daan, Mahadaan", You might've heard this slogan a number
                of times in your life, and you even might've thought "Maybe I
                can donate blood too and that way, I'll save a life". At the
                same time, someone in a hospital within your walking distance is
                in urgent need of blood with your blood group the hospital
                forgot to restock that particular blood group. You can save that
                patient's life, but you don't know that the patient exists or is
                in need of blood. The hospital could've restocked the blood, but
                they didn't know they were out of stock. Clearly, there's a gap.
                We intend to bridge that with{' '}
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    color: colors.additional2,
                  }}>
                  redBank
                </Text>
                . {'\n\n\n'}
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    color: colors.additional2,
                  }}>
                  RedBank serves as a platform to bridge the gap between the
                  blood donors and recipients and to reduce the efforts required
                  to find the right type of blood group.
                </Text>{' '}
                with redBank , hospitlas can easily view and manage their
                inventory, blood banks can sell blood to other users and any
                user can make a request to all the active donors who are willing
                to donate their blood to save a life.
              </Text>
            </View>
          </View>
          <View style={styles.contact}>
            <View style={styles.heading}>
              <Text style={{...styles.headingText, color: colors.grayishblack}}>
                Contact Us
              </Text>
            </View>
            <View style={styles.content}>
              <Text style={{...styles.contentText, color: colors.grayishblack}}>
                Please enter a subject and a message below:
              </Text>
              <View style={styles.contactForm}>
                <View style={styles.inputView}>
                  <Fields
                    // style={styles.input}
                    label="*Subject"
                    error="This field cannot be empty"
                    returnKeyType="next"
                    value={aboutState.inputValues.subject}
                    inputIsValid={aboutState.inputValues.subject.length}
                    inputIsTouched={touchedState.sub}
                    onChangeText={(val) => {
                      dispatch(updateFields(val, 'subject'));
                    }}
                    onBlur={() =>
                      setTouchedState((prevState) => ({
                        ...prevState,
                        sub: true,
                      }))
                    }
                  />

                  {/* {!aboutState.inputValues.subject && (
                  <Text style={styles.errorMsg}>
                    This field cannot be empty!
                  </Text>
                )} */}
                </View>
                <View style={styles.inputView}>
                  <Fields
                    // style={styles.input}
                    label="*Message"
                    error="This field cannot be empty"
                    multiline={true}
                    numberOfLines={5}
                    returnKeyType="next"
                    value={aboutState.inputValues.message}
                    inputIsValid={aboutState.inputValues.message.length}
                    inputIsTouched={touchedState.msg}
                    onChangeText={(val) => {
                      dispatch(updateFields(val, 'message'));
                    }}
                    onBlur={() =>
                      setTouchedState((prevState) => ({
                        ...prevState,
                        msg: true,
                      }))
                    }
                  />
                  {/* {!aboutState.inputValues.message && (
                  <Text style={styles.errorMsg}>
                    This field cannot be empty!
                  </Text>
                )} */}
                </View>
                <View style={styles.sendTouchView}>
                  <TouchableOpacity
                    style={styles.sendTouch}
                    onPress={() => contacter()}>
                    <Text style={styles.sendTouchText}>Send</Text>
                    <Feather
                      name="chevrons-right"
                      color={colors.additional2}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  imageBkg: {
    width: '100%',
    flex: 1,
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  image: {
    width: 100,
    height: 110,
  },
  about: {
    padding: 40,
  },
  contact: {
    padding: 40,
    backgroundColor: colors.additional2,
    borderTopLeftRadius: 90,
    borderTopWidth: 10,
    borderLeftWidth: 10,
    borderColor: colors.primary,
    elevation: 10,
  },
  heading: {
    paddingBottom: 20,
  },
  headingText: {
    fontSize: 30,
    fontFamily: 'Montserrat-Regular',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
  },
  contentText: {
    fontSize: 18,
    fontFamily: 'sans-serif-light',
  },
  inputView: {
    paddingVertical: 10,
  },
  input: {
    justifyContent: 'flex-start',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: colors.accent,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 30,
    color: 'black',
  },
  errorMsg: {
    color: colors.primary,
    fontFamily: 'Montserrat-Regular',
  },
  sendTouchView: {
    flexDirection: 'row',
  },
  sendTouch: {
    backgroundColor: colors.grayishblack,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'space-between',
    elevation: 5,
  },
  sendTouchText: {
    color: colors.additional2,
    fontFamily: 'Montserrat-Regular',
    paddingRight: 10,
  },
});

export default About;
