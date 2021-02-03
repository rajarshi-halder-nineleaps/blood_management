import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TouchableHighlight
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../constants/Colors'

const ConfirmBuy = ({route, navigation}) => {

    const { itemname } = route.params;
    const buybloodFormState = useSelector((state) => state.buybloodFormState);
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View style={styles.container}>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Purchase Confirmed!</Text>
            <Text style={styles.modalTextmore}> Check "My Purchases" for more info</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: colors.primary }}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate("Services")
              }}
            >
              <Text style={styles.textStyle}>OK!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
            
            <Text style={styles.header}>Confirm Buy</Text>
            <Text style={styles.header2}>{itemname}</Text>
            <View style={styles.infobox}>
            <View style ={styles.inforow}>
                <Text style={styles.texts}>Blood Group :</Text>
                <Text style={styles.text}>{buybloodFormState.inputValues.blood_group}</Text>
            </View>

            
            <View style ={styles.inforow}>
                <Text style={styles.texts}>Components :</Text>
                <Text style={styles.text}>{buybloodFormState.inputValues.blood_component}</Text>
            </View>

            <View style ={styles.inforow}>
                <Text style={styles.texts}>Units Required :</Text>
                <Text style={styles.text}>{buybloodFormState.inputValues.units}</Text>
            </View>
            
            </View>
            <View style={{justifyContent:'center', alignItems:'center', marginTop:30}}>
            <View style ={styles.inforow}>
                <Text style={styles.texts}>Total Amount:</Text>
            </View>

            <View style ={styles.inforow}>
                <Text style={styles.texts}>Rs 10,000</Text>
            </View>
            <TouchableOpacity onPress={()=> setModalVisible(true)} style={styles.invite}>
            <Text style={styles.invitebutton}>
                Confirm Buy
            </Text>
            </TouchableOpacity>
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
        fontSize:50,
        fontWeight:'300',
        
        fontFamily: 'sans-serif-condensed',
        paddingTop:30,
        backgroundColor:colors.primary,
        paddingHorizontal:30,
        color:'white'
        
        
    },
    header2:{
        fontSize:50,
        fontWeight:'300',
        
        fontFamily: 'sans-serif-condensed',
 
        backgroundColor:colors.primary,
        paddingHorizontal:30,
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

export default ConfirmBuy