import { SafeAreaView, Text } from "react-native";
import AddFriendForm from "../components/AddFriendForm";
import Toast from "react-native-root-toast";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
const AddFriend = ({ navigation }) => {
  const submitHandler = (data) => {
 
    const collectionRef = collection(
      db,
      "vfriendData",
      "vdata",
      "characterInfo"
    );
    try {
      const setDoc = addDoc(collectionRef, {
        name: data.name,
        imageUri: data.imageUri,
        role: data.role,
        content: data.content,
        time: ''
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
    } catch (error) {
      Toast.show("An error has occurred, please try again", {
        duration: 1300,
        position: Toast.positions.CENTER,
        backgroundColor: "#680808",
        shadow: true,
        animation: true,
        opacity: 1,
      });
      navigation.navigate("Contact");
    }
  };

  return <AddFriendForm addFriend={submitHandler} />;
};

export default AddFriend;
