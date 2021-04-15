import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Picker,
} from "react-native";

const UselessTextInput = () => {
  state = { user: "" };
  updateUser = (user) => {
    this.setState({ user: user });
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.Logo}
        source={require("../assets/LogoAperHome.png")}
      />
      <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
        <Picker.Item label="Steve" value="steve" />
        <Picker.Item label="Ellen" value="ellen" />
        <Picker.Item label="Maria" value="maria" />
      </Picker>
      <Text style={styles.text}>{this.state.user}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: "center",
    color: "red",
  },
  picker: {
    height: 50,
    width: 150,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Logo: {
    aspectRatio: 1.5,
    resizeMode: "contain",
    marginTop: -250,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default UselessTextInput;
