import { SafeAreaView, Text } from "react-native";
import EditFriendForm from "../components/EditFriendForm";
import { db } from "../firebase/firebaseConfig";
import {
  doc,
  updateDoc,

} from "firebase/firestore";
import { useEffect, useState } from "react";
import Toast from "react-native-root-toast";
const EditFriend = ({ route, navigation }) => {
  const { name, userId } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [navigation, name]);



//update character info
  const submitHandler = (data) => {
    const docRef = doc(
      db,
      "vfriendData",
      "vdata",
      "characterInfo",
      userId
    );
    try {
      const setDoc = updateDoc(docRef, {
        name: data.name,
        content: data.content,
      });
      Toast.show("You have edited character successfully", {
        duration: 1800,
        position: Toast.positions.CENTER,
        backgroundColor: "#08685e",
        shadow: true,
        animation: true,
        opacity: 1,
      });
      navigation.navigate("Contact");
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
      navigation.navigate("Contact");
    }
  };

  return <EditFriendForm editFriend={submitHandler} 
  userId={userId} 
  />;
};

export default EditFriend;
