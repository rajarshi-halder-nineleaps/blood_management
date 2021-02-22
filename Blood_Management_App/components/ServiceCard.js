import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';

const ServiceCard = ({item}) => {
  return (
    <TouchableOpacity
      style={[styles.videoContainer]}
      onPress={() => onPress(item)}>
      <Text style={styles.desc}>{item}</Text>
    </TouchableOpacity>
  );
};
export default ServiceCard

const styles = StyleSheet.create({
  videoContainer: {
    width: 300,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
  },
  videoPreview: {
    width: 275,
    height: 155,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  desc: {
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: 18,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});