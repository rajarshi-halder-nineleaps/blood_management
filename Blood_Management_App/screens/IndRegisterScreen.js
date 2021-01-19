import React from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RegisterInput from "../components/RegisterInput";
//? importing the actions:
import { updateInputState, inputFocusOut } from "../redux/RegisterInd/actions";

const IndRegisterScreen = (props) => {
  //? useDispatch hook.
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.registerIndState);
  //? useSeparator hook.

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //* add in validations based on the type of field it is.
  const textChangeHandler = (inputIdentifier, isValid, text) => {
    if (
      inputIdentifier === "cpassword" &&
      text !== formState.inputValues.password
    ) {
      isValid = false;
    }
    dispatch(updateInputState(text, isValid, inputIdentifier));
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //? setting the isTouched of the field.
  const onBlurHandler = (inputIdentifier) => {
    console.log("blurred");
    dispatch(inputFocusOut(inputIdentifier));
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //? submitHandler

  const submitHandler = () => {
    if (formState.formIsValid) {
      console.log("registered");
    } else {
      console.log("not");
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // onChangeText={(text) => {
  //           textChangeHandler("name", text);
  //         }}

  return (
    <View>
      <Text>Individual registration: </Text>

      <RegisterInput
        required
        label="Name"
        id="name"
        isValid={formState.inputValidities.name}
        isTouched={formState.inputTouched.name}
        value={formState.inputValues.name}
        error="Invalid name"
        inputChangeHandler={textChangeHandler}
        onBlur={() => {
          onBlurHandler("name");
        }}
      />

      <RegisterInput
        required
        label="Email"
        id="email"
        email
        isValid={formState.inputValidities.email}
        isTouched={formState.inputTouched.email}
        value={formState.inputValues.email}
        error="Invalid email"
        inputChangeHandler={textChangeHandler}
        onBlur={() => {
          onBlurHandler("email");
        }}
      />

      <RegisterInput
        required
        minLength={10}
        label="Phone"
        id="phone"
        keyboardType="number-pad"
        phone
        isValid={formState.inputValidities.phone}
        isTouched={formState.inputTouched.phone}
        value={formState.inputValues.phone}
        error="Invalid phone"
        inputChangeHandler={textChangeHandler}
        onBlur={() => {
          onBlurHandler("phone");
        }}
      />

      <RegisterInput
        required
        label="Address"
        id="address"
        isValid={formState.inputValidities.address}
        isTouched={formState.inputTouched.address}
        value={formState.inputValues.address}
        error="Invalid Address"
        inputChangeHandler={textChangeHandler}
        onBlur={() => {
          onBlurHandler("address");
        }}
      />

      <RegisterInput
        required
        label="Pincode"
        id="pincode"
        isValid={formState.inputValidities.pincode}
        isTouched={formState.inputTouched.pincode}
        value={formState.inputValues.pincode}
        error="Invalid Pincode"
        inputChangeHandler={textChangeHandler}
        onBlur={() => {
          onBlurHandler("pincode");
        }}
      />
      {
        //Password must be at least 8 characters long and must contain 1 uppercase character, 1 lowerCase character, 1 number and 1 special character
      }
      <RegisterInput
        required
        password
        secureTextEntry={true}
        label="Password"
        id="password"
        isValid={formState.inputValidities.password}
        isTouched={formState.inputTouched.password}
        value={formState.inputValues.password}
        error="bad password"
        inputChangeHandler={textChangeHandler}
        onBlur={() => {
          onBlurHandler("password");
        }}
      />

      <RegisterInput
        required
        password
        secureTextEntry={true}
        label="Confirm Password"
        id="cpassword"
        isValid={formState.inputValidities.cpassword}
        isTouched={formState.inputTouched.cpassword}
        value={formState.inputValues.cpassword}
        error="Password mismatch"
        inputChangeHandler={textChangeHandler}
        onBlur={() => {
          onBlurHandler("cpassword");
        }}
      />

      <Button title="Register" onPress={submitHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default IndRegisterScreen;
