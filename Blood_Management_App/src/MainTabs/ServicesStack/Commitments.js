/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../../../constants/Colors';
import renderItem from '../../../components/CommitmentsCard';

const Commitments = () => {
  const commitmentsState = useSelector((state) => state.commitmentsState);

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
        <FlatList
          style={styles.scroll}
          data={commitmentsState.commitmentsList}
          renderItem={renderItem}
          keyExtractor={(item) => item.driveId || item.donationId}
        />
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
