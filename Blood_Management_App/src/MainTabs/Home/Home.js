/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView,ScrollView, View, Text, Dimensions, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import colors from '../../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux'
import { FlatListSlider } from 'react-native-flatlist-slider'
import HomeSlider from '../../../components/HomeSlider'
import Icon from 'react-native-vector-icons/FontAwesome'

import {fetchCommitments} from '../../../redux/commitments/actions';
import {getInventory} from '../../../redux/inventory/actions';
import {fetchSalesData} from '../../../redux/sales/actions';
import {
  PieChart,
  BarChart,
} from "react-native-chart-kit";
import { color } from 'react-native-reanimated';
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

const piedata = [
  {
    name: "Whole Blood",
    quantity: 1012,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Plasma",
    quantity: 1243,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Platelet",
    quantity: 527,
    color: colors.moderategray,
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "RBC",
    quantity: 853,
    color: colors.dutchred,
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "WBC",
    quantity: 1190,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];

const images = [
  {
    image: 'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    desc: 'Silent Waters in the mountains in midst of Himilayas',
  },
  {
    image: 'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc:
      'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
]
const chartConfig = {
  backgroundGradientFrom: colors.additional2,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: colors.additional2,
  backgroundGradientToOpacity: 10,
  color: (opacity = 1) => `rgba(134, 8, 38, ${opacity})`,
  strokeWidth: 100, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};



const Home = ({ navigation }) => {
  const authState = useSelector((state) => state.authState);
  const userType = authState.userType;
  const dispatch = useDispatch()
  
  const salesHandler = () => {
    dispatch(fetchSalesData(authState.userToken));
    navigation.navigate('services', { screen: 'sales' })
    navigation.navigate('sales');
  };

  const myCommitmentsHandler = () => {
    dispatch(fetchCommitments(authState.userToken));
    navigation.navigate('services', { screen: 'commitments' })
  };
  
  const inventoryHandler = () => {
    dispatch(getInventory(authState.userToken));
    navigation.navigate('services', { screen: 'inventory' })
  };

  const myDrivesHandler = () => {
    dispatch(getDriveData(authState.userToken));
    navigation.navigate('services', { screen: 'myDrives' })
  };
  return (
    <ScrollView
      style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImage}>
          <Image
            style={styles.image}
            resizeMode='center'
            source={require("../../../assets/images/account/avatar.png")} />
        </View>
        <View style={styles.userinfo}>
          <Text style={styles.name}>Name Title</Text>

          <Text style={styles.other}>
            {userType === 0 ? "Individual" : null}
            {userType === 1 ? "Hospital" : null}
            {userType === 2 ? "Blood Bank" : null}
          </Text>
          <Text style={styles.other}>#SDA15426</Text>
        </View>
      </View>
      <View>
        <Text style={styles.sectiontitle}>Our Achievements</Text>
        <FlatListSlider
          data={images}
          width={350}
          timer={5000}
          component={<HomeSlider />}
          onPress={{}}
          indicatorActiveWidth={50}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          indicatorContainerStyle={{ position: "absolute", bottom: 10 }} />
      </View>
      <View style={styles.donateblood}>
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
          <Text style={styles.title}>
            {userType === 0 ? "Donate Blood" : "Organize Drive"}
            
            </Text>
          <Icon name="tint" size={20} color={colors.primary} />
        </View>
        <TouchableOpacity
          style={styles.button}>
          <Text style={styles.buttontitle}>
            Get Started
            </Text>
        </TouchableOpacity>
      </View>
      <View>
      <Text style={styles.sectiontitle}>Our Services</Text>
      <ScrollView
      style={styles.services}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
        <TouchableOpacity onPress={() =>navigation.navigate('services', { screen: "Buy Blood" })} >
          <View style={styles.card}>
            <Icon name="tint" size={20} color={colors.additional2} />
            <Text style={styles.cardtitle}>Buy</Text>
            <Text style={styles.cardtitle}>Blood</Text>
          </View>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('services', { screen: 'Find Donors' })}>
          <View style={styles.card}>
            <Icon name="tint" size={20} color={colors.additional2} />
            <Text style={styles.cardtitle}>Find</Text>
            <Text style={styles.cardtitle}>Donors</Text>
          </View>
          </TouchableOpacity>

          
          {userType === 0 ? 
          <>
           <TouchableOpacity onPress={() =>myCommitmentsHandler()} >
          <View style={styles.card}>
            <Icon name="tint" size={20} color={colors.additional2} />
            <Text style={styles.cardtitle}>My</Text>
            <Text style={styles.cardtitle}>Commitments</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('services', { screen: 'upcomingDrivesSearch' })} >
          <View style={styles.card}>
            <Icon name="tint" size={20} color={colors.additional2} />
            <Text style={styles.cardtitle}>Upcoming</Text>
            <Text style={styles.cardtitle}>Drives</Text>
          </View>
          </TouchableOpacity>
          </>
          :
          <>
          <TouchableOpacity onPress={()=> inventoryHandler()}>
          <View style={styles.card}>
            <Icon name="tint" size={20} color={colors.additional2} />
            <Text style={styles.cardtitle}>My</Text>
            <Text style={styles.cardtitle}>Inventory</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => myDrivesHandler()}></TouchableOpacity>
          <View style={styles.card}>
          <Icon name="tint" size={20} color={colors.additional2} />
          <Text style={styles.cardtitle}>My</Text>
          <Text style={styles.cardtitle}>Drives</Text>
        </View>
        </>
          }
          {userType == 2 ?
          <TouchableOpacity onPress={() => salesHandler()}>
          <View style={styles.card}>
          <Icon name="tint" size={20} color={colors.additional2} />
          <Text style={styles.cardtitle}>My</Text>
          <Text style={styles.cardtitle}>Sales</Text>
        </View>
        </TouchableOpacity> :
        null
        }
          
      </ScrollView>
      <Text style={styles.sectiontitle}>Statistics</Text>
      <BarChart
  style={styles.graphStyle}
  data={data}
  width={screenWidth-30}
  height={220}
  yAxisLabel="Rs"
  chartConfig={chartConfig}
  verticalLabelRotation={30}
/>
<Text style={styles.sectiontitle}>Blood Inventory</Text>

<PieChart
  data={piedata}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
  accessor={"quantity"}
  backgroundColor={"transparent"}
  
  center={[0, 0]}
  absolute
/>
      </View>
      

    </ScrollView>
  );
};

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {

  },
  header: {
    backgroundColor: colors.grey,
    width: "100%",
    height: 140,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: colors.additional2,
    borderWidth: 2,
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 20
  },
  name: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.additional2
  },
  other: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: colors.additional2
  },
  sectiontitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    marginLeft: 10,
    marginTop: 10
  },
  donateblood: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 70,
    backgroundColor: 'transparent',
    alignItems: 'center',

  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10
  },
  title: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    fontFamily: 'Montserrat-Regular'
  },
  buttontitle: {
    color: colors.additional2,
    fontWeight: '800',
    fontSize: 20,
    fontFamily: 'Montserrat-Regular'
  },
  card:{
    backgroundColor:colors.primary,
    height:120,
    width:120,
    marginHorizontal:15,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    
  },
  services:{
    marginTop:10,
  },
  cardtitle:{
    fontSize:18,
    fontWeight:'bold',
    color:colors.additional2,
    alignContent:'center',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    fontFamily: 'Montserrat-Regular',
  }

})

export default Home;
