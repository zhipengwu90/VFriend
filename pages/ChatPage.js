import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from "react";
import { GlobalStyles } from "../constants/styles";
import YouMessage from "../components/YouMessage";
import FriendMessage from "../components/FriendMessage";
import { AntDesign } from "@expo/vector-icons";
import sendToChatbot from "../openAI/auth";
import { db } from "../firebase/firebaseConfig";
import { DataContext } from "../store/data-context";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import Toast from "react-native-root-toast";
import ViewButton from "../components/ViewButton";

const ChatPage = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const { userData, setUserData } = useContext(DataContext);
  const [message, setMessage] = useState("");
  const { name } = route.params;
  const { system } = route.params;
  const { userId } = route.params;
  const flatListRef = useRef(null);
  const [conversation, setConversation] = useState([]);
  // const [conversationData, setConversationData] = useState([]);
  const lastMessage = conversation.length > 0 ? conversation[0].content : "";
  const color = message.length > 0 ? "#3F9797" : "#242323";


  const updateMessage = (text) => {
    setMessage(text);
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };
  const getConversation = async () => {
    const firestoreRef = collection(
      db,
      "vfriendData",
      "conversation",
      "eachUser",
      userId,
      "history"
    );

    try {
      await onSnapshot(
        query(firestoreRef, orderBy("time", "desc")),
        (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setConversation(data);
          
          
        }

      );
    } catch (error) {
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


  useEffect(() => {
    updateLastMessageToFirebase(lastMessage);
  }, [lastMessage]);


  //update last message to firebase
  const updateLastMessageToFirebase = async (message) => {
    const firestoreRef = doc(
      db,
      "vfriendData",
      "vdata",
      "characterInfo",
      userId
    );
    try {
      const update = await updateDoc(firestoreRef, {
        lastMessage: message,
        time: new Date(),
      });
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

  //update message to firebase
  const updateMessageToFirebase = async (message, role) => {
    const firestoreRef = collection(
      db,
      "vfriendData",
      "conversation",
      "eachUser",
      userId,
      "history"
    );
    const newMessage = {
      role: role,
      content: message,
      time: new Date(),
    };
    try {
      await addDoc(firestoreRef, newMessage);
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

  const submitHandler = async () => {
    if (message.length > 0) {
      setMessage("");
      updateMessageToFirebase(message, "user");
     
    }

    const firstFourMessage = conversation
      .slice(0, 4)
      .reverse()
      .map((item) => ({
        role: item.role,
        content: item.content,
      }));

    const newMessage = [
      system,
      ...firstFourMessage,
      { role: "user", content: message },
    ];
    sendToChatbotHandler(newMessage);
  };

  const sendToChatbotHandler = async (newMessage) => {
    try {
      const response = await sendToChatbot(newMessage);
      updateMessageToFirebase(response.content, "assistant");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConversation();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);



  // console.log("lastMessage", lastMessage);


  // const unsubscribe = navigation.addListener("beforeRemove", (e) => {
  //   // Prevent default behavior of leaving the screen
  //   e.preventDefault();
  //   // Run your function here
  //   console.log(fsLastMessage);
  //   if (lastMessage !== fsLastMessage) {
  //     updateLastMessageToFirebase(lastMessage);
  //   }
  //   // Remove the event listener
  //   unsubscribe();
  //   // Pop the screen from the navigation stack
  //   navigation.dispatch(e.data.action);
  // });

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [navigation, name]);

  const renderMessage = (itemData) => {
    if (itemData.item.role === "user") {
      return <YouMessage message={itemData.item.content} />;
    } else if (itemData.item.role === "assistant") {
      return <FriendMessage message={itemData.item.content} />;
    } else {
      return null; // handle invalid message keys
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : ""}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <FlatList
        inverted={true}
        ref={flatListRef}
        data={conversation}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.chatScroll}
        onLayout={scrollToBottom}
        initialNumToRender={10}
      />

      <View style={styles.inputWrap}>
        <TextInput
          value={message}

          onSubmitEditing={submitHandler}
          onChangeText={updateMessage}
          // onFocus={() =>      flatListRef.current.scrollToEnd({ animated: true })}
          multiline={true}
          blurOnSubmit={true}
          autoCorrect={true}
          style={styles.inputStyle}
          placeholder="Type here"
          returnKeyType="send"
          enablesReturnKeyAutomatically={true}
        />
        <ViewButton style={styles.voice} onPress={submitHandler}>
          <AntDesign name="upcircleo" size={30} color={color} />
        </ViewButton>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatPage;

const styles = StyleSheet.create({
  chatScroll: {
    flex: 0.9,
    flexShrink: 1,
    backgroundColor: GlobalStyles.colors.primaryBackground,
  },

  inputWrap: {
    flexDirection: "row",
    backgroundColor: GlobalStyles.colors.primaryBackground,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  voice: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    color: "#000",
    paddingHorizontal: 10,
  },
});
