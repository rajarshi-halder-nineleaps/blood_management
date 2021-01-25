import React from 'react'
import {
    View,
    Text,
    TouchableOpacity

} from 'react-native'
import {AuthContext} from '../../components/context'

const Home = ({navigation}) => {
    const {signOut} = React.useContext(AuthContext);
    return(
        <View style={{flex:1,justifyContent:"center", alignContent:'center',  alignItems:'center'}}>
            <Text>
                Home
            </Text>
            <TouchableOpacity onPress={()=>signOut()} >
                    <Text style={{fontFamily:"sans-serif-condensed"}}>Logout</Text>
                </TouchableOpacity>
        </View>
    );
}

export default Home