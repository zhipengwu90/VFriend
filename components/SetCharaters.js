import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import ViewButton from "./ViewButton";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";

const SetCharaters = ({
  name,
  imageUri,
  content,
  role,
  description,
  userId,
}) => {
  const navigation = useNavigation();

  const addFriend = async () => {
    const docRef = doc(db, "vfriendData", "vdata", "characterInfo", userId);
    try {
      const checkDoc = await getDoc(docRef);
      if (checkDoc.exists()) {
        Toast.show(
          "You have already added this character, check your contact list",
          {
            duration: 2500,
            position: Toast.positions.CENTER,
            backgroundColor: "#680808",
            shadow: true,
            animation: true,
            opacity: 1,
          }
        );
        navigation.navigate("Contact");
      } else {
        const update = await setDoc(docRef, {
          name: name,
          imageUri: imageUri,
          role: role,
          content: content,
          time: "",
        });
        Toast.show("You have created character successfully", {
          duration: 1800,
          position: Toast.positions.CENTER,
          backgroundColor: "#08685e",
          shadow: true,
          animation: true,
          opacity: 1,
        });
        navigation.navigate("Contact");
      }
    } catch (error) {
      console.log(error);
      Toast.show("An error has occurred, please try again", {
        duration: 1300,
        position: Toast.positions.CENTER,
        backgroundColor: "#680808",
        shadow: true,
        animation: true,
        opacity: 1,
      });
    }
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.profiles} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <ViewButton style={styles.add} onPress={addFriend}>
        <Text style={styles.buttonText}>Add Friend</Text>
      </ViewButton>
    </View>
  );
};

export default SetCharaters;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 10,
    borderColor: "#000",
    borderBottomWidth: 1,
  },
  profiles: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: 5,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 1,
  },
  description: {
    fontSize: 15,
    marginBottom: 10,
    paddingHorizontal: 6,
  },
  add: {
    backgroundColor: "#398B8C",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
