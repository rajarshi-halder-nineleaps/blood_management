import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {updateAvatar} from '../redux/profile/actions';

const AvatarChangeModal = (props) => {
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      compressImageQuality: 0.7,
      cropperCircleOverlay: true,
      cropperStatusBarColor: colors.primary,
      cropperToolbarWidgetColor: colors.primary,
      cropperActiveWidgetColor: colors.primary,
      cropperToolbarTitle: 'RedBank Avatar',
    })
      .then((image) => {
        dispatch(updateAvatar(authState.userToken, authState.userId, image));
        console.log(image);
      })
      .catch(() => {});
    props.visibleStateChanger(false);
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      compressImageQuality: 0.7,
      cropperCircleOverlay: true,
      cropperToolbarWidgetColor: colors.primary,
      cropperActiveWidgetColor: colors.primary,
      cropperToolbarTitle: 'RedBank Avatar',
    })
      .then((image) => {
        dispatch(updateAvatar(authState.userToken, authState.userId, image));
        console.log(image);
        props.visibleStateChanger(false);
      })
      .catch(() => {});
  };

  return (
    // <View style={styles.centeredView}>
    <Modal
      transparent={true}
      visible={props.visibleState}
      onRequestClose={() => {
        props.visibleStateChanger(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.choiceTouch}
            onPress={takePhotoFromCamera}>
            <Text style={styles.choiceText}>Take Photo</Text>
            <Feather name="aperture" color={colors.additional2} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.choiceTouch}
            onPress={choosePhotoFromLibrary}>
            <Text style={styles.choiceText}>Choose from gallery</Text>
            <Feather name="image" color={colors.additional2} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.choiceTouch}
            onPress={() => props.visibleStateChanger(false)}>
            <Text style={styles.choiceText}>Cancel</Text>
            <Feather name="x" color={colors.additional2} size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  image: {
    width: 100,
    height: 100,
  },
  modalView: {
    width: '100%',
    backgroundColor: colors.additional2,
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  choiceTouch: {
    flexDirection: 'row',
    backgroundColor: colors.grayishblack,
    borderRadius: 5,
    width: '100%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  choiceText: {
    color: colors.additional2,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
});

export default AvatarChangeModal;
