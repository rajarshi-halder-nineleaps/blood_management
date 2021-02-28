/* eslint-disable prettier/prettier */
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../../../constants/Colors';
import DonationDriveFilter from '../../../components/DonationDriveFilter';
import DonationRequestsCard from '../../../components/DonationRequestsCard';
import {fetchSalesData} from '../../../redux/sales/actions';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';

//TODO replace commitments state with donation requests state

const DonationRequests = ({navigation}) => {
  const authState = useSelector((state) => state.authState);
  const invitesState = useSelector((state) => state.invitesState);
  const dispatch = useDispatch();

  const [active, setActive] = useState(true);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(
    (driveId) => {
      setRefreshing(true);
      dispatch(fetchSalesData(authState.userToken));
      if (!invitesState.loading) {
        setRefreshing(false);
      }
    },
    [authState.userToken, dispatch, invitesState.loading],
  );
  return (
    <View style={styles.container}>
      {invitesState.loading ? (
        <ActivityIndicator
          visible={invitesState.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          animating={true}
          color={colors.primary}
          size="large"
        />
      ) : invitesState.invitesList.length === 0 ? (
        <View style={styles.suchEmpty}>
          <Image
            style={styles.suchEmptyImg}
            source={require('../../../assets/images/empty.png')}
          />
          <Text style={styles.emptyInfo}>You don't have any invites yet.</Text>
        </View>
      ) : (
        <>
          <DonationDriveFilter active={active} setActive={setActive} />

          <FlatList
            style={styles.scroll}
            data={invitesState.invitesList.filter((val) => {
              if (active) {
                return val.inviteType === 'drive';
              } else {
                return val.inviteType === 'donation';
              }
            })}
            renderItem={({item}) => <DonationRequestsCard item={item} />}
            keyExtractor={(item) => item.driveId || item.donationId}
            refreshControl={
              <RefreshControl
                colors={[colors.primary, colors.secondary]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scroll: {
    paddingHorizontal: 0,
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
  donorListTouch: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
  },
  touchText: {
    color: colors.additional2,
    fontFamily: 'sans-serif-light',
  },
});

export default DonationRequests;
