/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import colors from '../../../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import PurchasesCard from '../../../components/PurchasesCard';
import Feather from 'react-native-vector-icons/Feather';

const MyPurchases = ({navigation}) => {
  const purchasesState = useSelector((state) => state.purchasesState);
  console.log(purchasesState.salesData);

  return (
    <View style={styles.container}>
      {purchasesState.loading ? (
        <ActivityIndicator
          visible={purchasesState.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          animating={true}
          color={colors.primary}
          size="large"
        />
      ) : purchasesState.salesData.length === 0 ? (
        <View style={styles.suchEmpty}>
          <Image
            style={styles.suchEmptyImg}
            source={require('../../../assets/images/empty.png')}
          />
          <Text style={styles.emptyInfo}>No purchases made so far.</Text>
        </View>
      ) : (
        <FlatList
          style={styles.scroll}
          data={purchasesState.salesData}
          renderItem={({item}) => (
            <PurchasesCard
              purchaseData={item}
              invoiceNavigator={() =>
                navigation.navigate('invoice', {
                  item,
                })
              }
            />
          )}
          keyExtractor={(item) => item.purchaseId}
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
  header: {
    paddingTop: 50,
    padding: 20,
  },
  titleView: {
    flexDirection: 'row',
  },
  headerText: {
    color: colors.additional2,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    fontSize: 18,
  },
  dateTimeView: {
    paddingTop: 10,
  },
  dateTimeLabel: {
    color: colors.additional2,
    fontWeight: 'bold',
  },
  dateTimeContent: {
    color: colors.additional2,
    fontWeight: '100',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
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
    fontFamily: 'sans-serif-light',
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
    fontFamily: 'Montserrat-Regular',
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
  },
  content: {
    color: colors.additional1,
    fontFamily: 'sans-serif',
    fontSize: 15,
  },
  statePincodeView: {
    flexDirection: 'row',
  },
});

export default MyPurchases;
