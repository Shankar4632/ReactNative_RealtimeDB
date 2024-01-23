import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { dataRef, storage } from "../../firebaseConfig";
import { Button, TextInput, TouchableOpacity, FlatList } from "react-native";
import { IconButton } from "react-native-paper";
import { Alert } from "react-native";

const Home = ({ navigation }) => {
  const [data, setData] = useState({
    title: "",
  });
  const [items, setItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const handleSubmitAll = () => {
    if (!data.title) {
      Alert.alert("Error", "Please enter a task ");
      return;
    }

    if (editItemId !== "") {
      // If editItemId is not null, update the existing task
      dataRef
        .ref("Title")
        .child(editItemId)
        .update(data, (err) => {
          if (err) {
            Alert.alert("Error", err.message);
          } else {
            Alert.alert("Success", "Successfully updated");
            setEditItemId(null); // Reset editItemId after success
            setData({ title: "" });
          }
        });
    } else {
      // If editItemId is null, add a new task
      const newItemRef = dataRef.ref().child("Title").push();
      newItemRef.set(data, (err) => {
        if (err) {
          Alert.alert("Error", err.message);
        } else {
          Alert.alert("Success", "Successfully added");
          setData({ title: "" });
        }
      });
    }
  };

  const handleEdit = (id) => {
    // Set the editItemId and populate the input with the task title
    setEditItemId(id);
    const editedItem = items.find((item) => item.id === id);
    if (editedItem) {
      setData({ title: editedItem.title });
    }
  };

  useEffect(() => {
    // Set up a listener for changes in the "Title" node
    const fetchData = dataRef.ref("Title").on("value", (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        const dataArr = Object.entries(fetchedData).map(([id, item]) => ({
          id,
          ...item,
        }));
        setItems(dataArr);
      } else {
        setItems([]);
      }
    });
    return () => dataRef.ref("Title").off("value", fetchData);
  }, []);

  const handledelete = (id) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          dataRef
            .ref("Title")
            .child(id)
            .remove((err) => {
              if (err) {
                Alert.alert("Error", err.message);
              } else {
                Alert.alert("Success", "Successfully deleted");
              }
            });
        },
      },
    ]);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("Detail", { itemId: item.id })}
    >
      <View
        w
        index={index}
        style={styles.item}
        title="Go to Detail"
        onPress={() => navigation.navigate("Detail")}
      >
        <Text style={styles.title}>{index}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.icons}>
          <IconButton
            icon="pencil"
            iconColor="white"
            onPress={() => handleEdit(item.id)}
          />
          <IconButton
            icon="delete"
            iconColor="white"
            onPress={() => handledelete(item.id)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a Task"
        value={data.title}
        onChangeText={(text) => setData({ ...data, title: text })}
      />

      <TouchableOpacity
        style={{ backgroundColor: "black", marginTop: 20, borderRadius: 10 }}
        onPress={handleSubmitAll}
      >
        <Text style={{ color: "white", padding: 10, textAlign: "center" }}>
          {editItemId ? "Edit" : "Add"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        title="Go to Detail"
        onPress={() => navigation.navigate("Detail")}
      />
    </View>
  );
};

export default Home;

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
