import React from 'react'
import { useState, useContext, useReducer } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity, Alert

} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from "../../components/context";


const UPDATE_FIELDS = "UPDATE_FIELDS";
const BLUR_FIELDS = "BLUR_FIELDS";

const loginReducer = (state, action) =>{
    switch(action.type){
        case UPDATE_FIELDS:{  
                const newInputValue = {...state.inputValues, [action.fieldId]: action.val};
                const newInputValidity = {...state.inputValidity, [action.fieldId]: action.isValid};
                return {...state, inputValues: newInputValue, inputValidity: newInputValidity};
        }

        case BLUR_FIELDS: {
            const newInputIsTouched = {...state.isTouched, [action.fieldId]: true};
            return{ ...state, isTouched: newInputIsTouched }
        }
        default: return state;
    }
};


const LoginScreen = ({navigation}) => {
    const {signIn} = useContext(AuthContext);

    const [data, formDispatch] = useReducer(loginReducer, {
        inputValues:{
            email: "",
            password: ""
        },
        inputValidity: {
            email: false,
            password: false,
        },
        isTouched: {
            email: false,
            password: false,
        }
    });

    const onSubmitHandler = () =>{
       if(data.inputValidity.email && data.inputValidity.password){
           signIn(data.inputValues.email,data.inputValues.password);

        }else{
            Alert.alert('Invalid Credentials','Entered Email or Password is Incorrect', [
                {text: 'Okay'}
              ])
        }
    }


    const blurListener = (fieldId) =>{
        formDispatch({type: BLUR_FIELDS, fieldId: fieldId});
    };



    //? FUNCTION TO CHECK VALIDITY.
    const checkValidity = (val, fieldId) =>{
        let isValid = true;
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
         if(fieldId === "email" && !emailRegex.test(String(val).toLowerCase())){
            isValid=false;
         }

        if(fieldId === "password" && !passwordRegex.test(String(val))){
                isValid=false;
            }

        formDispatch({type: UPDATE_FIELDS, val: val, fieldId: fieldId, isValid: isValid});
    };




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
                    value = {data.inputValues.email}
                    keyboardType="email-address" 
                    style={[styles.input, {marginTop:30}]} 
                    placeholder='Email'
                    onChangeText = {(val) => checkValidity(val, "email")}
                    onBlur = {() =>{blurListener("email")}}
                    />
                    {!data.inputValidity.email && data.isTouched.email && <Text>Invalid email address!</Text>}
                    

                <TextInput
                    value = {data.inputValues.password}
                    keyboardType='default' 
                    style={styles.input} 
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText = {(val) => checkValidity(val, "password")}
                    onBlur = {() =>{blurListener("password")}}
                    />
                    {!data.inputValidity.password && data.isTouched.password && <Text>Invalid password!</Text>}
                    <TouchableOpacity onPress={() =>navigation.navigate("FindAccount")}>
                        <Text style={{fontWeight:'bold'}}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    <View style= {styles.button}>
                    <TouchableOpacity
                    style={styles.signIn}
                    onPress={() =>onSubmitHandler()}
                    >
                    
                        <Text style={[styles.textSign, {color:"white"},]} >Login</Text> 
                    
                    </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                    style={{alignItems:'center', marginTop:20}}
                    onPress={() =>navigation.navigate("RegisterScreen")}>
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