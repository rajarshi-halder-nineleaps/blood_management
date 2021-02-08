import React, {useState} from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../constants/Colors';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather';

const Item = ({ item, onPress, onPressmoreinfo, style }) => (
    
    <View style={[styles.item]}>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Name:</Text>
        <Text style={styles.title}>  {item.name}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Address:</Text>
        <Text style={styles.title}>  {item.address}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Blood Group:</Text>
        <Text style={styles.title}>  {item.blood_group}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Phone no:</Text>
        <Text style={styles.title}>  {item.phoneno}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Address:</Text>
        <Text style={styles.title}>  {item.addrr}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>District:</Text>
        <Text style={styles.title}>  {item.district}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>State:</Text>
        <Text style={styles.title}>  {item.state}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Pincode:</Text>
        <Text style={styles.title}>  {item.pincode}</Text>
      </View>

      <View style={styles.buttonrow}>
      <TouchableOpacity onPress={onPress} style={styles.invite}>
          <Text style={styles.invitebutton}> Buy</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressmoreinfo} style={styles.invite}>
          <Text style={styles.invitebutton}> More Info</Text>
      </TouchableOpacity>
      </View>
      
    </View>
    
  );

const BuyBloodList = ({navigation}) => {

    const [selectedId, setSelectedId] = useState(null);
    const buybloodFormState = useSelector((state) => state.buybloodFormState);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    
        return (
          <Item
            item={item}
            onPress={() => navigation.navigate("Confirm Buy", {
                itemname:item.name
            })}
            onPressmoreinfo ={()=> navigation.navigate("More Info", {
              itemname:item.name
          })}
            style={{ backgroundColor }}
          />
        );
      };

    return(
        <View style={styles.container}>
            <View style={styles.header}>
      
      </View>
            <FlatList
        data={buybloodFormState.list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
        </View>
    )
}

const styles= StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        paddingHorizontal:30,
        marginHorizontal:20,
        borderRadius:20
      },
      title: {
        fontSize: 18,
        
      },
      header:{
        marginBottom:20,
        
        paddingHorizontal:30,
        paddingTop:10,
        
    },
    headertitle:{
      fontSize:50,
        fontWeight:'bold',
        marginBottom:20,
        backgroundColor:colors.primary,
        fontFamily: 'sans-serif-condensed',      
        paddingTop:10,
        color:'white'
    },
    container:{
        
        flex:1
    },
    inputView: {
       paddingHorizontal:20,
       marginBottom:20,
        width: '100%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between'
      },
    check:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    invite:{
        paddingHorizontal:15,
        backgroundColor:colors.primary,
        paddingVertical:10,
        borderRadius:10
    },
    invitebutton:{
        color:'white'
    },
    buttonrow:{
        flexDirection:'row',
        marginTop:10,
        justifyContent:'space-around'
    }
})

export default BuyBloodList