import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TouchableHighlight
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../constants/Colors'
import {
  getmypurchasesList
} from "../../../redux/mypurchases/actions"
import Feather from 'react-native-vector-icons/Feather';

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
     <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Name:</Text>
        <Text style={styles.title}>  {item.name}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Contact No:</Text>
        <Text style={styles.title}>  {item.contact}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Date of Purchase:</Text>
        <Text style={styles.title}>  {item.dop}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Blood Group:</Text>
        <Text style={styles.title}>  {item.blood_group}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Component:</Text>
        <Text style={styles.title}>  {item.component}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Units:</Text>
        <Text style={styles.title}>  {item.units}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={[styles.title,{fontWeight:'bold'}]}>Total:</Text>
        <Text style={styles.title}> Rs {item.total}</Text>
      </View>
    </TouchableOpacity>
  );

const MyPurchases = ({navigation}) => {

    const dispatch = useDispatch();
    
    const mypurchasesFormState = useSelector((state) => state.mypurchasesFormState);
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        dispatch(getmypurchasesList());
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
              <Feather name="chevron-left" color={colors.primary} size={30} />
      </TouchableOpacity>
      <Text  style={styles.headertitle}>My Purchases</Text>
      
      </View>
            <FlatList
        data={mypurchasesFormState.list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        
      />
            
           
            
        </View>
    );
}

const styles= StyleSheet.create({
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
      title: {
        fontSize: 20,
        
      },
      header: {
        marginBottom: 20,
        backgroundColor: 'transparent',
        paddingTop: 10,
        flexDirection:'row'
    
      },
      headertitle: {
        fontSize: 40,
        backgroundColor: 'transparent',
        marginLeft:10,
        color: colors.primary,
        fontFamily: 'Montserrat-Regular',
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
    inforow:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:5,
        alignItems:'center',
        alignContent:'center'
    },
    texts:{
        fontSize:25,
        fontWeight:'bold'
    },
    text:{
        fontSize:22,
        fontWeight:'500'
    },
    infobox:{
        marginHorizontal:30,
        marginTop:50
    },
    invite:{
        marginTop:30,
        paddingHorizontal:15,
        backgroundColor:colors.primary,
        paddingVertical:10,
        borderRadius:10
    },
    invitebutton:{
        color:'white'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize:25,
        fontWeight:'bold'
      },
      modalTextmore: {
        marginBottom: 15,
        textAlign: "center",
        fontSize:20,
        
      }
})

export default MyPurchases