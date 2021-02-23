import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import colors from '../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'

export default (HomeSlider = ({
  style,
  item,
  imageKey,
  onPress,
  index,
  active,
  local,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}>
      <View style={styles.card}>
        <Icon name={item.icon} size={20} color={colors.additional2} />
        <Text style={styles.cardtitle}>{item.number}</Text>
        <Text style={styles.cardtitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    height: 120,
    width: 250,
    marginHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 20,

    marginRight: 40,

  },
  cardtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.additional2,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat-Regular',
  },
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
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});