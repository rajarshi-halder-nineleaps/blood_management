import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../constants/Colors';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather';
import BuyBloodListCard from '../../../components/BuyBloodListCard';
import {SkypeIndicator} from 'react-native-indicators';

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
            sellerDetails: `${item.bbName} ${item.address}, ${item.district}, ${item.state} [${item.pincode}]`,
          })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      {buybloodFormState.loading ? (
        <View style={styles.progressBoard}>
          <SkypeIndicator color={colors.primary} />
        </View>
      ) : buybloodFormState.list.length === 0 ? (
        <View style={styles.suchEmpty}>
          <Image
            style={styles.suchEmptyImg}
            source={require('../../../assets/images/empty.png')}
          />
          <Text style={styles.emptyInfo}>
            No Bloodbank has available stocks.
          </Text>
        </View>
      ) : (
        <View>
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
      )}
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
    fontFamily: 'Montserrat-Bold',
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
  progressBoard: {
    flex: 1,
    justifyContent: 'center',
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
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
  },
});

export default BuyBloodList;
