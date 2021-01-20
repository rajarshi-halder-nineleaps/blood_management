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
                            name= "arrow-left-circle"
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
                    style={[styles.input, {marginTop:30}]} 
                    placeholder='Email'
                    />

                <TextInput
                    keyboardType='default' 
                    style={styles.input} 
                    placeholder='password'
                    secureTextEntry={true}
                    />

                    <TouchableOpacity onPress={() =>navigation.navigate("FindAccount")}>
                        <Text style={{fontWeight:'bold'}}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    <View style= {styles.button}>
                    <TouchableOpacity
                    style={styles.signIn}
                    onPress={() =>{navigation.navigate("LoginScreen")}}
                    >
                    
                        <Text style={[styles.textSign, {color:"white"},]} >Login</Text> 
                    
                    </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                    style={{alignItems:'center', marginTop:20}}
                    onPress={() =>navigation.navigate("SplashScreen")}>
                        <Text style={{fontSize:20, fontWeight:'bold'}}>
                            New user? Register Now
                        </Text>
                    </TouchableOpacity>

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
        flex:0.8,
        paddingHorizontal:40,
        paddingVertical:20,
        justifyContent:'center'
        
    },
    titlefont:{
        fontSize:40,
        fontWeight:'bold'
    },
    input:{
        
        borderColor:"#FB5959",
        borderWidth:1,
        paddingTop:10,
        marginVertical:20,
        
        
        
        fontSize:18,
        fontFamily:'sans-serif-condensed',
        paddingHorizontal:10,
        color:"black"
    },
    button:{
        marginTop:30,
    },
    signIn:{
        width:WIDTH-80,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        backgroundColor:'#FB5959'
    },
    textSign:{
        fontSize:25,
        fontWeight:'bold',
        fontFamily:'serif'
    },
   
});


export default LoginScreen