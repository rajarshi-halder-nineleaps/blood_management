import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import colors from '../../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Grid, YAxis, LineChart, XAxis, PieChart } from 'react-native-svg-charts'
import { Picker } from '@react-native-picker/picker';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { monthAnalytics } from '../../redux/sales/actions';
const Revenue = ({ navigation }) => {
  const authState = useSelector((state) => state.authState);
  const salesState = useSelector((state) => state.salesState);
  const dispatch = useDispatch();
  const data2 = [87, 66, 69, 92, 40, 61, 16, 62, 20, 93, 54, 47, 89, 44, 18]
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );



  const [type, setType] = useState('')


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

  const yr = new Date().getFullYear();
  let mon = new Date().getMonth() + 1 + '';

  if (mon.length === 1) {
    mon = '0' + mon;
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.statscard}>
        <Text style={styles.cardheader}>Current Month Statistics</Text>
        <Text style={styles.cardtext}>Total Amount Collected :  ₹ {salesState.currentMonthRevenue.totalRevenue} </Text>
        <Text style={styles.cardtext}>Total Units Sold :  {salesState.currentMonthSold.totalSold} </Text>
      </View>

      <View style={[styles.picker, { marginTop: 10 }]}>
        <Picker
          enabled={true}
          selectedValue={type}
          onValueChange={(val, itemIndex) => {
            setType(val);
            dispatch(monthAnalytics(yr, mon, authState.userToken, type));
          }}>
          <Picker.Item label="Select Type" value="Select Type" />
          <Picker.Item label="Revenue" value={0} />
          <Picker.Item label="Sold" value={1} />
          <Picker.Item label="Bought" value={2} />
          <Picker.Item label="Spent" value={3} />
        </Picker>
      </View>
      <Text style={[styles.cardheader, { marginHorizontal: 10 }]}>Component Wise Breakdown</Text>

      <PieChart style={{ height: 130 }} data={pieDatablood} />
      {type === 0 ?
        <Text style={styles.pietitle}>
          Total Revenue   ₹  {salesState.currentMonthRevenue.totalBlood} </Text>
        :
        null
      }
      {type === 1 ?
        <Text style={styles.pietitle}>
          Total Units {salesState.currentMonthSold.totalBlood} </Text>
        :
        null
      }

      <PieChart style={{ height: 130 }} data={pieDataplasma} />
      <Text style={styles.pietitle}>Total Plasma {salesState.currentMonthRevenue.totalPlasma} </Text>
      <PieChart style={{ height: 130 }} data={pieDataplatelet} />
      <Text style={styles.pietitle}>Total Platelet {salesState.currentMonthRevenue.totalPlatelet} </Text>







      <View style={styles.statscard}>
        <Text style={styles.cardheader}>Current Year Statistics</Text>
        <Text style={styles.cardtext}>Amount Collected:  ₹</Text>
        <Text style={styles.cardtext}>Units Sold:</Text>
        <Text style={styles.cardtext}>Amount Spent:  ₹</Text>
        <Text style={styles.cardtext}>Units Bought:</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate}  >
        <View style={[styles.statscard, { flexDirection: 'row', justifyContent: 'space-between' }]}>
          <Text style={styles.cardtext}>Search by Year</Text>
          <Icon name="arrow-right" color={colors.primary} size={20} />
        </View>
      </TouchableOpacity>
      <View style={[styles.statscard, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <Text style={styles.cardtext}>Search by Year and Month</Text>
        <Icon name="arrow-right" color={colors.primary} size={20} />
      </View>
      {/* <PieChart style={{ height: 200 }} data={pieData} /> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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