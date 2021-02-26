import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../../constants/Colors';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather';
import { getdonationdetails, expirerequest, verifydonor } from '../../../redux/activedonorrequest/actions'
//import BuyBloodListCard from '../../../components/BuyBloodListCard'
import DonorRequestDetailsCard from '../../../components/DonorRequestDetailsCard';

const DonationRequestList = ({ navigation, route }) => {
    const { donationId } = route.params;
    const [selectedId, setSelectedId] = useState(null);
    const activedonorFormState = useSelector((state) => state.activedonorFormState);
    const authState = useSelector((state) => state.authState);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getdonationdetails(authState.userToken, donationId));
    }, [dispatch]);


    const renderItem = ({ item }) => {


        return (
            <DonorRequestDetailsCard item={item} onPress={() => dispatch(verifydonor(authState.userToken, item.userId, donationId))} />

        );
    };



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text> Update Drive Status </Text>

                <TouchableOpacity style={styles.typeView} onPress={() => dispatch(expirerequest(authState.userToken, donationId))}>
                    <Text style={styles.invitebutton}>Expire Drive</Text>
                </TouchableOpacity>

            </View>
            <FlatList
                data={activedonorFormState.donorDetailsList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        paddingHorizontal: 30,
        marginHorizontal: 20,
        borderRadius: 20
    },
    title: {
        fontSize: 18,

    },
    header: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 10,

    },
    headertitle: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 20,
        backgroundColor: colors.primary,
        fontFamily: 'sans-serif-condensed',
        paddingTop: 10,
        color: 'white'
    },
    container: {

        flex: 1
    },
    inputView: {
        paddingHorizontal: 20,
        marginBottom: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    check: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    invite: {
        paddingHorizontal: 15,
        backgroundColor: colors.primary,
        paddingVertical: 10,
        borderRadius: 10
    },
    invitebutton: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
    },
    buttonrow: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around'
    },
    typeView: {
        backgroundColor: colors.moderategray,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        marginRight: 30,
    },
})

export default DonationRequestList