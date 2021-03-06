/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image, ImageBackground, Text, StyleSheet} from 'react-native';
import colors from '../constants/Colors';

//todo item changes

const PurchasesCard = ({item}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardView}>
        <ImageBackground
          style={styles.imgBkg}
          source={require('../assets/images/invBkg.png')}>
          <View style={styles.header}>
            <View style={styles.titleView}>
              <Text style={styles.headerText}>TRANSACTION ID :</Text>
              <View style={styles.idView}>
                <Text style={styles.headerContent}>{item.purchaseId}</Text>
              </View>
            </View>
            <View style={styles.buyerView}>
              <Text style={styles.buyerLabel}>
                Seller :{'  '}
                <Text style={styles.buyerContent}>{item.sellerName}</Text>
              </Text>
              <Text style={styles.buyerLabel}>
                Seller email:{'  '}
                <Text style={styles.buyerContent}>{item.sellerEmail}</Text>
              </Text>
              <Text style={styles.buyerLabel}>
                Seller contact:{'  '}
                <Text style={styles.buyerContent}>{item.sellerContact}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.contentView}>
            <View style={styles.detailsView}>
              <Text style={styles.label}>
                Purchase date:{' '}
                <Text style={styles.content}>
                {item.dateOfTransaction ? `${item.dateOfTransaction.split('T')[0]}, ${item.dateOfTransaction.split('T')[1].split(':')[0]}:${item.dateOfTransaction.split('T')[1].split(':')[1]}` : null}

                </Text>
              </Text>
              <Text style={styles.label}>
                Purchased blood group:{' '}
                <Text style={styles.content}>{item.soldGroup}</Text>
              </Text>
              <Text style={styles.label}>
                Purchased component:{' '}
                <Text style={styles.content}>{item.soldComponent}</Text>
              </Text>
              <Text style={styles.label}>
                Purchased quantity:{' '}
                <Text style={styles.content}>{item.soldQuantity} Units</Text>
              </Text>
              <Text style={styles.label}>
                Price per unit:{' '}
                <Text style={styles.content}>₹ {item.pricePerUnit}</Text>
              </Text>
            </View>
            <View style={styles.billView}>
              <Text style={styles.billLabel}>Total bill amount: </Text>
              <Text style={styles.bill}>₹ {item.pricePerUnit * item.soldQuantity}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    overflow: 'hidden',
    margin: 10,
  },
  cardView: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.additional2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imgBkg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
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
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
  buyerView: {
    paddingTop: 10,
  },
  buyerLabel: {
    color: colors.additional2,
    fontFamily: 'Montserrat-Bold',
  },
  buyerContent: {
    color: colors.additional2,
    fontFamily: 'Montserrat-Regular',
  },
  contentView: {
    backgroundColor: colors.additional2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  detailsView: {},
  label: {
    color:colors.grayishblack,
    fontFamily: 'Montserrat-Bold',
  },
  content: {
    fontFamily: 'Montserrat-Regular',
    color:colors.moderategray,
  },
  billView: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  billLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: colors.primary,
  },
  bill: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    color: colors.moderategray,
  },
});

export default PurchasesCard;
