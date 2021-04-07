import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import colors from '../../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Grid, YAxis, LineChart, XAxis, PieChart } from 'react-native-svg-charts'
import { Picker } from '@react-native-picker/picker';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { getCurrentMonthAnalytics, monthAnalytics } from '../../redux/sales/actions';
const Revenue = ({ navigation }) => {
  const authState = useSelector((state) => state.authState);
  const salesState = useSelector((state) => state.salesState);
  const dispatch = useDispatch();
  const data2 = [87, 66, 69, 92, 40, 61, 16, 62, 20, 93, 54, 47, 89, 44, 18]
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );

  const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const [type, setType] = useState('')

  const contentInset = { top: 20, bottom: 20, left: 10, right: 10 }
  const pieDatablood = salesState.totalPie
    .filter((value) => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: randomColor(),
        onPress: () =>
          showMessage({
            message: bloodGroups[index] + ' ' + value.toFixed(0),
            backgroundColor: colors.coolblue,
          }),
      },
      key: `pie-${index}`,
    }));
  const pieDataplasma = salesState.plasmaObjectCurrentMonth
    .filter((value) => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: randomColor(),
        onPress: () =>
          showMessage({
            message: bloodGroups[index] + ' ' + value.toFixed(0),
            backgroundColor: colors.coolblue,
          }),
      },
      key: `pie-${index}`,
    }));



  const pieDataplatelet = salesState.plateletObjectCurrentMonth
    .filter((value) => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: randomColor(),
        onPress: () =>
          showMessage({
            message: bloodGroups[index] + ' ' + value.toFixed(0),
            backgroundColor: colors.coolblue,
          }),
      },
      key: `pie-${index}`,
    }));

  // const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

  // const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

  // const pieData = data
  //   .filter((value) => value > 0)
  //   .map((value, index) => ({
  //     value,
  //     svg: {
  //       fill: randomColor(),
  //       onPress: () => console.log('press', index),
  //     },
  //     key: `pie-${index}`,
  //   }))
  const [selectedComponent, setSelectedComponent] = useState(0)

  const yr = new Date().getFullYear();
  let mon = new Date().getMonth() + 1 + '';

  if (mon.length === 1) {
    mon = '0' + mon;
  }
  let yearGraphData = salesState.yearBloodObject;

  if (selectedComponent === 0) {
    yearGraphData = salesState.yearBloodObject
  } else if (selectedComponent === 1) {
    yearGraphData = salesState.yearPlasmaObject
  } else if (selectedComponent === 2) {
    yearGraphData = salesState.yearPlateletObject
  }

  var typeOfGraph = salesState.typeOfGraph;



  const fill = 'rgb(134, 65, 244)'


  return (
    <ScrollView style={styles.container}>
      <View style={{ marginHorizontal: 20, marginTop: 30 }}>
        <Text style={styles.header}>
          Current Year
        </Text>
        <Text style={styles.stats}>
          Total :
          {salesState.typeOfGraph === 0 || salesState.typeOfGraph === 3 ? ' ₹ ' : null}
          {salesState.yearTotal}
        </Text>
        <Text style={styles.stats}>
          Blood :
          {salesState.typeOfGraph === 0 || salesState.typeOfGraph === 3 ? ' ₹ ' : null}
          {salesState.yearBloodTotal}
        </Text>
        <Text style={styles.stats}>
          Plasma :
          {salesState.typeOfGraph === 0 || salesState.typeOfGraph === 3 ? ' ₹ ' : null}
          {salesState.yearPlasmaTotal}
        </Text>
        <Text style={styles.stats}>
          Platelet :
          {salesState.typeOfGraph === 0 || salesState.typeOfGraph === 3 ? ' ₹ ' : null}
          {salesState.yearPlateletTotal}
        </Text>
      </View>
      <View style={[styles.picker2, { marginTop: 10 }]}>
        <Picker
          enabled={true}
          selectedValue={selectedComponent}
          onValueChange={(val, itemIndex) => {
            setSelectedComponent(val);

          }}>
          <Picker.Item label="Select Type" value="Select Type" />
          <Picker.Item label="Blood" value={0} />
          <Picker.Item label="Plasma" value={1} />
          <Picker.Item label="Platelet" value={2} />
        </Picker>
      </View>
      <View style={{ marginTop: 20, backgroundColor: colors.additional2, paddingHorizontal: 10, height: 200, width: Dimensions.get("screen").width, flexDirection: 'row' }}>
        <YAxis

          data={yearGraphData}
          contentInset={contentInset}
          svg={{
            fill: colors.additional1,
            fontSize: 12,
          }}
          numberOfTicks={4}
          formatLabel={(index) => `${index}`}
        />
        <View style={{ flexDirection: 'column', flex: 1 }}>
          {/* <LineChart
          style={{ flex: 1 }}
          data={salesState.plasmaObjectCurrentMonth}
          gridMin={0}
          contentInset={{ top: 10, bottom: 10 }}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
        >
          <Grid />
        </LineChart> */}
          {/* <BarChart style={{ flex: 1, left: 0, right: 0 }} data={salesState.plasmaObjectCurrentMonth} svg={{ fill }} contentInset={{ top: 20, bottom: 9, right: 5, left: 5 }}></BarChart> */}

          <BarChart style={{ height: 200, backgroundColor: colors.additional2, paddingHorizontal: 10 }} data={yearGraphData} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}>
            <Grid />
          </BarChart>
          <XAxis
            style={{ backgroundColor: colors.additional2 }}
            data={monthList}
            formatLabel={(value, index) => monthList[value]}
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 10, fill: 'black' }}
            belowChart={true}
          />

        </View>
      </View>
      <View style={{ backgroundColor: colors.additional2, flexDirection: 'row', paddingHorizontal: 15, alignContent: 'space-between', justifyContent: 'space-between', marginTop: 30 }}>
        <TouchableOpacity
          onPress={() => { dispatch(getCurrentMonthAnalytics(yr, authState.userToken, 0)) }}
          style={salesState.typeOfGraph === 0 ? styles.selected : styles.notselected}>
          <Text style={styles.chartText}>Revenue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { dispatch(getCurrentMonthAnalytics(yr, authState.userToken, 1)) }}
          style={salesState.typeOfGraph === 1 ? styles.selected : styles.notselected}>
          <Text style={styles.chartText}>Sold</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { dispatch(getCurrentMonthAnalytics(yr, authState.userToken, 2)) }}
          style={salesState.typeOfGraph === 2 ? styles.selected : styles.notselected}>
          <Text style={styles.chartText}>Bought</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { dispatch(getCurrentMonthAnalytics(yr, authState.userToken, 3)) }}

          style={salesState.typeOfGraph === 3 ? styles.selected : styles.notselected}>
          <Text style={styles.chartText}>Spent</Text>
        </TouchableOpacity>
      </View>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.additional2
  },
  header: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,

  },
  selected: {
    borderBottomColor: colors.coolblue,
    borderBottomWidth: 2,
    marginHorizontal: 5,
    // backgroundColor: colors.coolblue,

  },
  notselected: {
    borderBottomColor: colors.dutchred,
    borderBottomWidth: 2,
    marginHorizontal: 5,
    paddingTop: 5
    // backgroundColor: colors.peach
  },
  stats: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    marginHorizontal: 10,

  },
  chartText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    marginHorizontal: 5,
    marginBottom: 10
  },
  statscard: {
    backgroundColor: colors.additional2,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 10,
    borderColor: colors.additional1,
    borderWidth: 1
  },
  cardheader: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 5
  },
  cardheader2: {
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5
  },
  cardtext: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    marginVertical: 2
  },
  picker: {
    borderWidth: 1,
    borderColor: colors.dutchred,
    borderRadius: 10,
    fontFamily: 'Montserrat-Bold'

  },
  picker2: {
    borderWidth: 1,
    borderColor: colors.dutchred,

    fontFamily: 'Montserrat-Bold',
    marginHorizontal: 20

  },
  pietitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5,
    alignSelf: 'center',
    marginTop: 8
  },
  buttontext: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.peach,
    width: 100, marginVertical: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    alignItems: 'center'

  }
})

export default Revenue