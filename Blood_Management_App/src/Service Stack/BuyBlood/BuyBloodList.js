import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../constants/Colors';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather';
import BuyBloodListCard from '../../../components/BuyBloodListCard';

const BuyBloodList = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const buybloodFormState = useSelector((state) => state.buybloodFormState);

  const renderItem = ({item}) => {
    return (
      <BuyBloodListCard
        item={item}
        onPress={() =>
          navigation.navigate('Confirm Buy', {
            sellerId: item.bbId,
            blood_group: buybloodFormState.inputValues.blood_group,
            component: buybloodFormState.inputValues.component,
            units: buybloodFormState.inputValues.req_units,
            price: item.price,
          })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>
          The below list shows blood banks that meets your search criterion.
        </Text>
      </View>
      <FlatList
        data={buybloodFormState.list}
        renderItem={renderItem}
        keyExtractor={(item) => item.bbId}
        extraData={selectedId}
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
  title: {
    fontSize: 18,
  },
  header: {
    marginBottom: 20,

    paddingHorizontal: 30,
    paddingTop: 10,
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
  },
  buttonrow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
  },
});

export default BuyBloodList;
