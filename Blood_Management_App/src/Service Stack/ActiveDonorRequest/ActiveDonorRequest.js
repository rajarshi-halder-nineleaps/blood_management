import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Image,
  Dimensions,
} from 'react-native';
import colors from '../../../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { getactivedonorList } from '../../../redux/activedonorrequest/actions';
import DonorRequestCard from '../../../components/DonorRequestCard';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ActiveDonorRequest = ({ navigation }) => {
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const activedonorFormState = useSelector(
    (state) => state.activedonorFormState,
  );

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(
    (driveId) => {
      setRefreshing(true);
      dispatch(getactivedonorList(authState.userToken));
      if (!activedonorFormState.loading) {
        setRefreshing(false);
      }
    },
    [authState.userToken, dispatch, activedonorFormState.loading],
  );

  useEffect(() => {
    dispatch(getactivedonorList(authState.userToken));
  }, [authState.userToken, dispatch]);
  //* UPDATES DEPENDENCY ARRAY.

  const renderItem = ({ item }) => {
    return (
      <DonorRequestCard
        item={item}
        onPress={() =>
          navigation.navigate('DonationRequestList', {
            donationId: item.donationId,
            status: item.status
          })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" color={colors.primary} size={30} />
        </TouchableOpacity>
        <Text style={styles.headertitle}>Blood Request</Text>

      </View> */}
      {activedonorFormState.loading ? (
        <ActivityIndicator
          visible={activedonorFormState.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          animating={true}
          color={colors.primary}
          size="large"
        />
      ) : activedonorFormState.donorList.length === 0 ? (
        <View style={styles.suchEmpty}>
          <Image
            style={styles.suchEmptyImg}
            source={require('../../../assets/images/empty.png')}
          />
          <Text style={styles.emptyInfo}>
            You haven't made any donation requests yet!
          </Text>
        </View>
      ) : (
        <FlatList
          data={activedonorFormState.donorList}
          renderItem={renderItem}
          keyExtractor={(item) => item.donationId}
          refreshControl={
            <RefreshControl
              colors={[colors.primary, colors.secondary]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    backgroundColor: 'transparent',
    paddingTop: 10,
    flexDirection: 'row',
  },
  headertitle: {
    fontSize: 40,
    backgroundColor: 'transparent',
    marginLeft: 10,
    color: colors.primary,
    fontFamily: 'Montserrat-Regular',
  },
  header2: {
    fontSize: 50,
    fontWeight: '500',
    marginBottom: 20,
    backgroundColor: colors.primary,
    fontFamily: 'sans-serif-condensed',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    paddingHorizontal: 50,
    marginHorizontal: 20,
    borderRadius: 20,
    elevation: 10,
  },
  suchEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  suchEmptyImg: {
    height: 150,
    width: 150,
  },
  emptyInfo: {
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
    color: colors.primary,
    fontSize: 12,
  },
});

export default ActiveDonorRequest;
