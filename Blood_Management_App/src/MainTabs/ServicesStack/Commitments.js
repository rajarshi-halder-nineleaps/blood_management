/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../../../constants/Colors';
import renderItem from '../../../components/CommitmentsCard';
import {fetchCommitments} from '../../../redux/commitments/actions';

const Commitments = () => {
  const commitmentsState = useSelector((state) => state.commitmentsState);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  useEffect(() => {
    dispatch(fetchCommitments(authState.userToken));
  }, [authState.userToken, dispatch]);
  const [refreshing, setRefreshing] = React.useState(false);

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
        <ActivityIndicator
          visible={commitmentsState.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          animating={true}
          color={colors.primary}
          size="large"
        />
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
          <FlatList
          style={styles.scroll}
          data={commitmentsState.commitmentsList}
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
