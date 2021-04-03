/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage, hideMessage } from 'react-native-flash-message';
import colors from '../../constants/Colors';

import {
    getThisMonth,
    getCurrentMonthAnalytics,
    updateMonth,
    updateYear,
    getMonthlyBreakout,
    getStockInfo,
    monthAnalytics,
} from '../../redux/sales/actions';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
const Advanced = ({ navigation }) => {
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


    const pieDatablood = salesState.bloodObjectCurrentMonth
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

    const [breakoutYear, setBreakoutYear] = useState('');
    const [breakoutMonth, setBreakoutMonth] = useState('');
    const [type, setType] = useState('')

    const submitHandler = () => {
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
                if (type === '' || type === 'Select Type') {
                    showMessage({
                        message: 'Type required',
                        description: 'Please select Type to continue.',
                        type: 'warning',
                    });
                } else {
                    dispatch(monthAnalytics(breakoutYear, breakoutMonth, authState.userToken, type));
                    // dispatch(
                    //   getMonthlyBreakout(breakoutYear, breakoutMonth, authState.userToken),
                    // );
                }
            }
        }
    };


    return (
        <ScrollView>
            <View style={styles.statscard}>

                <Text style={[styles.cardheader, { marginBottom: 10 }]}>Advanced Search</Text>
                <View style={styles.picker}>
                    <Picker
                        style={{
                            fontFamily: 'Montserrat-Regular',
                        }}
                        enabled={true}
                        selectedValue={breakoutYear}
                        onValueChange={(val, itemIndex) => {
                            setBreakoutYear(val);
                        }}>
                        <Picker.Item label="Select Year" value="0" />
                        <Picker.Item label="2020" value="2020" />
                        <Picker.Item label="2021" value="2021" />
                        <Picker.Item label="2022" value="2022" />
                        <Picker.Item label="2023" value="2023" />
                        <Picker.Item label="2024" value="2024" />
                    </Picker>
                </View>

                <View style={[styles.picker, { marginTop: 10 }]}>
                    <Picker
                        enabled={true}
                        selectedValue={breakoutMonth}
                        onValueChange={(val, itemIndex) => {
                            setBreakoutMonth(val);
                        }}>
                        <Picker.Item label="Select Month" value="00" />
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
                <View style={[styles.picker, { marginTop: 10 }]}>
                    <Picker
                        enabled={true}
                        selectedValue={type}
                        onValueChange={(val, itemIndex) => {
                            setType(val);
                        }}>
                        <Picker.Item label="Select Type" value="Select Type" />
                        <Picker.Item label="Revenue" value={0} />
                        <Picker.Item label="Sold" value={1} />
                        <Picker.Item label="Bought" value="2" />
                        <Picker.Item label="Spent" value="3" />
                    </Picker>
                </View>
                <TouchableOpacity style={styles.button}
                    onPress={() => submitHandler()}
                >
                    <Text style={styles.buttontext}>Apply</Text>
                </TouchableOpacity>

            </View>
            {salesState.monthSearched ?
                <>
                    <View style={styles.statscard}>
                        <Text style={styles.cardheader}>Statistics Chart</Text>
                        <Text style={styles.cardtext}>Total Amount Collected :  ₹ {salesState.searchedMonthRevenue.totalRevenue} </Text>
                        <Text style={styles.cardtext}>Total Units Sold :  {salesState.searchedMonthRevenue.totalSold} </Text>
                    </View>
                    <Text style={[styles.cardheader, { marginHorizontal: 10 }]}>Component Wise Breakdown</Text>

                    <PieChart style={{ height: 130, marginTop: 10 }} data={pieDatablood} />
                    <Text style={styles.pietitle}>
                        Total Blood
                        {type === 0 ? " ₹ " : null}
                        {salesState.searchedMonthRevenue.totalBlood} </Text>
                    <PieChart style={{ height: 130 }} data={pieDataplasma} />
                    <Text style={styles.pietitle}>Total Plasma {salesState.searchedMonthRevenue.totalPlasma} </Text>
                    <PieChart style={{ height: 130 }} data={pieDataplatelet} />
                    <Text style={styles.pietitle}>Total Platelet {salesState.searchedMonthRevenue.totalPlatelet} </Text>
                </>
                :
                null
            }

        </ScrollView>
    )
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {

    },
    statscard: {
        backgroundColor: colors.additional2,
        marginHorizontal: 10,
        marginVertical: 15,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10,
        elevation: 10,
        borderColor: colors.additional1,

    },
    cardheader: {
        fontSize: 22,
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
        backgroundColor: colors.primary,
        width: 100, marginVertical: 10,
        borderRadius: 10,
        alignSelf: 'flex-end',
        alignItems: 'center'

    }
});

export default Advanced;



// const authState = useSelector((state) => state.authState);
//     const salesState = useSelector((state) => state.salesState);
//     const dispatch = useDispatch();
//     //const data = figures.analytics;
//     const [selectedyearindex, setselectedyearindex] = useState(0);
//     const [list, setlist] = useState([]);
//     const monthdata = salesState.currentMonthData;
//     const [selectedYear, setSelectedYear] = useState('');
//     const [month, setMonth] = useState(false);

//     let mon = new Date().getMonth() + 1 + '';

//     if (mon.length === 1) {
//         mon = '0' + mon;
//     }

