import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";

import { onValue, ref, set, update, remove } from "firebase/database";
import { db } from "./components/config";

export default function App() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");

  // submit data
  function create() {
    // const newKey = push(child(ref(database), "users")).key;

    set(ref(db, "users/" + username), {
      username: username,
      email: email,
    })
      .then(() => {
        // Data saved successfully!
        alert("data submitted");
      })
      .catch((error) => {
        // The write failed...
        alert(error);
      });
  }

  async function updateUser() {
    await update(ref(db, "users/" + username), {
      username: username,
      email: email,
    })
      .then(() => {
        // Data saved successfully!
        alert("data submitted");
      })
      .catch((error) => {
        // The write failed...
        alert(error);
      });
  }

  function readData() {
    const starCountRef = ref(db, "users/" + username);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      {
        setEmail(data.email);
      }
    });
  }

  function deleteData() {
    remove(ref(database, "users/" + username));
    alert("removed");
  }

  return (
    <View style={styles.container}>
      <Text>Firebase Project!</Text>

      <TextInput
        value={username}
        onChangeText={(username) => {
          setName(username);
        }}
        placeholder="Username"
        style={styles.textBoxes}
      ></TextInput>

      <TextInput
        value={email}
        onChangeText={(email) => {
          setEmail(email);
        }}
        placeholder="Email"
        style={styles.textBoxes}
      ></TextInput>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttons}>
          <Button onPress={create} title="Submit Data"></Button>
          <Button onPress={updateUser} title="Update User"></Button>
        </View>
        <View style={styles.buttons}>
          <Button onPress={readData} title="print Email"></Button>
          <Button onPress={deleteData} title="delete User"></Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textBoxes: {
    width: "90%",
    fontSize: 18,
    padding: 12,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    padding: 8,
  },
  buttons: {
    flex: 1,
    margin: 8,
  },
});
