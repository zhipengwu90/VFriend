import { View, Image, Text, StyleSheet } from "react-native";
import ViewButton from "./ViewButton";
import { useNavigation } from "@react-navigation/native";

const ChatCard = ({ message, name, imageUri, date, system, userId }) => {
  const navigation = useNavigation();

  const onChatHandler = () => {
    navigation.navigate({
      name: "ChatPage",
      params: { name, system, userId },
    });
  };

  return (
    <ViewButton onPress={onChatHandler}>
      <View style={styles.container}>
        <View style={styles.profileWrap}>
          <Image
            style={styles.profile}
            // source={require("../assets/img/profile.png")}
            source={{ uri: imageUri }}
          />
        </View>
        <View style={styles.textBox}>
          <View style={styles.nameDate}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.dateText}>{date}</Text>
          </View>
          <View style = {styles.content}>
                    <Text style={styles.message}>{message.length> 35? `${message.substring(0, 35)}...`: message}</Text>
          </View>
        </View>

      </View>
    </ViewButton>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  profileWrap: {
    
    width: 58,
    height: 58,
    borderRadius: 50,
    backgroundColor: "#ccc",
    overflow: "hidden",
  },

  profile: {
    width: 58,
    height: 58,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: "#777777",
  },
  textBox: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 6,
    flex: 1,
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 12,
    color: "#777777",
  },
  nameDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  content: {
    marginVertical: 8,
  },
});
