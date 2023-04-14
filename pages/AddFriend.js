// Import necessary components and functions
import { SafeAreaView, Text } from "react-native";
import AddFriendForm from "../components/AddFriendForm";
import Toast from "react-native-root-toast";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

// Define the component
const AddFriend = ({ navigation }) => {
  // Define a submit handler function that takes form data as a parameter
  const submitHandler = (data) => {
    // Create a Firestore collection reference
    const collectionRef = collection(
      db,
      "vfriendData",
      "vdata",
      "characterInfo"
    );
    try {
      // Add a new document to the collection with the form data
      const setDoc = addDoc(collectionRef, {
        name: data.name,
        imageUri: data.imageUri,
        role: data.role,
        content: data.content,
        time: ''
      });
      // Show a success toast notification
      Toast.show("You have created character successfully", {
        duration: 1800,
        position: Toast.positions.CENTER,
        backgroundColor: "#08685e",
        shadow: true,
        animation: true,
        opacity: 1,
      });
      // Navigate to the Contact screen
      navigation.navigate("Contact");
    } catch (error) {
      // Show an error toast notification
      Toast.show("An error has occurred, please try again", {
        duration: 1300,
        position: Toast.positions.CENTER,
        backgroundColor: "#680808",
        shadow: true,
        animation: true,
        opacity: 1,
      });
      // Navigate to the Contact screen
      navigation.navigate("Contact");
    }
  };

  // Render the AddFriendForm component and pass the submitHandler function as a prop
  return <AddFriendForm addFriend={submitHandler} />;
};

// Export the AddFriend component as the default export
export default AddFriend;
