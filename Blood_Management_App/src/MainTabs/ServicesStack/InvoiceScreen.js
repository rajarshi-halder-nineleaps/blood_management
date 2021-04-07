/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '../../../constants/Colors';
// import PDFLib, {PDFDocument, PDFPage} from 'react-native-pdf-lib';
import {showMessage, hideMessage} from 'react-native-flash-message';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Feather from 'react-native-vector-icons/Feather';

const SalesCard = ({navigation, route}) => {
  const now = new Date().getTime();
  const {item} = route.params;
  const trnDate = item.dateOfTransaction
    ? `${item.dateOfTransaction.split('T')[0]}, ${
        item.dateOfTransaction.split('T')[1].split(':')[0]
      }:${item.dateOfTransaction.split('T')[1].split(':')[1]}`
    : null;

  const createPDF = async () => {
    let options = {
      html: `<!DOCTYPE html>
      <html>
      <head>
      <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700&display=swap" rel="stylesheet">
      
      <style>
      
      *{
      font-family: 'Montserrat', sans-serif;
      text-align: left
      }
      
      h1{
        color: #E94364;
      }
      h2{
        text-decoration: underline;
      }
      
      h3{
        color: green;
      }
      
      .primary{
        color: #E94364;
      }
      
      .container{
        display: flex;
          flex-direction: column;
          align-items: center;
          padding: 50px
      }
      
      .subheadBoard{
        width: 100%;
        border-bottom: 2px solid green;
          margin: 0 0 20px 0;
      }
      
      tr{
        display: flex;
          justify-content: space-between;
      }
      
      </style>
      
      </head>
      <body>
      
      <div class="container">
      <img src="https://firebasestorage.googleapis.com/v0/b/redbank-104.appspot.com/o/logotransparentbkg.png?alt=media&token=7a6f228c-0998-4f81-bd25-519cced6e13f" alt="redbankLogo" width="100" height="100">
        <h1>RedBank</h1>
        <h2>Blood Transaction Invoice</h2>
        <h4>Transaction ID: ${item.purchaseId}</h4>
        <div class="subheadBoard">
        <h3>Seller details:</h3>
        </div>
        <table style="width: 100%;">
          <tbody>
            <tr>
              <td>Seller Name</td>
              <td>${item.sellerName}</td>
            </tr>
            <tr>
              <td>Seller Email</td>
              <td>${item.sellerEmail}</td>
            </tr>
            <tr>
              <td>Seller Contact</td>
              <td>${item.sellerContact}</td>
            </tr>
          </tbody>
        </table><br /><br />
        
        
        <div class="subheadBoard">
          <h3>Transaction details:</h3>
        </div>
        
        
        <table style="width: 100%;">
          <tbody>
            <tr>
              <td>Transaction date</td>
              <td>${trnDate}</td>
            </tr>
            <tr>
              <td>Blood group</td>
              <td>${item.soldGroup}</td>
            </tr>
            <tr>
              <td>Component</td>
              <td>${item.soldComponent}</td>
            </tr>
            <tr>
              <td>Purpose of purchase</td>
              <td>${item.reason}</td>
            </tr>
            <tr>
              <td>Location of transfusion / storage</td>
              <td>${item.location}</td>
            </tr>
            <tr>
              <td>Total units bought</td>
              <td>${item.soldQuantity}</td>
            </tr>
            <tr>
              <td>Price per unit</td>
              <td>₹ ${item.pricePerUnit}</td>
            </tr>
          </tbody>
        </table>
        
      
      <div style="border: 2px solid black;padding:  0 30px;margin: 40px  0">
      
        <h3>Total bill amount: <span class="primary">₹${
          item.pricePerUnit * item.soldQuantity
        }</span></h3>
      
      </div>
      
      </div>
      
      </body>
      </html>
      `,
      fileName: `REDBANK_INVOICE_${item.purchaseId}_${now}`,
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    showMessage({
      message: 'Invoice saved',
      description: `The invoice has been saved to your device in ${file.filePath}`,
      backgroundColor: colors.coolblue,
    });
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.collBody}>
          <View style={styles.bodyHeader}>
            <Text style={styles.bodyLabel}>
              Transaction ID : {'  '}
              <Text style={styles.bodyContent}>
                {item.salesId || item.purchaseId}
              </Text>
            </Text>
          </View>

          <View style={styles.detailsBoard}>
            <View style={styles.contentView}>
              <Text style={styles.label}>
                Transaction Date: {'  '}
                <Text style={styles.content}>{trnDate}</Text>
              </Text>

              <View style={styles.addressView}>
                <Text style={styles.addressLabel}>
                  {(item.salesId && 'Buyer') || 'Seller'} Details:
                </Text>
                <View style={styles.addressContentView}>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>
                      {(item.salesId && 'Buyer') || 'Seller'} Name:{' '}
                    </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.buyerName || item.sellerName}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>
                      {(item.salesId && 'Buyer') || 'Seller'} Email:{' '}
                    </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.buyerEmail || item.sellerEmail}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>
                      {(item.salesId && 'Buyer') || 'Seller'} Contact:{' '}
                    </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.buyerContact || item.sellerContact}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>
                      Purpose of purchase:{' '}
                    </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>{item.reason}</Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>
                      Hosptal / Clinic:{' '}
                    </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>{item.location}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.addressView}>
                <Text style={styles.addressLabel}>Transaction Details:</Text>
                <View style={styles.addressContentView}>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>Blood group: </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.purchasedGroup || item.soldGroup}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>Component: </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.purchasedComponent || item.soldComponent}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>Sold units: </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.purchasedQuantity || item.soldQuantity}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>
                      Price per unit:{' '}
                    </Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.pricePerUnit}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.billView}>
              <Text style={styles.billLabel}>Total bill amount: </Text>
              <Text style={styles.bill}>
                ₹{' '}
                {item.pricePerUnit *
                  (item.purchasedQuantity || item.soldQuantity)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {item.purchaseId && (
        <View style={styles.invoiceTouchBoard}>
          <TouchableOpacity
            style={styles.invoiceTouch}
            onPress={() => createPDF()}>
            <Text style={styles.invoiceText}>Generate Invoice</Text>
            <Feather
              name="align-justify"
              color={colors.additional2}
              size={17}
            />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  touchboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: colors.accent,
    borderWidth: 0.5,
    overflow: 'hidden',
    backgroundColor: colors.additional2,
    flexDirection: 'row',
    padding: 10,
    paddingVertical: 15,
  },
  touch: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  typeView: {
    backgroundColor: colors.grayishblack,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 30,
  },
  headerDetailsView: {
    flex: 1,
    overflow: 'hidden',
  },
  avatarView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: colors.primary,
    marginBottom: 10,
  },
  nameView: {},
  nameText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.grayishblack,
  },
  miniAddressView: {
    flexDirection: 'row',
    fontFamily: 'Montserrat-Regular',
  },
  miniAddressContent: {
    fontFamily: 'Montserrat-Re',
    color: colors.additional1,
  },
  headerIndicatorView: {},
  yesnoView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'flex-end',
  },

  yes: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: 'green',
  },
  no: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: colors.dutchred,
  },
  pending: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    color: colors.coolblue,
  },
  headerContent: {
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2,
  },
  collBody: {
    backgroundColor: colors.additional2,
    borderRadius: 5,
    paddingBottom: 20,
    elevation: 5,
  },
  bodyHeader: {
    backgroundColor: colors.accent,
    padding: 10,
  },
  bodyLabel: {
    fontFamily: 'Montserrat-Bold',
    color: colors.primary,
  },
  bodyContent: {
    fontFamily: 'Montserrat-Regular',
    color: colors.primary,
  },
  detailsBoard: {
    padding: 10,
  },
  label: {
    fontFamily: 'Montserrat-Bold',
  },
  content: {
    fontFamily: 'Montserrat-Regular',
  },
  addressView: {
    paddingVertical: 20,
  },
  addressLabel: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  addressInsideView: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: colors.grayishblack,
    padding: 10,
    justifyContent: 'space-between',
  },
  addressInsideLabel: {
    fontFamily: 'Montserrat-Bold',
  },
  addressRightView: {
    flex: 1,
    marginLeft: 10,
  },
  addressContent: {
    fontFamily: 'Montserrat-Regular',
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  recipientLabel: {
    fontFamily: 'Montserrat-Regular',
    color: colors.additional1,
  },
  recipientContent: {
    fontFamily: 'Montserrat-Regular',
    color: colors.additional1,
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
  invoiceTouchBoard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  invoiceTouch: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.grayishblack,
    paddingVertical: 20,
    width: '100%',
  },
  invoiceText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: colors.additional2,
    marginRight: 10,
  },
});

export default SalesCard;
