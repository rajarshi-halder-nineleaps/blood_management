import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  setSelected,
  selectAllToggle,
  submitinvite,
  invitesuccess,
} from '../../../redux/finddonors/actions';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

const DonorList = ({navigation}) => {
  const authState = useSelector((state) => state.authState);
  const finddonorFormState = useSelector((state) => state.finddonorFormState);
  const dispatch = useDispatch();

  const submitHandler = () => {
    let idList = [];
    finddonorFormState.list.forEach((val) =>
      val.selected ? idList.push(val.userId) : null,
    );
    if (idList.length === 0) {
      showMessage({
        message: 'Donors not selected.',
        description: 'Please select at least one donor before proceeding.',
        type: 'warning',
      });
    } else {
      dispatch(
        submitinvite(
          authState.userToken,
          finddonorFormState.inputValues,
          idList,
        ),
      );
      navigation.navigate('Find Donors');
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.outerView}>
        <View styles={styles.detailsBoard}>
          <Text style={styles.label}>
            Donor Id:{'  '}
            <Text style={styles.content}>{item.userId}</Text>
          </Text>
          <Text style={styles.label}>
            Donor name:{'  '}
            <Text style={styles.content}>{item.name}</Text>
          </Text>
        </View>
        <View style={styles.selectionBoard}>
          <TouchableOpacity
            style={item.selected ? styles.checkboxActive : styles.checkbox}
            onPress={() => dispatch(setSelected(index))}>
            <Feather name="check" color={colors.additional2} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {finddonorFormState.loading ? (
        <ActivityIndicator
          visible={finddonorFormState.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          animating={true}
          color={colors.primary}
          size="large"
        />
      ) : finddonorFormState.list.length === 0 ? (
        <View style={styles.suchEmpty}>
          <Image
            style={styles.suchEmptyImg}
            source={require('../../../assets/images/empty.png')}
          />
          <Text style={styles.emptyInfo}>
            No donors match your search criterion.
          </Text>
        </View>
      ) : (
        <View style={styles.insideContainer}>
          <View>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                These are the donors that match your search criterion.
              </Text>
            </View>
            <View style={styles.inviterBoard}>
              <View style={styles.allSelectionBoard}>
                <Text style={styles.allSelectiontext}>Select All</Text>
                <TouchableOpacity
                  style={
                    finddonorFormState.list.find((val) => !val.selected)
                      ? styles.checkbox
                      : styles.checkboxActive
                  }
                  onPress={() => dispatch(selectAllToggle())}>
                  <Feather name="check" color={colors.additional2} size={20} />
                </TouchableOpacity>
              </View>
              <View style={styles.touchBoard}>
                <TouchableOpacity
                  style={styles.sendInvitesTouch}
                  onPress={() => submitHandler()}>
                  <Text style={styles.sendInvitesText}>Send Invites</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <FlatList
            style={styles.scroll}
            data={finddonorFormState.list}
            renderItem={renderItem}
            keyExtractor={(item) => item.userId}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
  },
  suchEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.additional2,
  },
  suchEmptyImg: {
    height: 150,
    width: 150,
  },
  emptyInfo: {
    color: colors.primary,
    fontSize: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  insideContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'Montserrat-Regular',
    color: colors.primary,
    fontSize: 14,
    textAlign: 'center',
  },
  inviterBoard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  allSelectionBoard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  allSelectiontext: {
    fontFamily: 'Montserrat-Regular',
    color: colors.grayishblack,
    marginRight: 10,
  },
  touchBoard: {},
  sendInvitesTouch: {
    backgroundColor: colors.grayishblack,
    padding: 10,
    borderRadius: 5,
  },
  sendInvitesText: {
    color: colors.additional2,
    fontFamily: 'Montserrat-Regular',
  },
  outerView: {
    backgroundColor: colors.additional2,
    marginTop: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  detailsBoard: {
    padding: 20,
  },
  selectionBoard: {
    padding: 20,
  },
  label: {
    fontFamily: 'Montserrat-Bold',
  },
  content: {
    fontFamily: 'Montserrat-Regular',
  },
  checkbox: {
    borderRadius: 5,
    backgroundColor: colors.accent,
    padding: 3,
  },
  checkboxActive: {
    borderRadius: 5,
    backgroundColor: colors.coolblue,
    padding: 3,
  },
});

export default DonorList;