//     const [breakoutMonth, setBreakoutMonth] = useState(mon);
//     const [breakoutYear, setBreakoutYear] = useState(new Date().getFullYear());

//     const [type, setType] = useState('1');

//     useEffect(() => {
//         dispatch(
//             getStockInfo(authState.userToken, new Date().getFullYear(), mon, type),
//         );
//     }, [dispatch]);

//     const submitGetInfo = () => {
//         if (breakoutYear === '') {
//             showMessage({
//                 message: 'Year required',
//                 description: 'Please select a year to continue.',
//                 type: 'warning',
//             });
//         } else {
//             if (breakoutMonth === '') {
//                 showMessage({
//                     message: 'Month required',
//                     description: 'Please select a month to continue.',
//                     type: 'warning',
//                 });
//             } else {
//                 dispatch(
//                     getStockInfo(authState.userToken, breakoutYear, breakoutMonth, type),
//                 );
//             }
//         }
//     };
//     const contentInset = { top: 20, bottom: 20, left: 5, right: 10 };

//     const fill = 'rgb(134, 65, 244)';
//     const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
//     const monthList = [
//         'Jan',
//         'Feb',
//         'Mar',
//         'Apr',
//         'May',
//         'Jun',
//         'Jul',
//         'Aug',
//         'Sep',
//         'Oct',
//         'Nov',
//         'Dec',
//     ];

//     const randomColor = () =>
//         ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
//             0,
//             7,
//         );

//     const colorOfArray = [
//         '#35FA87',
//         '#A6A565',
//         '#6D15EA',
//         '#B8004A',
//         '#353566',
//         '#E23515',
//         '#B5C722',
//         '#695560',
//     ];
//     const pieData = salesState.stockinfo
//         .filter((value) => value > 0)
//         .map((value, index) => ({
//             value,
//             svg: {
//                 fill: randomColor(),
//                 onPress: () =>
//                     showMessage({
//                         message: value.toFixed(0) + ' Units of ' + bloodGroups[index],
//                         backgroundColor: colors.coolblue,
//                     }),
//             },
//             key: `pie-${index}`,
//         }));

//     const lapsList = colorOfArray.map((data) => {
//         return (
//             <View>
//                 <Text>{data.time}</Text>
//             </View>
//         );
//     });
//     ///
//     return (
//         <ScrollView style={styles.container}>
//             <View style={styles.header}>
//                 <View style={{ flexDirection: 'column', flex: 1, marginVertical: 30 }}>
//                     <PieChart style={{ height: 300 }} data={pieData} />
//                 </View>
//                 <Text style={styles.sectiontitle}> Select Year & Month</Text>
//                 <View style={{ flexDirection: 'row' }}>
//                     <View style={styles.pickerView}>
//                         <Picker
//                             style={{
//                                 borderColor: colors.primary,
//                                 borderWidth: 2,
//                                 width: 130,
//                                 height: 20,
//                                 paddingBottom: 30,
//                             }}
//                             enabled={true}
//                             selectedValue={breakoutYear}
//                             onValueChange={(val, itemIndex) => {
//                                 setBreakoutYear(val);
//                             }}>
//                             <Picker.Item label="2021" value="2021" />
//                             <Picker.Item label="2022" value="2022" />
//                             <Picker.Item label="2023" value="2023" />
//                             <Picker.Item label="2024" value="2024" />
//                             <Picker.Item label="2025" value="2025" />
//                         </Picker>
//                     </View>
//                     <View style={styles.pickerView}>
//                         <Picker
//                             style={{}}
//                             enabled={true}
//                             selectedValue={breakoutMonth}
//                             onValueChange={(val, itemIndex) => {
//                                 setBreakoutMonth(val);
//                             }}>
//                             <Picker.Item label="All" value="All" />
//                             <Picker.Item label="January" value="01" />
//                             <Picker.Item label="February" value="02" />
//                             <Picker.Item label="March" value="03" />
//                             <Picker.Item label="April" value="04" />
//                             <Picker.Item label="May" value="05" />
//                             <Picker.Item label="June" value="06" />
//                             <Picker.Item label="July" value="07" />
//                             <Picker.Item label="August" value="08" />
//                             <Picker.Item label="September" value="09" />
//                             <Picker.Item label="October" value="10" />
//                             <Picker.Item label="November" value="11" />
//                             <Picker.Item label="December" value="12" />
//                         </Picker>
//                     </View>
//                 </View>
//                 <View style={{ paddingHorizontal: 5, marginTop: 10 }}>
//                     <Text style={styles.sectiontitle}>Select Type</Text>
//                 </View>
//                 <View
//                     style={{
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         marginHorizontal: 10,
//                     }}>
//                     <View style={styles.pickerView}>
//                         <Picker
//                             style={{}}
//                             enabled={true}
//                             selectedValue={type}
//                             onValueChange={(val, itemIndex) => {
//                                 setType(val);
//                             }}>
//                             <Picker.Item label="Purchases" value="2" />
//                             <Picker.Item label="Sales" value="1" />
//                         </Picker>
//                     </View>
//                     <TouchableOpacity
//                         onPress={() => submitGetInfo()}
//                         style={styles.button}>
//                         <Text style={styles.button_text}>Go</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <View></View>
//             </View>
//         </ScrollView>
//     );