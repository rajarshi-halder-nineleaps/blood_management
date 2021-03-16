/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../constants/Colors';

import {
  getThisMonth,
  getCurrentMonthAnalytics,
  updateMonth,
  updateYear,
  getMonthlyBreakout,
} from '../../redux/sales/actions';
import {Picker} from '@react-native-picker/picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as figures from '../../assets/salesanalytics.json';
import {BarChart, Grid, YAxis, LineChart, XAxis} from 'react-native-svg-charts';
// import {
//     PieChart,
//     BarChart,
//     StackedBarChart,
//     LineChart,
// } from 'react-native-chart-kit';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';

//import { Picker } from 'react-native-wheel-pick';
const Revenue = ({navigation}) => {
  const authState = useSelector((state) => state.authState);
  const salesState = useSelector((state) => state.salesState);
  const dispatch = useDispatch();
  //const data = figures.analytics;
  const [selectedyearindex, setselectedyearindex] = useState(0);
  const [list, setlist] = useState([]);
  const monthdata = salesState.currentMonthData;
  const [selectedYear, setSelectedYear] = useState('');
  const [month, setMonth] = useState(false);

  const [breakoutMonth, setBreakoutMonth] = useState('');
  const [breakoutYear, setBreakoutYear] = useState('');

  const submitMonthlyBreakout = () => {
    if (breakoutYear === '' || breakoutYear === '0') {
      showMessage({
        message: 'Year required',
        description: 'Please select a year to continue.',
        type: 'warning',
      });
    } else {
      if (breakoutMonth === '' || breakoutMonth === '00') {
        showMessage({
          message: 'Month required',
          description: 'Please select a month to continue.',
          type: 'warning',
        });
      } else {
        dispatch(
          getMonthlyBreakout(breakoutYear, breakoutMonth, authState.userToken),
        );
      }
    }
  };
  const contentInset = {top: 20, bottom: 20, left: 5, right: 10};

  const fill = colors.grayishblack;
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const monthList = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <Text style={styles.sectiontitle}> Monthly Revenue</Text>
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: colors.primary,
              width: 130,
            }}>
            <Picker
              style={{
                borderColor: colors.primary,
                borderWidth: 2,
                width: 130,
                height: 20,
                fontFamily: 'Montserrat-Regular',
              }}
              enabled={true}
              selectedValue={selectedYear}
              onValueChange={(val, itemIndex) => {
                setSelectedYear(val);
                dispatch(getCurrentMonthAnalytics(val, authState.userToken));
              }}>
              <Picker.Item label="2021" value="2021" />
              <Picker.Item label="2022" value="2022" />
              <Picker.Item label="2023" value="2023" />
              <Picker.Item label="2024" value="2024" />
            </Picker>
          </View>
        </View>
        <View
          style={{
            left: 5,
            right: 10,
            height: 200,
            width: Dimensions.get('screen').width - 30,
            flexDirection: 'row',
          }}>
          {salesState && salesState.currentMonthData && (
            <YAxis
              data={salesState.currentMonthData}
              contentInset={contentInset}
              svg={{
                fill: colors.sapphireblue,
                fontSize: 12,
              }}
              numberOfTicks={4}
              formatLabel={(index) => `₹${index}`}
            />
          )}
          <View style={{flexDirection: 'column', flex: 1}}>
            <BarChart
              style={{flex: 1, left: 0, right: 0}}
              data={salesState.currentMonthData}
              svg={{fill}}
              contentInset={{top: 20, bottom: 9, right: 5, left: 5}}>
              <Grid />
            </BarChart>
            <XAxis
              style={{marginHorizontal: 0}}
              data={monthList}
              formatLabel={(value, index) => monthList[index]}
              contentInset={{left: 15, right: 10}}
              svg={{fontSize: 10, fill: 'black'}}
            />
          </View>
        </View>

        <View></View>
        <View>
          <View style={styles.secondaryHeader}>
            <Text style={styles.header_text}>Monthly Breakup</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: colors.primary,
                width: 130,
                marginHorizontal: 20,
              }}>
              <Picker
                style={{
                  borderColor: colors.primary,
                  borderWidth: 2,
                  width: 130,
                  height: 20,
                  paddingBottom: 30,
                }}
                enabled={true}
                selectedValue={breakoutYear}
                onValueChange={(val, itemIndex) => {
                  setBreakoutYear(val);
                }}>
                <Picker.Item label="Year" value="0" />
                <Picker.Item label="2020" value="2020" />
                <Picker.Item label="2021" value="2021" />
                <Picker.Item label="2022" value="2022" />
                <Picker.Item label="2023" value="2023" />
                <Picker.Item label="2024" value="2024" />
              </Picker>
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: colors.primary,
                width: 130,
                marginHorizontal: 20,
              }}>
              <Picker
                style={{
                  borderColor: colors.primary,
                  borderWidth: 2,
                  width: 130,
                  height: 20,
                  paddingBottom: 30,
                }}
                enabled={true}
                selectedValue={breakoutMonth}
                onValueChange={(val, itemIndex) => {
                  setBreakoutMonth(val);
                }}>
                <Picker.Item label="Month" value="00" />
                <Picker.Item label="January" value="01" />
                <Picker.Item label="February" value="02" />
                <Picker.Item label="March" value="03" />
                <Picker.Item label="April" value="04" />
                <Picker.Item label="May" value="05" />
                <Picker.Item label="June" value="06" />
                <Picker.Item label="July" value="07" />
                <Picker.Item label="August" value="08" />
                <Picker.Item label="September" value="09" />
                <Picker.Item label="October" value="10" />
                <Picker.Item label="November" value="11" />
                <Picker.Item label="December" value="12" />
              </Picker>
            </View>
            <TouchableOpacity
              onPress={() => submitMonthlyBreakout()}
              style={styles.button}>
              <Text style={styles.button_text}>Go</Text>
            </TouchableOpacity>
          </View>
          {salesState && salesState.breakoutData && (
            <View
              style={{
                left: 5,
                right: 10,
                height: 200,
                width: Dimensions.get('screen').width - 30,
                flexDirection: 'row',
              }}>
              <YAxis
                data={salesState.breakoutData}
                contentInset={contentInset}
                svg={{
                  fill: colors.sapphireblue,
                  fontSize: 12,
                }}
                numberOfTicks={4}
                formatLabel={(index) => `₹${index}`}
              />
              <View style={{flexDirection: 'column', flex: 1}}>
                <BarChart
                  style={{flex: 1}}
                  data={salesState.breakoutData}
                  svg={{fill}}
                  contentInset={{top: 20, bottom: 10, right: 10, left: 10}}>
                  <Grid />
                </BarChart>
                <XAxis
                  style={{marginHorizontal: 0}}
                  data={bloodGroups}
                  formatLabel={(value, index) => bloodGroups[index]}
                  contentInset={{left: 25, right: 15}}
                  svg={{fontSize: 10, fill: 'black'}}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {},
  buttontitle: {
    color: colors.darkPrimary,
    fontWeight: '800',
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
  },
  searchbox: {
    marginHorizontal: 20,

    justifyContent: 'space-between',
  },
  refreshText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  pickerView: {
    flex: 1,
    marginHorizontal: 7,
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderColor: colors.grayishblack,
    borderWidth: 2,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 50,
    color: 'black',
  },
  pickerRow: {},
  iconview: {
    alignItems: 'center',
  },
  box: {
    backgroundColor: colors.primary,
    width: 150,
  },
  sectiontitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    marginLeft: 5,
    marginTop: 0,
  },
  sectiontext: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 2,
  },
  graphStyle: {},
  graphView: {
    marginTop: 10,
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
  secondaryHeader: {
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  header_text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  button_text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: colors.additional2,
  },
});

export default Revenue;
