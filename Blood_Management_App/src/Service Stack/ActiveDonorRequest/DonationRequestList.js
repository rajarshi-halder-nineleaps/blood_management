import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../../constants/Colors';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather';
import {
  getdonationdetails,
  expirerequest,
  verifydonor,
} from '../../../redux/activedonorrequest/actions';
//import BuyBloodListCard from '../../../components/BuyBloodListCard'
import DonorRequestDetailsCard from '../../../components/DonorRequestDetailsCard';

const DonationRequestList = ({ navigation, route }) => {
  const { donationId, status } = route.params;
  const [selectedId, setSelectedId] = useState(null);
  const activedonorFormState = useSelector(
    (state) => state.activedonorFormState,
  );
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getdonationdetails(authState.userToken, donationId));
  }, [authState.userToken, dispatch, donationId]);
  //* UPDATES DEPENDENCY ARRAY.

  const renderItem = ({ item }) => {
    return (
      <DonorRequestDetailsCard
        item={item}
        onPress={() =>
          dispatch(verifydonor(authState.userToken, item.userId, donationId))
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {status ?
          <>
            <Text style={styles.texts}> Update Donation Status </Text>

            <TouchableOpacity
              disabled={status ? false : true}
              style={status ?
                styles.typeView :
                styles.typeViewDisabled}
              onPress={() => {
                dispatch(expirerequest(authState.userToken, donationId))
                navigation.navigate("Active Donor Request")
              }

              }>
              <Text style={styles.invitebutton}>Expire</Text>
            </TouchableOpacity>
          </>
          :
          <Text style={styles.texts}> This Donation request has expired</Text>


        }

      </View>
      <FlatList
        data={activedonorFormState.donorDetailsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.userId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  texts: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: colors.grayishblack,
  },
  title: {
    fontSize: 18,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.additional2,
  },
  headertitle: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    backgroundColor: colors.primary,
    fontFamily: 'sans-serif-condensed',
    paddingTop: 10,
    color: 'white',
  },
  container: {
    flex: 1,
  },
  inputView: {
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  check: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  invite: {
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
  },
  invitebutton: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  buttonrow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
  },
  typeView: {
    backgroundColor: colors.primary,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 30,
  },
  typeViewDisabled: {
    backgroundColor: colors.accent,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 30,
  },
});

export default DonationRequestList;
