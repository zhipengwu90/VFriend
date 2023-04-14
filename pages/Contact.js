import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import SingleContact from "../components/SingleContact";
import React, { useEffect, useState, useContext, useRef } from "react";
import { DataContext } from "../store/data-context";
import { AntDesign } from "@expo/vector-icons";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler/";
import { RectButton } from "react-native-gesture-handler";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import Toast from "react-native-root-toast";
// create icon to swipeable
const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);
//
const Contact = ({ navigation }) => {

  //define the swipeable refs to close all swipeable when one is open
  const swipeableRefs = useRef({});
  function updateRefs(index, ref) {
    swipeableRefs.current[index] = ref;
  }
//functio close swipeable 
  const closeSwipeables = () => {
    Object.values(swipeableRefs.current).forEach((ref) => {
      if (ref) {
        ref.close();
      }
    });
  };

  const { userData, setUserData } = useContext(DataContext);

  const renderRightActions = (item, index) => {
    const deleteConfirm = async () => {
      const userId = item.userId;
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
//delete character from firebase and conversation
        await deleteDoc(userIdref);
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
        `Delete ${item.name}`,
        `Are you sure you want to delete this character?`,
        [
          {
            text: "Cancel",
            onPress: () => {
              console.log("Cancel Pressed");
            },
            style: "cancel",
          },
          { text: "Confirm", onPress: () => deleteConfirm() },
        ],
        { cancelable: false }
      );
    };

    return (
      <>
        <RectButton
          style={[styles.rightAction, styles.edit]}
          onPress={() => {
            navigation.navigate({
              name: "Edit",
              params: {
                userId: item.userId,
                name: item.name,
              },
            });
            swipeableRefs.current[index].close();
          }}
        >
          <AnimatedIcon
            name="edit"
            size={24}
            color="#ffffff"
            style={[styles.actionIcon]}
          />
        </RectButton>
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
      </>
    );
  };
  function renderContact(itemData) {
    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={() =>
            renderRightActions(itemData.item, itemData.index)
          }
          overshootLeft={false}
          ref={(ref) => updateRefs(itemData.index, ref)}
        >
          <SingleContact
            name={itemData.item.name}
            imageUri={itemData.item.imageUri}
            system={itemData.item.system}
            userId={itemData.item.userId}
          />
        </Swipeable>
      </GestureHandlerRootView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={closeSwipeables}>
      <View style={styles.container}>
        {userData.length ? (
          <FlatList
            data={userData.sort((a, b) => a.name.localeCompare(b.name))}
            keyExtractor={(item) => item.userId}
            renderItem={renderContact}
            style={styles.list}
          />
        ) : (
          <Text style={styles.noContact}>Add your first friend.</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  noContact: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
  },

  rightAction: {
    width: 70,
    backgroundColor: "#df0808",
    justifyContent: "center",
  },
  edit: {
    backgroundColor: "#00af63",
    width: 67,
  },
  actionIcon: {
    alignSelf: "center",
  },
});
