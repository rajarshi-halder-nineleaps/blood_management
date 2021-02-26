/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../../constants/Colors';
import font from '../../../'
import { updateMonth, updateYear } from '../../../redux/sales/actions';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as figures from '../../../assets/salesanalytics.json';
import { useState } from 'react/cjs/react.development';

const SalesAnalytics = () => {
  const salesState = useSelector((state) => state.salesState);
  const dispatch = useDispatch();
  const data = figures.analytics;
  const [selectedyearindex, setselectedyearindex] = useState(0);
  const [list, setlist] = useState([])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
      </View>



      <Text>Total sales made:sd {list.monthname}</Text>
      <Text>Total sales tarrif: {list.totalunitssold}</Text>
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
