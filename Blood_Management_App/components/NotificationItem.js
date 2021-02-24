import React from 'react';
import {View, Text, StyleSheet, TouchableOpcaity} from 'react-native';
import colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

const NotificationItem = ({item}) => {
  return (
    <>
      <View style={item.status ? styles.seenTab : styles.tab}>
        <View style={styles.imageBoard}>
          {item.title === 'New donor!' ? (
            <Feather name="check" color={colors.primary} size={20} />
          ) : (
            <Feather name="info" color={colors.primary} size={20} />
          )}
        </View>
        <View style={styles.detailsBoard}>
          <View style={styles.titleBoard}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.descBoard}>
            <Text style={styles.desc}>{item.message}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tab: {
    backgroundColor: colors.additional2,
    elevation: 5,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  seenTab: {
    backgroundColor: colors.accent,
    elevation: 5,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageBoard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  detailsBoard: {},
  titleBoard: {
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
  },
  descBoard: {},
  desc: {
    fontFamily: 'Montserrat-Regular',
  },
});

export default NotificationItem;
