/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../constants/Colors';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

const CommitmentsCard = ({item}) => {
  let commitmentTimestamp = item.dateTime || item.commitment_timeStamp || '';

  commitmentTimestamp = `${commitmentTimestamp.split('T')[0]} at ${
    commitmentTimestamp.split('T')[1].split(':')[0]
  }:${commitmentTimestamp.split('T')[1].split(':')[1]}`;

  return (
    <Collapse>
      <CollapseHeader style={styles.touchboard}>
        <View style={styles.typeView}>
          <Text style={styles.headerContent}>{item.commitmentType}</Text>
        </View>
        <View style={styles.headerDetailsView}>
          <View style={styles.nameView}>
            <Text style={styles.nameText}>{item.recipientName}</Text>
          </View>
          <View style={styles.miniAddressView}>
            <Text style={styles.miniAddressContent}>{commitmentTimestamp}</Text>
          </View>
        </View>
        <View style={styles.headerIndicatorView}>
          {item.status ? (
            <View style={styles.yesnoView}>
              <Text style={styles.yes}>COMPLETED</Text>
            </View>
          ) : (
            <View style={styles.yesnoView}>
              <Text style={styles.no}>INCOMPLETE</Text>
            </View>
          )}
        </View>
      </CollapseHeader>
      <CollapseBody style={styles.collBody}>
        <View style={styles.bodyHeader}>
          {item.driveId ? (
            <Text style={styles.bodyLabel}>
              Drive ID : {'  '}
              <Text style={styles.bodyContent}>{item.driveId}</Text>
            </Text>
          ) : (
            <Text style={styles.bodyLabel}>
              DonationId ID : {'  '}
              <Text style={styles.bodyContent}>{item.donationId}</Text>
            </Text>
          )}
        </View>

        <View style={styles.detailsBoard}>
          <View style={styles.contentView}>
            <Text style={styles.label}>
              Commitment made on: {'  '}
              <Text style={styles.content}>
                {commitmentTimestamp}
              </Text>
            </Text>

            <View style={styles.addressView}>
              <Text style={styles.addressLabel}>Details:</Text>
              <View style={styles.addressContentView}>
                <View style={styles.addressInsideView}>
                  <Text style={styles.addressInsideLabel}>Address of donation: </Text>
                  <View style={styles.addressRightView}>
                    <Text style={styles.addressContent}>
                      {item.recipientAddress}
                    </Text>
                  </View>
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
                    {item.recipientName}
                  </Text>
                </View>
              </View>
              <View style={styles.addressInsideView}>
                <Text style={styles.addressInsideLabel}>Recipient Email:</Text>
                <View style={styles.addressRightView}>
                  <Text style={styles.addressContent}>
                    {item.recipientEmail}
                  </Text>
                </View>
              </View>

              <View style={styles.addressInsideView}>
                <Text style={styles.addressInsideLabel}>
                  Recipient Contact:
                </Text>
                <View style={styles.addressRightView}>
                  <Text style={styles.addressContent}>
                    {item.recipientContact}
                  </Text>
                </View>
              </View>

              {item.driveId ? (
                <>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>From:</Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.startTimeStamp ? `${item.startTimeStamp.split('T')[0]}, ${item.startTimeStamp.split('T')[1].split(':')[0]}:${item.startTimeStamp.split('T')[1].split(':')[1]}` : null}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>To:</Text>
                    <View style={styles.addressRightView}>
                      <Text style={styles.addressContent}>
                        {item.endTimeStamp ? `${item.endTimeStamp.split('T')[0]}, ${item.endTimeStamp.split('T')[1].split(':')[0]}:${item.endTimeStamp.split('T')[1].split(':')[1]}` : null}
                      </Text>
                    </View>
                  </View>
                </>
              ) : null}
            </View>
          </View>
          <View style={styles.headerIndicatorView}>
            {item.status ? (
              <View style={styles.yesnoView}>
                <Text style={styles.yes}>COMPLETED</Text>
              </View>
            ) : (
              <View style={styles.yesnoView}>
                <Text style={styles.no}>INCOMPLETE</Text>
              </View>
            )}
          </View>
        </View>
      </CollapseBody>
    </Collapse>
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
    color: 'red',
  },
  headerContent: {
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2,
  },
  collBody: {
    backgroundColor: colors.additional2,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 5,
    marginBottom: 10,
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
    borderBottomWidth: 0.7,
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
});

export default CommitmentsCard;
