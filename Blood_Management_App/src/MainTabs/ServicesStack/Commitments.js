/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import colors from '../../../constants/Colors';
import renderItem from '../../../components/CommitmentsCard';
import DonationDriveFilter from '../../../components/DonationDriveFilter';
import {fetchCommitments} from '../../../redux/commitments/actions';

const Commitments = () => {
  const commitmentsState = useSelector((state) => state.commitmentsState);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  useEffect(() => {
    dispatch(fetchCommitments(authState.userToken));
  }, [authState.userToken, dispatch]);
  const [refreshing, setRefreshing] = useState(false);

  const [active, setActive] = useState(true);

  const onRefresh = React.useCallback(
    (driveId) => {
      setRefreshing(true);
      dispatch(fetchCommitments(authState.userToken));
      if (!commitmentsState.loading) {
        setRefreshing(false);
      }
    },
    [authState.userToken, commitmentsState.loading, dispatch],
  );
  //* if adding anything before or after the flatlist, use flatlist's header and footer props.
  return (
    <View style={styles.container}>
      {commitmentsState.loading ? (
        <View style={styles.progressBoard}>
          <SkypeIndicator color={colors.primary} />
        </View>
      ) : commitmentsState.commitmentsList.length === 0 ? (
        <View style={styles.suchEmpty}>
          <Image
            style={styles.suchEmptyImg}
            source={require('../../../assets/images/empty.png')}
          />
          <Text style={styles.emptyInfo}>
            You don't have any commitments yet.
          </Text>
        </View>
      ) : (
        <>
          <DonationDriveFilter active={active} setActive={setActive} />

          <FlatList
            style={styles.scroll}
            data={commitmentsState.commitmentsList.filter((val) => {
              if (active) {
                return val.commitmentType === 'drive';
              } else {
                return val.commitmentType === 'donation';
              }
            })}
            renderItem={renderItem}
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
  progressBoard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default Commitments;
