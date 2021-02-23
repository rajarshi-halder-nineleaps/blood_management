import React, { useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native'
import colors from '../../../constants/Colors'
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {
    getactivedonorList
} from '../../../redux/activedonorrequest/actions'


const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Name:</Text>
        <Text style={styles.title}>  {item.name}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Email:</Text>
        <Text style={styles.title}>  {item.email}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Blood Group:</Text>
        <Text style={styles.title}>  {item.blood_group}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Phone no:</Text>
        <Text style={styles.title}>  {item.contact}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Has Given Blood:</Text>
        <Text style={styles.title}>  {item.hasgiven}</Text>
      </View>
      
    </TouchableOpacity>
  );

const ActiveDonorRequest = ({navigation}) => {

    const dispatch = useDispatch();
    const activedonorFormState = useSelector((state) => state.activedonorFormState);

    useEffect(() => {
        dispatch(getactivedonorList());
      }, [dispatch]);

      const renderItem = ({ item }) => {
        const backgroundColor =  "white";
    
        return (
          <Item
            item={item}
            
            style={{ backgroundColor }}
          />
        );
      };

    return(
        <View style={styles.container}>
             <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" color="white" size={30} />
      </TouchableOpacity>
      <Text  style={styles.headertitle}>Active Donor Request</Text>
      
      </View>
      <FlatList
        data={activedonorFormState.list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        
      />
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        marginBottom:20,
        backgroundColor:colors.primary,
        paddingHorizontal:30,
        paddingTop:10,    
    },
    headertitle:{
      fontSize:50,
        fontWeight:'bold',
        backgroundColor:colors.primary,
        fontFamily: 'sans-serif-condensed',      
        paddingTop:10,
        color:'white',
        paddingBottom:20
    },
    header2:{
      fontSize:50,
      fontWeight:'500',
      marginBottom:20,
      backgroundColor:colors.primary,
      fontFamily: 'sans-serif-condensed',      
      color:'white'  
    },
    container:{
        flex:1
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        paddingHorizontal:30,
        marginHorizontal:20,
        borderRadius:20,
        elevation:10,
        paddingHorizontal:50
      },
})

export default ActiveDonorRequest