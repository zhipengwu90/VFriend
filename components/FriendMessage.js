import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
const FriendMessage = ({message}) => {
return(
    <View style={styles.otherChatMessage}>
    <Text selectable={true} style={styles.messageText}>{message}</Text>
    <View style={styles.leftArrow}></View>
    <View style={styles.leftArrowOverlap}></View>
  </View>
)
}

export default FriendMessage;

const styles = StyleSheet.create({

    otherChatMessage: {
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 25,
        marginVertical: 10,
        marginHorizontal: 10,
        maxWidth: "70%",
        alignSelf: "flex-start",
 
      },
      /*Arrow head for recevied messages*/
      leftArrow: {
        position: "absolute",
        backgroundColor: "#ffffff",
        //backgroundColor:"red",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomRightRadius: 25,
        left: -10,
        
      },
    
      leftArrowOverlap: {
        position: "absolute",
        backgroundColor: GlobalStyles.colors.primaryBackground,
        //backgroundColor:"green",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 18,
        left: -20,
        
      },
    
    messageText: {
        fontSize: 18,
        padding: 5,        
        color: "#000",
      },

    });
