/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import colors from '../../../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import SalesCard from '../../../components/SalesCard';
import Feather from 'react-native-vector-icons/Feather';
import {fetchSalesData} from '../../../redux/sales/actions';

const Sales = ({navigation}) => {
  const salesState = useSelector((state) => state.salesState);
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSalesData(authState.userToken));
  }, [authState.userToken, dispatch]);

  console.log(salesState);
  return (
    <View style={styles.container}>
      {salesState.loading ? (
        <View style={styles.progressBoard}>
          <SkypeIndicator color={colors.primary} />
        </View>
      ) : salesState.salesData.length === 0 ? (
        <View style={styles.suchEmpty}>
          <Image
            style={styles.suchEmptyImg}
            source={require('../../../assets/images/empty.png')}
          />
          <Text style={styles.emptyInfo}>No sales made so far.</Text>
        </View>
      ) : (
        <FlatList
          style={styles.scroll}
          data={salesState.salesData}
          renderItem={({item}) => (
            <SalesCard
              saleData={item}
              invoiceNavigator={() =>
                navigation.navigate('invoice', {
                  item,
                })
              }
            />
          )}
          keyExtractor={(item) => item.salesId}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imgBkg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingBottom: 30,
    width: '100%',
    height: '100%',
  },
  progressBoard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 50,
    padding: 20,
  },
  titleView: {
    flexDirection: 'row',
  },
  headerText: {
    color: colors.additional2,
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  idView: {
    backgroundColor: colors.additional2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  headerContent: {
    color: colors.primary,
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
  },
  dateTimeView: {
    paddingTop: 10,
  },
  dateTimeLabel: {
    color: colors.additional2,
    fontFamily: 'Montserrat-Bold',
  },
  dateTimeContent: {
    color: colors.additional2,
    fontWeight: '100',
    fontFamily: 'Montserrat-Regular',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.additional2,
  },
  scroll: {},
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
    fontFamily: 'Montserrat-Regular',
  },
  touchboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    overflow: 'hidden',
    margin: 10,
  },
  touch: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.additional2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  contentBoard: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.additional2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  donorListTouchView: {
    flexDirection: 'row',
    width: '100%',
    padding: 20,
    justifyContent: 'center',
  },
  donorListTouch: {
    marginTop: 10,
    elevation: 5,
    borderRadius: 100,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  touchContainerView: {
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  imgBtnBkg: {
    width: '100%',
  },
  touchText: {
    color: colors.additional2,
    fontFamily: 'Montserrat-Regular',
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressView: {},
  groupsView: {},
  label: {
    fontSize: 20,
    color: colors.primary,
    paddingTop: 10,
  },
  addressContentView: {
    paddingVertical: 20,
  },
  groupsContentView: {
    paddingVertical: 20,
    flexDirection: 'row',
  },
  indGroup: {
    backgroundColor: colors.primary,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: 2,
    padding: 5,
  },
  indGroupContent: {
    color: colors.additional2,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  content: {
    color: colors.additional1,
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  statePincodeView: {
    flexDirection: 'row',
  },
});

export default Sales;
