/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../constants/Colors';

import {
  getThisMonth,
  getCurrentMonthAnalytics,
  updateMonth,
  updateYear,
  getMonthlyBreakout,
  getStockInfo,
} from '../../redux/sales/actions';
import {Picker} from '@react-native-picker/picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as figures from '../../assets/salesanalytics.json';
import {
  BarChart,
  Grid,
  YAxis,
  LineChart,
  XAxis,
  PieChart,
} from 'react-native-svg-charts';
// import {
//     PieChart,
//     BarChart,
//     StackedBarChart,
//     LineChart,
// } from 'react-native-chart-kit';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';

//import { Picker } from 'react-native-wheel-pick';
const Stock = ({navigation}) => {
  const authState = useSelector((state) => state.authState);
  const salesState = useSelector((state) => state.salesState);
  const dispatch = useDispatch();
  //const data = figures.analytics;
  const [selectedyearindex, setselectedyearindex] = useState(0);
  const [list, setlist] = useState([]);
  const monthdata = salesState.currentMonthData;
  const [selectedYear, setSelectedYear] = useState('');
  const [month, setMonth] = useState(false);

  const [breakoutMonth, setBreakoutMonth] = useState('All');
  const [breakoutYear, setBreakoutYear] = useState('2021');

  const [type, setType] = useState('1');

  useEffect(() => {
    dispatch(
      getStockInfo(authState.userToken, breakoutYear, breakoutMonth, type),
    );
  }, [dispatch]);

  const submitGetInfo = () => {
    if (breakoutYear == '') {
      Alert.alert('Select year', 'Please select year to continue', [
        {text: 'Okay'},
      ]);
    } else {
      if (breakoutMonth == '') {
        Alert.alert('Select month', 'Please select monthnto continue', [
          {text: 'Okay'},
        ]);
      } else {
        dispatch(
          getStockInfo(authState.userToken, breakoutYear, breakoutMonth, type),
        );
      }
    }
  };
  const contentInset = {top: 20, bottom: 20, left: 5, right: 10};

  const fill = 'rgb(134, 65, 244)';
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

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );

  const colorOfArray = [
    '#35FA87',
    '#A6A565',
    '#6D15EA',
    '#B8004A',
    '#353566',
    '#E23515',
    '#B5C722',
    '#695560',
  ];
  const pieData = salesState.stockinfo
    .filter((value) => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: randomColor(),
        onPress: () =>
          Alert.alert(
            'Details',
            value.toFixed(0) + ' Units of ' + bloodGroups[index],
            [{text: 'Okay'}],
          ),
      },
      key: `pie-${index}`,
    }));

  const lapsList = colorOfArray.map((data) => {
    return (
      <View>
        <Text>{data.time}</Text>
      </View>
    );
  });
  ///
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'column', flex: 1, marginVertical: 30}}>
          <PieChart style={{height: 300}} data={pieData} />
        </View>
        <Text style={styles.sectiontitle}> Select Year & Month</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.pickerView}>
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
              <Picker.Item label="2021" value="2021" />
              <Picker.Item label="2022" value="2022" />
              <Picker.Item label="2023" value="2023" />
              <Picker.Item label="2024" value="2024" />
              <Picker.Item label="2025" value="2025" />
            </Picker>
          </View>
          <View style={styles.pickerView}>
            <Picker
              style={{}}
              enabled={true}
              selectedValue={breakoutMonth}
              onValueChange={(val, itemIndex) => {
                setBreakoutMonth(val);
              }}>
              <Picker.Item label="All" value="All" />
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
        </View>
        <View style={{paddingHorizontal: 5, marginTop: 10}}>
          <Text style={styles.sectiontitle}>Select Type</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <View style={styles.pickerView}>
            <Picker
              style={{}}
              enabled={true}
              selectedValue={type}
              onValueChange={(val, itemIndex) => {
                setType(val);
              }}>
              <Picker.Item label="Purchases" value="2" />
              <Picker.Item label="Sales" value="1" />
            </Picker>
          </View>
          <TouchableOpacity
            onPress={() => submitGetInfo()}
            style={styles.button}>
            <Text style={styles.button_text}>Go</Text>
          </TouchableOpacity>
        </View>

        <View></View>
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
    marginLeft: 10,
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
    paddingVertical: 0,
    flex: 1,
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

    //ma
  },
  pickerView: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    width: 150,
    marginHorizontal: 20,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.primary,
  },
  button_text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: colors.additional2,
  },
});

export default Stock;
