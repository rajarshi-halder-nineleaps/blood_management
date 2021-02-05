import React, { useState } from 'react'
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
import Feather from 'react-native-vector-icons/Feather';

const MoreInfo = ({route, navigation}) => {

    const { itemname } = route.params;
    const buybloodFormState = useSelector((state) => state.buybloodFormState);
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View style={styles.container}>
          <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" color="white" size={30} />
      </TouchableOpacity>
      <Text  style={styles.headertitle}>More Info</Text>
      <Text style={styles.header2}>{itemname}</Text>
      </View>

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
        borderRadius:20
      },
      title: {
        fontSize: 18,
        
      },
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
        color:'white'
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

export default MoreInfo