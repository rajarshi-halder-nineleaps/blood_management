/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import TouchTabs from '../../../components/TouchTabs';
import colors from '../../../constants/Colors';
import {getDriveData, resetDoneState} from '../../../redux/myDrives/actions';
import {fetchCommitments} from '../../../redux/commitments/actions';

const Services = ({navigation}) => {
  const authState = useSelector((state) => state.authState);
  const myDrivesState = useSelector((state) => state.myDrivesState);
  const dispatch = useDispatch();

  const userType = authState.userType;

  useEffect(() => {
    dispatch(resetDoneState());
    console.log('gotData state set to false');
  }, [dispatch]);

  // useEffect(() => {
  //   if (myDrivesState.gotData) {
  //     navigation.navigate('myDrives');
  //   }
  // }, [myDrivesState.gotData, navigation]);

  const myDrivesHandler = () => {
    dispatch(getDriveData(authState.userToken));
    navigation.navigate('myDrives');
  };

  const myCommitmentsHandler = () => {
    dispatch(fetchCommitments(authState.userToken));
    navigation.navigate('commitments');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.row}>
          <TouchTabs
            label="Buy Blood"
            imgSrc="../assets/images/servicesScreen/findDonors.png"
          />
          <TouchTabs
            label="Find Donors"
            imgSrc="../assets/images/servicesScreen/findDonors.png"
          />
        </View>
        <View style={styles.row}>
          <TouchTabs
            label="Active Donor Request"
            imgSrc="../assets/images/servicesScreen/findDonors.png"
          />
          <TouchTabs
            label="My Purchases"
            imgSrc="../assets/images/servicesScreen/findDonors.png"
          />
        </View>
        {userType === 0 ? (
          <>
            <TouchTabs
              label="My Commitments"
              imgSrc="../assets/images/servicesScreen/findDonors.png"
              touchHandler={() => myCommitmentsHandler()}
            />
            <TouchTabs
              label="Upcoming Drives"
              imgSrc="../assets/images/servicesScreen/findDonors.png"
              touchHandler={() => navigation.navigate('upcomingDrivesSearch')}
            />
          </>
        ) : (
          <>
            <TouchTabs
              label="Organize a Drive"
              imgSrc="../assets/images/servicesScreen/findDonors.png"
              touchHandler={() => navigation.navigate('driveOrganizer')}
            />
            <TouchTabs
              label="My Donation Drives"
              touchHandler={() => myDrivesHandler()}
            />
            <TouchTabs
              label="My Inventory"
              imgSrc="../assets/images/servicesScreen/findDonors.png"
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  scroll: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
});

export default Services;
