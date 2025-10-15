import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
} from "react-native";

// Row component for each user
const UserItem = ({
  name,
  age,
  favouritecolour,
}: {
  name: string;
  age: number;
  favouritecolour: string;
}) => (
  <View style={styles.item}>
    <Text style={styles.name}>Name: {name}</Text>
    <Text style={styles.age}>Age: {age}</Text>
    <Text style={styles.color}>Favourite Colour: {favouritecolour}</Text>
  </View>
);

export default function App() {
  // Array of users stored in state
  const [users, setUsers] = useState([
    { id: "1", name: "Siya", age: 25, favouritecolour: "Red" },
    { id: "2", name: "Caryn", age: 30, favouritecolour: "Blue" },
    { id: "3", name: "Jaco", age: 22, favouritecolour: "Green" },
    { id: "4", name: "Mihle", age: 28, favouritecolour: "Yellow" },
    { id: "5", name: "Koosie", age: 12, favouritecolour: "Purple" },
  ]);

  // State for input fields
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newColour, setNewColour] = useState("");

  // Function to add new user
  const addUser = () => {
    if (!newName || !newAge || !newColour) return; // Require all fields
    const newUser = {
      id: (users.length + 1).toString(),
      name: newName,
      age: parseInt(newAge),
      favouritecolour: newColour,
    };
    setUsers([...users, newUser]); // Adds a new user to array
    setNewName("");
    setNewAge("");
    setNewColour("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👋 My Dynamic FlatList</Text>

      {/* Input fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={newName}
          onChangeText={setNewName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter age"
          value={newAge}
          onChangeText={setNewAge}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter favourite colour"
          value={newColour}
          onChangeText={setNewColour}
        />
        <Button title="Add User" onPress={addUser} />
      </View>

      {/* FlatList */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserItem
            name={item.name}
            age={item.age}
            favouritecolour={item.favouritecolour}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  age: {
    fontSize: 14,
    color: "#555",
  },
  color: {
    fontSize: 14,
    color: "#333",
  },
});
