import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Detail = ({ route }) => {
  const { itemId } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Page</Text>
      <Text style={styles.text}>
        This is the detail page of the application.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  text: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});

export default Detail;
