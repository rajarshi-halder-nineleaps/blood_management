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
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.title}>{item.email}</Text>
      <Text style={styles.title}>{item.blood_group}</Text>
      <Text style={styles.title}>{item.phoneno}</Text>
      <Text style={styles.title}>{item.addrr}</Text>
      <Text style={styles.title}>{item.district}</Text>
      <Text style={styles.title}>{item.state}</Text>
      <Text style={styles.title}>{item.pincode}</Text>
    </TouchableOpacity>
  );

const DonorList = ({navigation}) => {

    const [selectedId, setSelectedId] = useState(null);
    const finddonorFormState = useSelector((state) => state.finddonorFormState);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    
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
            <Text style={styles.header}>Donor List</Text>
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
                <TouchableOpacity style={styles.invite}>
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
        paddingHorizontal:10,
        backgroundColor:colors.primary,
        paddingVertical:10,
        borderRadius:10
    },
    invitebutton:{
        color:'white'
    }
})

export default DonorList