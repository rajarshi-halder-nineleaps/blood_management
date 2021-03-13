import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Image,
} from 'react-native';
import colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {updateAvatar, removeAvatar} from '../redux/profile/actions';

const AvatarChangeModal = (props) => {
  const authState = useSelector((state) => state.authState);
  const profileState = useSelector((state) => state.profileState);
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

  const removeUserAvatar = () => {
    dispatch(
      removeAvatar(authState.userToken, profileState.userData.profilePicture),
    );
    props.visibleStateChanger(false);
  };

  return (
    // <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visibleState}
      onRequestClose={() => {
        props.visibleStateChanger(false);
      }}>
      <Pressable
        style={styles.centeredView}
        onPressOut={() => props.visibleStateChanger(false)}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.choiceTouch}
            onPress={takePhotoFromCamera}>
            <Text style={styles.choiceText}>Take Photo</Text>
            <Feather name="aperture" color={colors.grayishblack} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.choiceTouch}
            onPress={choosePhotoFromLibrary}>
            <Text style={styles.choiceText}>Choose from gallery</Text>
            <Feather name="image" color={colors.grayishblack} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.choiceTouch}
            onPress={removeUserAvatar}>
            <Text style={styles.choiceText}>Remove Avatar</Text>
            <Feather name="trash" color={colors.grayishblack} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.choiceTouch}
            onPress={() => props.visibleStateChanger(false)}>
            <Text style={[styles.choiceText, {color: colors.dutchred}]}>
              Cancel
            </Text>
            <Feather name="x" color={colors.dutchred} size={25} />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  modalView: {
    width: '100%',
    backgroundColor: colors.additional2,
    borderRadius: 10,
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
    backgroundColor: colors.additional2,
    width: '100%',
    padding: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colors.accent,
    borderBottomWidth: 2,
  },
  choiceText: {
    color: colors.grayishblack,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
});

export default AvatarChangeModal;
