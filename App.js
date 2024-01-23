import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { dataRef, storage } from "./firebaseConfig";

import { Button, TextInput, TouchableOpacity, FlatList } from "react-native";
import { IconButton } from "react-native-paper";
import { Alert } from "react-native";
//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import Home from "./src/Screens/Home";
import Detail from "./src/Screens/Detail";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, paddingTop: 50 },
  input: { borderColor: "blue", borderWidth: 2, padding: 10 },
  button: { backgroundColor: "black", marginTop: 20, borderRadius: 10 },
  buttonText: { color: "white", padding: 10, textAlign: "center" },
  item: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#6200ee",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: { fontSize: 25, color: "white" },
  icons: { display: "flex", flexDirection: "row", marginLeft: "auto" },
});
