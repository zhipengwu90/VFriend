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
import { useContext, useEffect, useState, useRef } from "react";
import { DataContext } from "../store/data-context";
import { db } from "../firebase/firebaseConfig";
import timestampToDate from "../utils/timestampToDate";
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
import Toast from "react-native-root-toast";
import {
  Swipeable,
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);
const Chat = ({ navigation }) => {
  const { userData, setUserData } = useContext(DataContext);
  const swipeableRefs = useRef({});
  function updateRefs(index, ref) {
    swipeableRefs.current[index] = ref;
  }

  const closeSwipeables = () => {
    Object.values(swipeableRefs.current).forEach((ref) => {
      if (ref) {
        ref.close();
      }
    });
  };

  const getContacts = async () => {
    try {
      const q = await onSnapshot(
        query(
          collection(db, "vfriendData", "vdata", "characterInfo"),
          orderBy("time", "desc")
        ),
        (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            userId: doc.id,
            name: doc.data().name,
            imageUri: doc.data().imageUri,
            system: { role: doc.data().role, content: doc.data().content },
            lastMessage: doc.data().lastMessage,
            time: timestampToDate(doc.data().time),
          }));
          // setContacts(data);
          setUserData(data);
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
    getContacts();
  }, []);

  const renderRightActions = (userId, index) => {
    const deleteConfirm = async () => {
      try {
        const userIdref = doc(
          db,
          "vfriendData",
          "vdata",
          "characterInfo",
          userId
        );
        const conversationRef = collection(
          db,
          "vfriendData",
          "conversation",
          "eachUser",
          userId,
          "history"
        );

        await updateDoc(userIdref, {
          lastMessage: "",
          time: "",
        });

        const q = await getDocs(conversationRef);
        q.docs.forEach(async (doc) => {
          await deleteDoc(doc.ref);
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
