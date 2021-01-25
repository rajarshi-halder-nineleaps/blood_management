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

const SplashScreen = ({navigation}) => {
    return(
        <SafeAreaView style={styles.container}>
        
            <View style={{alignSelf:"center", alignItems:'center', paddingTop:200}}>
            
                <View style={styles.profileImage}>
                    <Image source={require("../../assets/blood.png")} style={styles.image} resizeMode="center"></Image>
                </View>
               
                <Text style={styles.text}>Red Bank</Text>
                
            
            
            </View>
            
            
        <View style= {styles.button}>
                    <TouchableOpacity
                    style={styles.signIn}
                    onPress={() =>{navigation.navigate("LoginScreen")}}
                    >
                    
                        <Text style={[styles.textSign, {color:"white"},]} >Get Started</Text> 
                    
                    </TouchableOpacity>
                    </View>


    
        
        </SafeAreaView>
    );
}

const {height} = Dimensions.get("screen");
const height_logo = height *0.20;
const WIDTH = Dimensions.get('window').width;


const styles = StyleSheet.create({
    signIn:{
        width:WIDTH-40,
        height:60,
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
    container:{
        flex:1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    text:{
        color:'#FB5959',
        marginTop:30,
        alignSelf:"center",
        fontWeight:'bold',
        fontSize:30,
        fontFamily:'serif'
    },
    button:{
        alignItems:'flex-end',
        marginTop:30,
        alignSelf:"center",
        alignItems:"center",
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36, width:WIDTH,
        borderTopEndRadius:10,

    },

   
    profileImage:{
        width:200,
        height:200,
        overflow:"hidden",
        
    },
    image:{
        flex:1,
        width:undefined,
        height:undefined

    },
});


export default SplashScreen