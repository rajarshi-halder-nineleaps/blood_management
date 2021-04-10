import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {
  BarChart,
  Grid,
  YAxis,
  LineChart,
  XAxis,
  PieChart,
} from 'react-native-svg-charts';
import {Picker} from '@react-native-picker/picker';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  getCurrentMonthAnalytics,
  monthAnalytics,
} from '../../redux/sales/actions';
const Revenue = ({navigation}) => {
  const authState = useSelector((state) => state.authState);
  const salesState = useSelector((state) => state.salesState);
  const dispatch = useDispatch();
  const data2 = [87, 66, 69, 92, 40, 61, 16, 62, 20, 93, 54, 47, 89, 44, 18];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );

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

  const contentInset = {top: 20, bottom: 20, left: 10, right: 10};

  const [selectedComponent, setSelectedComponent] = useState(0);

  const yr = new Date().getFullYear();
  let mon = new Date().getMonth() + 1 + '';

  if (mon.length === 1) {
    mon = '0' + mon;
  }
  let yearGraphData = salesState.yearBloodObject;

  if (selectedComponent === 0) {
    yearGraphData = salesState.yearBloodObject;
  } else if (selectedComponent === 1) {
    yearGraphData = salesState.yearPlasmaObject;
  } else if (selectedComponent === 2) {
    yearGraphData = salesState.yearPlateletObject;
  }

  const fill = colors.grayishblack;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsBoard}>
        <Text style={styles.header}>Current Year Stats:</Text>
        <View style={styles.statsInnerView}>
          <View style={styles.totalView}>
            <Text
              style={[
                styles.stats,
                {
                  fontSize: 20,
                  fontFamily: 'Montserrat-Bold',
                  color: colors.primary,
                },
              ]}>
              Total :
              {salesState.typeOfGraph === 0 || salesState.typeOfGraph === 3
                ? ' ₹ '
                : null}
              {salesState.yearTotal}
            </Text>
          </View>
          <View style={styles.innerStatsView}>
            <View style={styles.statDataView}>
              <Text
                style={[
                  styles.stats,
                  {color: colors.primary, fontFamily: 'Montserrat-Bold'},
                ]}>
                Blood
              </Text>
              <Text style={styles.stats}>
                {salesState.typeOfGraph === 0 || salesState.typeOfGraph === 3
                  ? ' ₹ '
                  : null}
                {salesState.yearBloodTotal}
              </Text>
            </View>
            <View style={styles.statDataView}>
              <Text
                style={[
                  styles.stats,
                  {color: colors.primary, fontFamily: 'Montserrat-Bold'},
                ]}>
                Plasma
              </Text>
              <Text style={styles.stats}>
                {salesState.typeOfGraph === 0 || salesState.typeOfGraph === 3
                  ? ' ₹ '
                  : null}
                {salesState.yearPlasmaTotal}
              </Text>
            </View>
            <View style={styles.statDataView}>
              <Text
                style={[
                  styles.stats,
                  {color: colors.primary, fontFamily: 'Montserrat-Bold'},
                ]}>
                Platelets
              </Text>
              <Text style={styles.stats}>
                {salesState.typeOfGraph === 0 || salesState.typeOfGraph === 3
                  ? ' ₹ '
                  : null}
                {salesState.yearPlateletTotal}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.picker2, {marginTop: 10}]}>
        <Picker
          enabled={true}
          selectedValue={selectedComponent}
          onValueChange={(val, itemIndex) => {
            setSelectedComponent(val);
          }}>
          {/* <Picker.Item label="Select Component" value="Select Type" /> */}
          <Picker.Item label="Blood" value={0} />
          <Picker.Item label="Plasma" value={1} />
          <Picker.Item label="Platelets" value={2} />
        </Picker>
      </View>
      <View
        style={{
          marginTop: 20,
          backgroundColor: colors.additional2,
          paddingHorizontal: 10,
          height: 200,
          width: Dimensions.get('screen').width,
          flexDirection: 'row',
        }}>
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
        <View style={{flexDirection: 'column', flex: 1}}>
          <BarChart
            style={{
              height: 200,
              backgroundColor: colors.additional2,
              paddingHorizontal: 10,
            }}
            data={yearGraphData}
            svg={{fill}}
            contentInset={{top: 30, bottom: 30}}>
            <Grid />
          </BarChart>
          <XAxis
            style={{backgroundColor: colors.additional2}}
            data={monthList}
            formatLabel={(value, index) => monthList[index]}
            contentInset={{left: 10, right: 10}}
            svg={{fontSize: 10, fill: 'black'}}
            belowChart={true}
          />
        </View>
      </View>
      <View style={styles.statsNavigatorView}>
        <TouchableOpacity
          onPress={() => {
            dispatch(getCurrentMonthAnalytics(yr, authState.userToken, 0));
          }}
          style={
            salesState.typeOfGraph === 0 ? styles.selected : styles.notselected
          }>
          <Text style={styles.chartText}>Revenue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(getCurrentMonthAnalytics(yr, authState.userToken, 1));
          }}
          style={
            salesState.typeOfGraph === 1 ? styles.selected : styles.notselected
          }>
          <Text style={styles.chartText}>Sold</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(getCurrentMonthAnalytics(yr, authState.userToken, 2));
          }}
          style={
            salesState.typeOfGraph === 2 ? styles.selected : styles.notselected
          }>
          <Text style={styles.chartText}>Bought</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(getCurrentMonthAnalytics(yr, authState.userToken, 3));
          }}
          style={
            salesState.typeOfGraph === 3 ? styles.selected : styles.notselected
          }>
          <Text style={styles.chartText}>Spent</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.additional2,
  },
  statsBoard: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  statsInnerView: {
    marginVertical: 10,
  },
  header: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
  },
  stats: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    textAlign: 'center',
    margin: 0,
  },
  totalView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerStatsView: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  statDataView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    flex: 1,
    borderRadius: 5,
  },
  notselected: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    flex: 1,
  },
  statsNavigatorView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: colors.grayishblack,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  chartText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: colors.additional2,
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
    borderWidth: 1,
  },
  cardheader: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 5,
  },
  cardheader2: {
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5,
  },
  cardtext: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    marginVertical: 2,
  },
  picker: {
    borderWidth: 1,
    borderColor: colors.dutchred,
    borderRadius: 10,
    fontFamily: 'Montserrat-Bold',
  },
  picker2: {
    borderColor: colors.grayishblack,
    borderRadius: 5,
    borderWidth: 2,
    fontFamily: 'Montserrat-Bold',
    marginHorizontal: 20,
  },
  pietitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5,
    alignSelf: 'center',
    marginTop: 8,
  },
  buttontext: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: colors.additional2,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.peach,
    width: 100,
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});

export default Revenue;
