/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import {logUserOut} from '../../../redux/auth/actions';
import {useDispatch} from 'react-redux';
import colors from '../../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import AreYouSure from '../../../components/AreYouSure';

const Profile = ({navigation}) => {
  const [rusure, setRusure] = useState(false);
  return (
    <View style={styles.outerView}>
      <ImageBackground
        style={styles.imgBkg}
        source={require('../../../assets/images/invBkg.png')}>
        <View style={styles.container}>
          <AreYouSure
            visibleState={rusure}
            visibleStateChanger={setRusure}
            dispatchable={logUserOut}
            message="Are you sure?"
          />

          <View style={styles.detailsView}>
            <View style={styles.userInfoView}>
              <View style={styles.imageView}>
                <View style={styles.imageCutterView}>
                  <Image
                    style={styles.avatar}
                    source={require('../../../assets/images/realpic1.png')}
                  />
                </View>
              </View>
              <Text style={styles.userName}>Lorem Ipsum</Text>
              <Text style={styles.userId}>#123456</Text>
            </View>
          </View>

          <View style={styles.tabsView}>
            <TouchableOpacity style={styles.touch}>
              <Text style={styles.touchText}>User Information</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touch}>
              <Text style={styles.touchText}>Change Password</Text>
            </TouchableOpacity>

            <View>
              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => setRusure(true)}>
                <ImageBackground
                  style={styles.imgBtnBkg}
                  source={require('../../../assets/images/invBkg.png')}>
                  <View style={styles.logoutInView}>
                    <Text style={styles.logoutText}>Logout</Text>
                    <Feather
                      name="log-out"
                      color={colors.additional2}
                      size={19}
                    />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  imgBtnBkg: {
    width: '100%',
    alignItems: 'center',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  imgBkg: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  outerView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  scroll: {
    height: '100%',
  },
  container: {
    flex: 1,
  },
  logoutBtn: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  logoutInView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  logoutText: {
    color: colors.additional2,
    fontFamily: 'sans-serif-light',
    paddingRight: 10,
  },
  detailsView: {
    paddingVertical: 40,
  },
  userInfoView: {
    width: '100%',
    alignItems: 'center',
  },
  imageView: {
    marginBottom: 20,
  },
  imageCutterView: {
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: 'green',
  },
  avatar: {
    width: 200,
    height: 200,
  },
  userName: {
    fontSize: 30,
    color: colors.additional2,
  },
  userId: {
    color: colors.additional2,
  },
  tabsView: {
    backgroundColor: colors.additional2,
    padding: 20,
    paddingVertical: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  touch: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: colors.additional2,
    elevation: 1,
  },
  touchText: {
    color: colors.primary,
  },
});

export default Profile;
