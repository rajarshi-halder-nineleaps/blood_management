import React, {useState} from 'react'
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

const enterotp = ({navigation}) => {

    const [otp,setOtp] = useState("")
    const [isValidOtp,setisValidOtp]= useState(true)

    const handleOTP = (val) => {
        let reg =  /^\d{4}$/;
        if (reg.test(val) == true){
            setOtp(val);
            setisValidOtp(true)
            
        } else{
            setOtp(val);
            setisValidOtp(false)
        }
    }

    const handleSubmit = () => {
        if(otp ==""){
            setisValidOtp(false)
        }else{
            if (isValidOtp==true){
                navigation.navigate("ResetPassword")
            }
        }
        
    }




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
                <Text style={styles.titlefont}>Find The Code</Text>

                <Text style={styles.titlefontdesc}>Check your mailbox for One-Time-Password sent for verification</Text>
                
                <TextInput
                    keyboardType="numeric"
                    style={[styles.input, {marginTop:30}]} 
                    placeholder='Code'
                    onChangeText={(val)=>handleOTP(val)}
                    />
                    {isValidOtp?
                    null:
                    <Text style={styles.errorMsg} >Should be  Valid OTP</Text>

                    }

               

                    

                    <View style= {styles.button}>
                    <TouchableOpacity
                    style={styles.signIn}
                    onPress={() =>handleSubmit()}
                    >
                    
                        <Text style={[styles.textSign, {color:"white"},]} >Next</Text> 
                    
                    </TouchableOpacity>
                    </View>

                   

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
    titlefontdesc:{
        fontSize:20,
        fontWeight:'500'
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


export default enterotp