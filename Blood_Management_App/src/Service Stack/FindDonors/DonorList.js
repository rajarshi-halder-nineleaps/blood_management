import React, {useState} from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TouchableHighlight
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../constants/Colors';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather';


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

      
     
    </TouchableOpacity>
  );

const DonorList = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const finddonorFormState = useSelector((state) => state.finddonorFormState);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#f9c2ff" : "white";
    
        return (
          <Item
            item={item}
            onPress={() => setSelectedId(item.id)}
            style={{ backgroundColor }}
          />
        );
      };

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
            <Text style={styles.modalText}>Invite Sent!</Text>
           

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
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" color="white" size={30} />
      </TouchableOpacity>
      <Text  style={styles.headertitle}>Donor List</Text>
      
      </View>
        
            <View>
              <View style={styles.inputView}>
                  <View style={styles.check}>
                <CheckBox
                  tintColors={{true: colors.primary, false: colors.accent}}
                  disabled={false}
                  value={finddonorFormState.selectAll}
                  onValueChange={(val) => {
                   
                  }}
                />
                <Text style={styles.tncText}>Select All</Text>
                </View>
                <TouchableOpacity style={styles.invite} onPress={()=> setModalVisible(true)}>
                    <Text style={styles.invitebutton}>Send Invite</Text>
                </TouchableOpacity>
              </View>
              
                  
                
            </View>
            <FlatList
        data={finddonorFormState.list}
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
        borderRadius:20,
        elevation:10
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
        paddingHorizontal:10,
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

export default DonorList