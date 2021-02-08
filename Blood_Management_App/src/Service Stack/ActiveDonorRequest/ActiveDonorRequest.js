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
import renderItem from '../../../components/DonorRequestCard';

const ActiveDonorRequest = ({navigation}) => {

    const dispatch = useDispatch();
    const activedonorFormState = useSelector((state) => state.activedonorFormState);

    useEffect(() => {
        dispatch(getactivedonorList());
      }, [dispatch]);

      
    return(
        <View style={styles.container}>
             <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" color={colors.primary} size={30} />
      </TouchableOpacity>
      <Text  style={styles.headertitle}>Donor Request</Text>
      
      </View>
      <FlatList
        data={activedonorFormState.donorList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        
      />
        </View>
    )
}

const styles = StyleSheet.create({
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