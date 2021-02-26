/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import colors from '../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import AreYouSure from './AreYouSure';
import RejectionMessageModal from './RejectionMessageModal';
import {updateInvitesList} from '../redux/invites/actions';
import {useTheme} from '@react-navigation/native';

const DonationRequestsCard = ({item}) => {
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  //TODO CHANGE THE UPDATE OBJECTS AS PER NEW ONES FROM BACK END.

  // const updateObjReject = item.driveId
  //   ? {driveId: item.driveId, status: 0}
  //   : {donationId: item.donationId, status: 0};

  // const updateObjAccept = item.driveId
  //   ? {driveId: item.driveId, status: 1}
  //   : {donationId: item.donationId, status: 1};

  const updateObjReject = {
    eventId: item.driveId ? item.driveId : item.donationId,
    eventType: item.inviteType,
    acceptance: 0,
    rejectionMessage: '',
  };

  const updateObjAccept = {
    eventId: item.driveId ? item.driveId : item.donationId,
    eventType: item.inviteType,
    acceptance: 1,
    rejectionMessage: '',
  };

  const [rusurea, setRusurea] = useState(false);
  const [rusurer, setRusurer] = useState(false);

  const invitedOn = item.inviteTimestamp.split('T');

  let startTimestamp;
  let endTimestamp;

  if (item.driveId) {
    startTimestamp = item.startTimestamp.split('T');
    endTimestamp = item.endTimestamp.split('T');
  }

  return (
    <>
      <Collapse>
        <CollapseHeader style={styles.touchboard}>
          <View style={styles.typeView}>
            <Text style={styles.headerContent}>{item.inviteType}</Text>
          </View>
          <View style={styles.headerDetailsView}>
            <View style={styles.nameView}>
              <Text style={styles.nameText}>{item.recipientName}</Text>
            </View>
            <View style={styles.miniAddressView}>
              {item.driveId ? (
                <>
                  <Text style={styles.miniAddressContent}>
                    {item.district + ', '}
                  </Text>
                  <Text style={styles.miniAddressContent}>{item.state}</Text>
                </>
              ) : (
                <Text style={styles.miniAddressContent}>{item.address}</Text>
              )}
            </View>
          </View>
          <View style={styles.headerIndicatorView}>
            {item.status === 1 ? (
              <View style={styles.yesnoView}>
                <Text style={styles.yes}>ACCEPTED</Text>
              </View>
            ) : item.status === 0 ? (
              <View style={styles.yesnoView}>
                <Text style={styles.no}>REJECTED</Text>
              </View>
            ) : (
              <View style={styles.yesnoView}>
                <Text style={styles.pending}>PENDING</Text>
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
                Invited on: {'  '}
                <Text style={styles.content}>
                  {` ${invitedOn[0]} at ${invitedOn[1].split(':')[0]}:${
                    invitedOn[1].split(':')[1]
                  } `}
                </Text>
              </Text>

              <View style={styles.addressView}>
                <Text style={styles.addressLabel}>Details:</Text>
                <View style={styles.addressContentView}>
                  <View style={styles.addressInsideView}>
                    <Text style={styles.addressInsideLabel}>Address: </Text>
                    <View style={styles.addressRightView}>
                      {item.driveId ? (
                        <Text style={styles.addressContent}>
                          {item.address}, {item.district}, {'\n'}
                          {item.state} [{item.pincode}]
                        </Text>
                      ) : (
                        <Text style={styles.addressContent}>
                          {item.address}
                        </Text>
                      )}
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
                  <Text style={styles.addressInsideLabel}>
                    Recipient Email:
                  </Text>
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

                {item.driveId && item.startTimestamp && item.endTimestamp ? (
                  <>
                    <View style={styles.addressInsideView}>
                      <Text style={styles.addressInsideLabel}>From:</Text>
                      <View style={styles.addressRightView}>
                        <Text style={styles.addressContent}>
                          {` ${startTimestamp[0]} at ${
                            startTimestamp[1].split(':')[0]
                          }:${startTimestamp[1].split(':')[1]} `}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.addressInsideView}>
                      <Text style={styles.addressInsideLabel}>To:</Text>
                      <View style={styles.addressRightView}>
                        <Text style={styles.addressContent}>
                          {` ${endTimestamp[0]} at ${
                            endTimestamp[1].split(':')[0]
                          }:${endTimestamp[1].split(':')[1]} `}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.messageText}>{item.message}</Text>
                  </>
                ) : null}
              </View>
            </View>
            <View style={styles.optionsView}>
              {item.status === 0 || item.status === 1 ? (
                <View style={styles.notPending}>
                  <Text style={item.status === 1 ? styles.yes : styles.no}>
                    {item.status === 1 ? 'ACCEPTED' : 'REJECTED'}
                  </Text>
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.accept}
                    onPress={() => {
                      setRusurea(true);
                    }}>
                    <Text style={styles.optionsTouchText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.reject}
                    onPress={() => {
                      setRusurer(true);
                    }}>
                    <Text style={styles.optionsTouchText}>Reject</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </CollapseBody>
      </Collapse>
      {rusurea || rusurer ? (
        <>
          <AreYouSure
            visibleState={rusurea}
            visibleStateChanger={setRusurea}
            dispatchable={updateInvitesList}
            dispatchData={updateObjAccept}
            message="Are you sure you wish to accept this request?"
          />
          <RejectionMessageModal
            visibleState={rusurer}
            visibleStateChanger={setRusurer}
            dispatchable={updateInvitesList}
            dispatchData={updateObjReject}
            message="Confirm invite rejection"
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
    fontSize: 12,
    color: colors.coolblue,
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
  optionsView: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
  },
  accept: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  reject: {
    backgroundColor: colors.dutchred,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  optionsTouchText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.additional2,
  },
  notPending: {
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  messageText: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
});

export default DonationRequestsCard;
