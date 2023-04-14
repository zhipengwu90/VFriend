import { View, Text, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import SetCharaters from "../components/SetCharaters";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import Toast from "react-native-root-toast";

const Discovery = () => {
  const [characters, SetCharacters] = useState([]);
  const getCharacters = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "vfriendData", "vdata", "systemCharacters")
      );

      const data = querySnapshot.docs.map((doc) => ({
        userId: doc.id,
        name: doc.data().name,
        imageUri: doc.data().imageUri,
        role: doc.data().role,
        content: doc.data().content,
        description: doc.data().description,
      }));
      SetCharacters(data);
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


  useEffect(() => {
    getCharacters();
  }, []);

  const renderCharacters = ({ item }) => {
    return (
      <View>
        <SetCharaters
          name={item.name}
          imageUri={item.imageUri}
          role={item.role}
          content={item.content}
          description={item.description}
          userId = {item.userId}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        {characters.length ? (
          <FlatList
    
            data={characters}
            keyExtractor={(item) => item.userId}
            renderItem={renderCharacters}
            style={styles.list}
          />
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No conversation yet
          </Text>
        )}
      </View>
    </>
  );
};

export default Discovery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
