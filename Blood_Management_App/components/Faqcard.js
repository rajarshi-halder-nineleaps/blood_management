import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../constants/Colors';

import {
    Collapse,
    CollapseHeader,
    CollapseBody,
} from 'accordion-collapse-react-native';

const FaqCard = (props) => {
    return (
        <View>


            <View style={styles.faqCard}>
                <Collapse >
                    <CollapseHeader>
                        <View style={{ paddingHorizontal: 5, paddingVertical: 5, borderColor: colors.additional2, borderWidth: 2 }}>
                            <Text style={styles.faqQuesHeader}>{props.header}</Text>
                        </View>
                    </CollapseHeader>
                    <CollapseBody>
                        <Text style={styles.faqQuesBody}>{props.body}</Text>
                    </CollapseBody>
                </Collapse>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    faqQuesHeader: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        color: colors.primary,
    },
    faqQuesBody: {
        fontFamily: 'Montserrat-Regulars',
        fontSize: 18,
        color: colors.grayishblack,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    faqCard: {
        backgroundColor: colors.additional2,
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',

        marginVertical: 5,
        marginHorizontal: 20
    },
})

export default FaqCard;
