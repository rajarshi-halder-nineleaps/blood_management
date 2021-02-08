/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, TextInput, Button, StyleSheet} from 'react-native';

const RegisterInput = (props) => {
  //   let error = "Invalid input";

  const checkValidity = (id, text) => {
    let isValid = true;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
    let fieldIsValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }

    if (props.phone && !phoneRegex.test(text)) {
      isValid = false;
    }

    if (props.password && !passwordRegex.test(text)) {
      isValid = false;
    }

    //* for numbers
    // if (props.min != null && +text < props.min) {
    //   isValid = false;
    //   error = `Input must be at least ${props.min} characters long.`;
    // }
    // if (props.max != null && +text > props.max) {
    //   isValid = false;
    //   error = `Input must not exceed ${props.min} characters.`;

    // }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    props.inputChangeHandler(id, isValid, text);
  };

  return (
    <View>
      <TextInput
        {...props}
        placeholder={props.label}
        onChangeText={(text) => {
          checkValidity(props.id, text);
        }}
      />
      {!props.isValid && props.isTouched && <Text>{props.error}</Text>}
    </View>
  );
};

export default RegisterInput;
