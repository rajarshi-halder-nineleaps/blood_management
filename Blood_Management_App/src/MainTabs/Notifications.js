import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import NotificationItem from '../../components/NotificationItem';
import colors from '../../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {SkypeIndicator} from 'react-native-indicators';
import {fetchNotifications} from '../../redux/notifications/actions';

const Notifications = ({navigation}) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  const notificationsState = useSelector((state) => state.notificationsState);
  const [refreshing, setRefreshing] = useState(false);

  const refreshHandler = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchNotifications(authState.userToken));
    if (!notificationsState.loading) {
      setRefreshing(false);
    }
  }, [authState.userToken, dispatch, notificationsState.loading]);

  // useEffect(() => {
  //   dispatch(fetchNotifications(authState.userToken));
  // }, [authState.userToken, dispatch]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     dispatch(fetchNotifications(authState.userToken));
  //     console.log('PROFILE RENDERED!');
  //   }, [authState.userToken, dispatch]),
  // );

  return (
    <View
      style={
        notificationsState.notifications.length === 0
          ? styles.containerEmpty
          : styles.container
      }>
      <View style={styles.header}>
        <Text
          style={
            notificationsState.notifications.length === 0
              ? styles.headingEmpty
              : styles.heading
          }>
          Notifications
        </Text>
        <TouchableOpacity
          style={styles.refreshTouch}
          onPress={() => refreshHandler()}>
          <Feather name="refresh-ccw" color={colors.primary} size={20} />
        </TouchableOpacity>
      </View>
      {notificationsState.loading ? (
        <View style={styles.progressBoard}>
          <SkypeIndicator color={colors.primary} />
        </View>
      ) : notificationsState.notifications.length === 0 ? (
        <View style={styles.suchEmpty}>
          <Image
            style={styles.suchEmptyImg}
            source={require('../../assets/images/empty.png')}
          />
          <Text style={styles.emptyInfo}>
            You don't have any Notifications yet.
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={notificationsState.notifications}
          renderItem={({item}) => <NotificationItem item={item} />}
          keyExtractor={(item) => item.notification_id + ''}
          refreshControl={
            <RefreshControl
              colors={[colors.primary, colors.secondary]}
              refreshing={refreshing}
              onRefresh={refreshHandler}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  containerEmpty: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.additional2,
  },
  progressBoard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    color: colors.additional2,
  },
  headingEmpty: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    color: colors.primary,
  },
  refreshTouch: {
    backgroundColor: colors.additional2,
    padding: 10,
    borderRadius: 100,
  },
  suchEmpty: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.additional2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suchEmptyImg: {
    height: 150,
    width: 150,
  },
  emptyInfo: {
    color: colors.primary,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  list: {
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default Notifications;
