import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TextInput,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ViewButton from "../components/ViewButton";
import { useState, useRef } from "react";

const Profile = () => {
  const [isEdited, setIsEdited] = useState(false);
  const [name, setName] = useState("Wu");
  const [icon, setIcon] = useState("edit");
  const inputRef = useRef(null);
  const nameHandler = (e) => {
    setName(e);
  };

  const editHandler = () => {
    if (!isEdited) {
      setIsEdited(true);
      setIcon("save");

    } else {
      inputRef.current.blur();
      setIsEdited(false);
      setIcon("edit");
    }
  };
  const nameSytle = isEdited ? styles.inputStyle : styles.userName;
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Image
          source={require("../assets/img/profile3d.png")}
          style={styles.userProfile}
        />
        <View style={styles.nameBox}>
          <TextInput
            ref={inputRef}
            editable={isEdited}
            style={nameSytle}
            value={name}
            onChangeText={nameHandler}
          />

          <ViewButton onPress={editHandler}>
            <AntDesign name={icon} size={24} color="white" />
          </ViewButton>
        </View>
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.content}>This dude's a sloth,</Text>
        <Text style={styles.content}>didn't leave any troth.</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBox: {
    backgroundColor: "#008B8C",
    paddingTop: Platform.OS === "android" ? 50 : 70,
    paddingBottom: 20,
  },

  userProfile: {
    alignSelf: "center",
    width: Platform.OS === "android" ? 90 : 80,
    height: Platform.OS === "android" ? 90 : 80,
    marginBottom: 10,

  },
  nameBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },

  userName: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  
  },
  inputStyle: {
    color: "#000000",
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    backgroundColor: "#ffffff",
    width: 150,
  },
  contentBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 100,
    alignItems: "center",
  },
  content: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    paddingBottom: 20,
  },
});
