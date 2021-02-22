/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import colors from '../constants/Colors';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AreYouSure from './AreYouSure';
import { updateRequestList } from "../redux/activedonorrequest/actions"


const DonorRequestCard = ({ item }) => {



  const updateObjAccept = item.id
    ? { id: item.id, hasgiven: 2 }
    : null;


  const [rusurer, setRusurer] = useState(false);
  return (
    <>
      <Collapse>
        <CollapseHeader style={styles.touchboard}>
          <View style={styles.typeView}>
            <Text style={styles.headerContent}>{item.blood_group}</Text>
          </View>
          <View style={styles.headerDetailsView}>
            <View style={styles.nameView}>
              <Text style={styles.nameText}>{item.name}</Text>
            </View>
          </View>
          <View style={styles.headerIndicatorView}>
            {
              item.hasgiven == 0 ? (
                <View style={styles.yesnoView}>
                  <Text style={styles.requested}>REQUESTED</Text>
                </View>

              ) :
                null
            }
            {
              item.hasgiven == 1 ? (
                <View style={styles.yesnoView}>
                  <Text style={styles.yes}>ACCEPTED</Text>
                </View>

              ) :
                null
            }
            {
              item.hasgiven == 2 ? (
                <View style={styles.yesnoView}>
                  <Text style={styles.no}>DONATED</Text>
                </View>

              ) :
                null
            }

          </View>
        </CollapseHeader>
        <CollapseBody style={styles.collBody}>
          <View style={styles.bodyHeader}>
            {item.driveId ? (
              <Text style={styles.bodyLabel}>
                Drive ID : {item.driveId}
                <Text style={styles.bodyContent}>{item.driveId}</Text>
              </Text>
            ) : (
                <Text style={styles.bodyLabel}>
                  DonationId ID : {item.requestid}
                  <Text style={styles.bodyContent}>{item.donationId}</Text>
                </Text>
              )}
          </View>

          <View style={styles.detailsBoard}>
            <View style={styles.contentView}>
              <Text style={styles.label}>
                Commitment made on: {'  '}
                <Text style={styles.content}>
                  {item.date} at {item.time}
                </Text>
              </Text>

              <View style={styles.addressView}>
                <Text style={styles.addressLabel}>Drive details:</Text>
                <View style={styles.addressContentView}>
                  <View style={styles.addressInsideView}>

                  </View>
                </View>
              </View>
            </View>
            <View style={styles.detailsView}>
              <View style={styles.addressContentView}>
                <View style={styles.addressInsideView}>
                  <Text style={styles.addressInsideLabel}>Recipient name:</Text>
                  <View style={styles.addressRightView}>
                    <Text style={styles.addressContent}>
                      {item.name}
                    </Text>
                  </View>
                </View>
                <View style={styles.addressInsideView}>
                  <Text style={styles.addressInsideLabel}>Recipient Email:</Text>
                  <View style={styles.addressRightView}>
                    <Text style={styles.addressContent}>
                      {item.email}
                    </Text>
                  </View>
                </View>

                <View style={styles.addressInsideView}>
                  <Text style={styles.addressInsideLabel}>
                    Recipient Contact:
                </Text>
                  <View style={styles.addressRightView}>
                    <Text style={styles.addressContent}>
                      {item.contact}
                    </Text>
                  </View>
                </View>

                {item.driveId ? (
                  <>
                    <View style={styles.addressInsideView}>
                      <Text style={styles.addressInsideLabel}>From:</Text>
                      <View style={styles.addressRightView}>
                        <Text style={styles.addressContent}>
                          {item.date} at
                        {'  ' + item.time}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.addressInsideView}>
                      <Text style={styles.addressInsideLabel}>To:</Text>
                      <View style={styles.addressRightView}>
                        <Text style={styles.addressContent}>
                          {item.date} at
                        {'  ' + item.time}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : null}
              </View>
            </View>
            <View style={styles.row}>
              {
                item.hasgiven == 1 ?
                  <TouchableOpacity onPress={() => {
                    setRusurer(true);
                  }} >
                    <View style={styles.updatebutton}>
                      <Text style={styles.buttontext}>Update Status</Text>
                    </View>
                  </TouchableOpacity>
                  :
                  null
              }

              <View style={styles.headerIndicatorView}>
              </View>
            </View>

          </View>
        </CollapseBody>
      </Collapse>
      { rusurer ? (
        <>
          <AreYouSure
            visibleState={rusurer}
            visibleStateChanger={setRusurer}
            dispatchable={updateRequestList}
            dispatchData={updateObjAccept}
            message="Has the user donated blood?"
          />
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  touchboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
    borderRadius: 5,
    borderColor: colors.accent,
    borderWidth: 0.5,
    overflow: 'hidden',
    backgroundColor: colors.additional2,
    flexDirection: 'row',
    padding: 10,
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
  requested: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: 'red',
  },

  yes: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: 'green',
  },
  no: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: 'blue',
  },
  headerContent: {
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2,
  },
  collBody: {
    backgroundColor: colors.additional2,
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor: colors.accent,
    borderWidth: 0.5,
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
  updatebutton: {
    backgroundColor: colors.additional2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.primary

  },
  buttontext: {
    fontSize: 18,
    backgroundColor: 'transparent',
    color: colors.primary,
    fontFamily: 'Montserrat-Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});

export default DonorRequestCard;
