/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../../constants/Colors';
import font from '../../../'
import { getCurrentMonthAnalytics, updateMonth, updateYear } from '../../../redux/sales/actions';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as figures from '../../../assets/salesanalytics.json';



import {
  PieChart,
  BarChart,
  StackedBarChart,
  LineChart
} from "react-native-chart-kit";
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';

const SalesAnalytics = ({ navigation }) => {
  const authState = useSelector((state) => state.authState);
  const salesState = useSelector((state) => state.salesState);
  const dispatch = useDispatch();
  //const data = figures.analytics;
  const [selectedyearindex, setselectedyearindex] = useState(0);
  const [list, setlist] = useState([])
  const monthdata = salesState.currentMonthData;
  const [selectedMonth, setSelectedMonth] = useState("")


  useEffect(() => {
    dispatch(getCurrentMonthAnalytics(new Date().getMonth(), authState.userToken));
  }, [dispatch]);


  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    showLegend: 0, // optional
    barRadius: 0,
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.header_text}> Select Year</Text>
        <View style={styles.pickerView}>
          <Picker

            selectedValue={salesState.selectedYear}
            onValueChange={(val, itemIndex) => {
              dispatch(updateYear(val))
              setselectedyearindex(itemIndex);

            }}>
            {data.map((item, id) => (
              <Picker.Item label={item.year} value={item.year} key={id} />
            ))}


          </Picker>
        </View>

        <Text style={styles.header_text}> Select Month</Text>
        <View style={styles.pickerView}>
          <Picker

            selectedValue={salesState.selectedMonth}
            onValueChange={(val, itemIndex) => {
              dispatch(updateMonth(val))
              setlist(data[itemIndex].month)

            }}>
            {data[selectedyearindex].month.map((item, id) => (
              <Picker.Item label={item.monthname} value={item.monthname} key={item.monthname} />
            ))}

          </Picker>
        </View>
        <TouchableOpacity
          onPress={() => console.log("hi", list)}
          style={styles.button}>
          <Text style={styles.button_text}> Find </Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
          <View style={styles.header_text}>
            <Text style={styles.sectiontitle}>Current Month</Text>
            <Text style={styles.sectiontext}>Amount Collected: Rs {list.monthname}</Text>
            <Text style={styles.sectiontext}>Units sold: Rs {list.monthname}</Text>
            <Text style={styles.sectiontext}>Units board: Rs {list.monthname}</Text>
          </View>
          <View style={styles.iconview}>
            <Icon name="superpowers" color={colors.primary} size={30} />
            <Text style={styles.refreshText}>Refresh</Text>
          </View>
        </View>
        <View style={styles.graphView}>
          {salesState.currentMonthSuccess &&
            <StackedBarChart
              style={styles.graphStyle}
              data={salesState.currentMonthData}
              width={screenWidth}
              height={300}
              chartConfig={chartConfig}
              withVerticalLabels={true}
              withHorizontalLabels={true}
            />
          }

        </View>
        <View>

        </View>
        <View>
          <View style={styles.secondaryHeader}>
            <Text style={styles.header_text}>Search By Month</Text>
          </View>

          <View style={styles.searchbox}>
            <View style={styles.pickerView}>

              <Picker
                enabled={true}
                selectedValue={selectedMonth}
                onValueChange={(val, itemIndex) => {
                  setSelectedMonth(val)
                  // blurListener('blood_group');
                  // checkValidity(val, 'blood_group');
                }}>
                <Picker.Item
                  label="Select Month"
                  value="Select Month"
                />
                <Picker.Item label="January" value="1" />
                <Picker.Item label="February" value="2" />
                <Picker.Item label="March" value="3" />
                <Picker.Item label="April" value="4" />
                <Picker.Item label="May" value="5" />
                <Picker.Item label="June" value="6" />
                <Picker.Item label="July" value="7" />
                <Picker.Item label="August" value="8" />
                <Picker.Item label="September" value="9" />
                <Picker.Item label="October" value="10" />
                <Picker.Item label="November" value="11" />
                <Picker.Item label="December" value="12" />
              </Picker>

            </View>
            <TouchableOpacity
              style={styles.button}>
              <Text style={styles.buttontitle}>
                Get Started
            </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(getSelectedMonth(selectedMonth))}
              style={styles.button}>
              <Text style={styles.buttontitle}>
                Get Started
            </Text>
            </TouchableOpacity>
            <Text>
              Find Now!
            </Text>
            <LineChart
              data={data}
              width={screenWidth}
              height={256}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
            />


          </View>
        </View>
      </View>
    </ScrollView >
  );
};

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {


  },
  buttontitle: {
    color: colors.darkPrimary,
    fontWeight: '800',
    fontSize: 20,
    fontFamily: 'Montserrat-Regular'
  },
  searchbox: {
    marginHorizontal: 20,

    justifyContent: 'space-between'
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
  pickerRow: {

  },
  iconview: {
    alignItems: 'center'
  },
  box: {
    backgroundColor: colors.primary,
    width: 150
  },
  sectiontitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    marginLeft: 10,
    marginTop: 0
  },
  sectiontext: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 2
  },
  graphStyle: {


  },
  graphView: {
    marginTop: 10
  },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
  secondaryHeader: {
    backgroundColor: "white",
    paddingHorizontal: 0,
    marginBottom: 10,
    paddingHorizontal: 20
  },
  header_text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,

    //ma
  },
  pickerView: {
    marginVertical: 5,
    paddingVertical: 3,
    borderColor: colors.grayishblack,
    borderWidth: 1,

    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 10,
    color: 'black',
  },
  button: {
    alignSelf: 'flex-end',
    borderWidth: 2,
    borderColor: colors.primary,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,

  },
  button_text: {

    fontFamily: 'Montserrat-Regular',
    fontSize: 18
  }

})

export default SalesAnalytics;
