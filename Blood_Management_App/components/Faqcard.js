import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
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
        <Collapse>
          <CollapseHeader>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}>
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
    borderWidth: 0,
    fontSize: 14,
    color: colors.primary,
  },
  faqQuesBody: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: colors.grayishblack,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderTopWidth: 1,
    paddingVertical: 5,
  },
  faqCard: {
    backgroundColor: colors.additional2,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 0,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
  },
});

export default FaqCard;
