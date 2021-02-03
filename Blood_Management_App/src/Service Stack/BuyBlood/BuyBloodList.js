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


const Item = ({ item, onPress, style }) => (
    
    <View style={[styles.item]}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.title}>{item.address}</Text>
      <Text style={styles.title}>{item.district}</Text>
      <Text style={styles.title}>{item.state}</Text>
      <Text style={styles.title}>{item.pincode}</Text>
      <View style={styles.buttonrow}>
      <TouchableOpacity onPress={onPress} style={styles.invite}>
          <Text style={styles.invitebutton}> Buy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.invite}>
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
            style={{ backgroundColor }}
          />
        );
      };

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Blood List</Text>
            <View>
              
                
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
        fontSize:50,
        fontWeight:'300',
        marginBottom:20,
        fontFamily: 'sans-serif-condensed',
        paddingTop:30,
        backgroundColor:colors.primary,
        paddingHorizontal:30,
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