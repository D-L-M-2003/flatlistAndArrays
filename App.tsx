import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

// Row component for each user
const UserItem = ({
  name,
  age,
  favouritecolour,
  onDelete,
}: {
  name: string;
  age: number;
  favouritecolour: string;
  onDelete: () => void;
}) => (
  <View style={styles.item}>
    <Text style={styles.name}>Name: {name}</Text>
    <Text style={styles.age}>Age: {age}</Text>
    <Text style={styles.color}>Favourite Colour: {favouritecolour}</Text>
    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
      <Text style={styles.btnText}>Delete</Text>
    </TouchableOpacity>
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
  const [pressed, setPressed] = useState(false);

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

  // Function to delete user
  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is a FlatList</Text>

      {/* Input fields with labels */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={newName}
          onChangeText={setNewName}
        />

        <Text style={styles.inputLabel}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter age"
          value={newAge}
          onChangeText={setNewAge}
          keyboardType="numeric"
        />

        <Text style={styles.inputLabel}>Favourite Colour</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter favourite colour"
          value={newColour}
          onChangeText={setNewColour}
        />

        {/* Styled Add User button with press animation */}
        <TouchableOpacity
          style={[styles.addButton, pressed && { transform: [{ scale: 0.95 }] }]}
          onPress={addUser}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          activeOpacity={0.9}
        >
          <Text style={styles.addButtonText}>Add User</Text>
        </TouchableOpacity>
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
            onDelete={() => deleteUser(item.id)}
          />
        )}
      />
    </View>
  );
}

// Full StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252323ff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#ffffffff",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#ffffffff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000000ff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },

  // Modern Add User button
  addButton: {
    backgroundColor: "#4ca8afff", // vibrant green
    paddingVertical: 15,
    borderRadius: 25, // rounded
    alignItems: "center",
    marginTop: 10,

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    // Shadow for Android
    elevation: 6,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  // FlatList Item
  item: {
    backgroundColor: "#00ff0dff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",

    // Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Shadow (Android)
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  age: {
    fontSize: 14,
    color: "#000000ff",
    marginTop: 2,
  },
  color: {
    fontSize: 14,
    color: "#000000ff",
    marginTop: 2,
  },

  // Delete button
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#ff0000ff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",

    // Button shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  btnText: {
    color: "#000000ff",
    fontWeight: "bold",
    fontSize: 14,
  },
});