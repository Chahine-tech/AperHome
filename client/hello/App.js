import * as React from "react";
import { Button, View, Text, Image, StyleSheet, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./compenents/SplashScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Logo: {
    aspectRatio: 1.5,
    resizeMode: "contain",
    marginTop: -600,
  },
});

function SplashScreen({ navigation }) {
  return <Splash></Splash>;
}

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Register"
        onPress={() => navigation.push("Register")}
      />
    </View>
  );
}

function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button title="Go to Splash" onPress={() => navigation.push("Splash")} />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="LogIn" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
