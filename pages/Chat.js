// Importing necessary packages from React Native and other sources
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Alert,
  TouchableWithoutFeedback,
  } from "react-native";
  import ChatCard from "../components/ChatCard";
  
  // useContext, useEffect, useState, and useRef from React
  import { useContext, useEffect, useState, useRef } from "react";
  import { DataContext } from "../store/data-context";
  import { db } from "../firebase/firebaseConfig";
  import timestampToDate from "../utils/timestampToDate";
  
  // Firebase Cloud Firestore packages
  import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  doc,
  where,
  updateDoc,
  deleteDoc,
  } from "firebase/firestore";
  
  // Root Toast for notifications
  import Toast from "react-native-root-toast";
  
  // Swipeable, GestureHandlerRootView, and RectButton from react-native-gesture-handler
  import {
  Swipeable,
  GestureHandlerRootView,
  RectButton,
  } from "react-native-gesture-handler";
  
  // Importing AntDesign icons from Expo Vector Icons
  import { AntDesign } from "@expo/vector-icons";
  
  // Creating an AnimatedIcon component for AntDesign icons
  const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);
  
  // Defining the Chat component
  const Chat = ({ navigation }) => {
  // Getting the userData and setUserData from the DataContext
  const { userData, setUserData } = useContext(DataContext);
  
  // Setting up the swipeableRefs to keep track of swipeable components
  const swipeableRefs = useRef({});
  
  // Function to update swipeableRefs with the current index and ref
  function updateRefs(index, ref) {
  swipeableRefs.current[index] = ref;
  }
  
  // Function to close all swipeable components
  const closeSwipeables = () => {
  Object.values(swipeableRefs.current).forEach((ref) => {
  if (ref) {
  ref.close();
  }
  });
  };
  
  // Function to get the list of contacts from Firebase Cloud Firestore
  const getContacts = async () => {
  try {
  // Setting up the query to get the characterInfo collection sorted by time in descending order
  const q = await onSnapshot(
  query(
  collection(db, "vfriendData", "vdata", "characterInfo"),
  orderBy("time", "desc")
  ),
  // Getting the data from the query snapshot and updating the userData state
  (querySnapshot) => {
  const data = querySnapshot.docs.map((doc) => ({
  userId: doc.id,
  name: doc.data().name,
  imageUri: doc.data().imageUri,
  system: { role: doc.data().role, content: doc.data().content },
  lastMessage: doc.data().lastMessage,
  time: timestampToDate(doc.data().time),
  }));
  setUserData(data);
  }
  );
  } catch (error) {
  // If there is an error, show a notification with Toast
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
  
  // Call getContacts function on component mount
  useEffect(() => {
  getContacts();
  }, []);
  
  // Function to render the right swipeable action for a conversation item
  const renderRightActions = (userId, index) => {
  // Function to delete a conversation and its history from Firebase Cloud Firestore
    const deleteConfirm = async () => {
      try {
        // Get reference to the user's data in Firebase Firestore
        const userIdref = doc(
        db,
        "vfriendData",
        "vdata",
        "characterInfo",
        userId
        );
        // Get reference to the user's conversation history in Firebase Firestore
        const conversationRef = collection(
        db,
        "vfriendData",
        "conversation",
        "eachUser",
        userId,
        "history"
        );
// Update the user's lastMessage and time fields to empty strings
        await updateDoc(userIdref, {
          lastMessage: "",
          time: "",
        });
// Get all documents in the user's conversation history and delete them
        const q = await getDocs(conversationRef);
        q.docs.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        // If an error occurs, log the error message and show a toast notification
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
// Define a function to handle deletion confirmation dialog box
    const deleteHanlder = () => {
      Alert.alert(
        "Delete Conversation",
        `Are you sure you want to delete this conversation?`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Confirm", onPress: () => deleteConfirm() },
        ],
        { cancelable: false }
      );
    };
    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => {
          deleteHanlder(), swipeableRefs.current[index].close();
        }}
      >
        <AnimatedIcon
          name="delete"
          size={24}
          color="#ffffff"
          style={[styles.actionIcon]}
        />
      </RectButton>
    );
  };
// Filter the user data to get a list of conversations with last messages
  const conversationList = userData.filter((item) => item.lastMessage);
  function renderConversation(itemData) {
    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={() =>
            renderRightActions(itemData.item.userId, itemData.index)
          }
          overshootLeft={false}
          ref={(ref) => updateRefs(itemData.index, ref)}
        >
          <ChatCard
            userId={itemData.item.userId}
            name={itemData.item.name}
            message={itemData.item.lastMessage}
            imageUri={itemData.item.imageUri}
            date={itemData.item.time}
            system={itemData.item.system}
          />
        </Swipeable>
      </GestureHandlerRootView>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={closeSwipeables}>
      <View style={styles.container}>
        {conversationList.length ? (
          <FlatList
            data={conversationList}
            keyExtractor={(item) => item.userId}
            renderItem={renderConversation}
            style={styles.list}
          />
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No conversation yet
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {},

  rightAction: {
    width: 70,

    backgroundColor: "#df0808",
    justifyContent: "center",
  },
  actionIcon: {
    alignSelf: "center",
  },
});
