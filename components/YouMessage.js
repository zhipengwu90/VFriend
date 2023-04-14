import { View, Text, StyleSheet, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import { GlobalStyles } from "../constants/styles";

const YouMessage = ({ message }) => {

  return (

      <View style={styles.myChatMessage}>
        <Text selectable={true} style={styles.messageText}>
          {message}
        </Text>
        <View style={styles.rightArrow}></View>
        <View style={styles.rightArrowOverlap}></View>
      </View>
  );
};

export default YouMessage;

const styles = StyleSheet.create({
  myChatMessage: {
    backgroundColor: "#97DCFE",
    padding: 10,
    borderRadius: 25,
    marginVertical: 10,
    marginHorizontal: 10,
    maxWidth: "70%",
    alignSelf: "flex-end",
  },

  rightArrow: {
    position: "absolute",
    backgroundColor: "#97DCFE",
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10,
  },

  rightArrowOverlap: {
    position: "absolute",
    backgroundColor: GlobalStyles.colors.primaryBackground,
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },
  messageText: {
    fontSize: 18,
    color: "#000",
    padding: 5,
    lineHeight: 21,
  },
});
