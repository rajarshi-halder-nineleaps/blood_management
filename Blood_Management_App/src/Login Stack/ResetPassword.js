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


const resetpassword = ({navigation}) => {
    const [password,setPassword] = useState('')
    const [cpassword,setcPassword] = useState('')
    const [isValidpassword,setisValidP] = useState(true)
    const [isValidcpass,setisValidCP] = useState(true)

    const handlepassword = (val) => {
        let reg= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
        if (reg.test(val) == true){
            setPassword(val);
            setisValidP(true)
            
        } else{
            setPassword(val);
            setisValidP(false)
        }

    }

    const handlecpassword = (val) => {

        if (val == password){
            setcPassword(val)
            setisValidCP(true)
        }
        else{
            setcPassword(val)
            setisValidCP(false)
        }

    }
    const handleSubmit = () => {
        if (password == "" && cpassword==""){
            setisValidP(false)
            setisValidCP(false)
            
        }
        else{
            if(isValidpassword == true && isValidcpass==true){
                navigation.navigate("LoginScreen")

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
                <Text style={styles.titlefont}>Reset Password</Text>

                <Text style={styles.titlefontdesc}>Please create a new password below</Text>
                
                <TextInput
                    keyboardType='default'
                    style={[styles.input, {marginTop:30}]} 
                    placeholder='Password'
                    onChangeText={(val) => handlepassword(val)}
                    />

                    {isValidpassword?
                    null:
                    <Text style={styles.errorMsg} >Enter a Valid Password</Text>
                    }



                <TextInput
                    keyboardType='default'
                    style={[styles.input, {marginTop:30}]} 
                    placeholder='Confirm Password'
                    onChangeText={(val) => handlecpassword(val)}
                    />
                    {isValidcpass?
                    null:
                    <Text style={styles.errorMsg} >Password doesn't match</Text>
                    }

               

                    

                    <View style= {styles.button}>
                    <TouchableOpacity
                    style={styles.signIn}
                    onPress={() =>handleSubmit()}
                    >
                    
                        <Text style={[styles.textSign, {color:"white"},]} >Set Password</Text> 
                    
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


export default resetpassword