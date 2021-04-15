import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

class PickerExample extends Component {
  state = { user: "" };
  updateUser = (user) => {
    this.setState({ user: user });
  };

  state = {
    email: "",
    password: "",
  };
  handleEmail = (text) => {
    this.setState({ email: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };
  login = (email, pass) => {
    alert("email: " + email + " password: " + pass);
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.Logo}
          source={require("../assets/LogoAperHome.png")}
        />

        <Text style={styles.text}>{this.state.user}</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
        />

        <Picker
          selectedValue={this.state.user}
          onValueChange={this.updateUser}
          style={styles.picker}
        >
          <Picker.Item label="N/A" value="N/A" />
          <Picker.Item label="male" value="male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.push("Splash")}
        >
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default PickerExample;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "black",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: "white",
  },
  Logo: {
    aspectRatio: 1.5,
    resizeMode: "contain",
    marginTop: -10,
  },
  picker: {
    height: 50,
    width: 150,
    marginLeft: 10,
  },
  text: {
    fontSize: 30,
    alignSelf: "center",
    color: "red",
  },
});
