/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../../constants/Colors';
import font from '../../../'
import { updateMonth, updateYear } from '../../../redux/sales/actions';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
const SalesAnalytics = () => {
  const salesState = useSelector((state) => state.salesState);
  const dispatch = useDispatch(); sf

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}> Select Year</Text>
        <View style={styles.pickerView}>
          <Picker

            selectedValue={salesState.selectedYear}
            onValueChange={(val, itemIndex) => {
              dispatch(updateYear(val))

            }}>
            <Picker.Item label="January" value="January" />
            <Picker.Item label="Feb" value="Feb" />

          </Picker>
        </View>

        <Text style={styles.header_text}> Select Month</Text>
        <View style={styles.pickerView}>
          <Picker

            selectedValue={salesState.selectedMonth}
            onValueChange={(val, itemIndex) => {
              dispatch(updateMonth(val))

            }}>
            <Picker.Item label="January" value="January" />
            <Picker.Item label="Feb" value="Feb" />

          </Picker>
        </View>
        <TouchableOpacity
          style={styles.button}>
          <Text style={styles.button_text}> Find </Text>
        </TouchableOpacity>
      </View>



      <Text>Total sales made: {salesState.analyticsData.totalSales}</Text>
      <Text>Total sales tarrif: {salesState.analyticsData.totalAmount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {


  },
  header: {
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header_text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18
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
    borderWidth: 1,
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
