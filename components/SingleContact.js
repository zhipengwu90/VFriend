import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ViewButton from "./ViewButton";
const SingleContact = (props) => {
  const { name, imageUri, system,userId } = props;

  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate({
      name: "ChatPage",
      params: { name, system, userId },
    });
  };
  return (
    <ViewButton onPress={pressHandler}>
      <View style={styles.container}>
        <View style={styles.profileWrap}>
          <Image style={styles.profile} source={{ uri: imageUri }} />
        </View>
        <View style={styles.nameBox}>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    </ViewButton>
  );
};
export default SingleContact;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  profileWrap: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#ccc",
    overflow: "hidden",
  },

  profile: {
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  nameBox: {
    flex: 1,

    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    
    paddingLeft: 10,
    paddingVertical: 20,
    },

});
