import React from 'react'
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity

} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

import Feather from 'react-native-vector-icons/Feather';

const LoginScreen = ({navigation}) => {
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Feather
                            name= "chevron-left"
                            color= 'black'
                            size= {30} 
                            style={{}}
                        />
                    </TouchableOpacity >
            </View>
            <View style={styles.body}>
                <Text style={styles.titlefont}>Login</Text>
                
                <TextInput
                    keyboardType="email-address" 
                    style={styles.input} 
                    placeholder='Email'
                    />


            </View>

            
        </SafeAreaView>
    );
}

const {height} = Dimensions.get("screen");
const height_logo = height *0.20;
const WIDTH = Dimensions.get('window').width;


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
        
        
    },
    header:{
        flex:0.1,
        paddingHorizontal:20,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center'
    },
    body:{
        flex:0.9,
        paddingHorizontal:20,
        paddingVertical:20
        
    },
    titlefont:{
        fontSize:40,
        fontWeight:'bold'
    },
    input:{
        
        borderColor:"#9D005B",
        borderWidth:1,
        paddingTop:10,
        marginVertical:20,
        
        
        
        fontSize:18,
        fontFamily:'sans-serif-condensed',
        paddingHorizontal:10,
        color:"black"
    },
   
});


export default LoginScreen