import { View, Text, Pressable, StyleSheet } from 'react-native';

import {GlobalStyles} from '../constants/styles'

function FirstButton({ children, onPress, style, buttonText,  }) {
  return (
    <View style={[styles.buttonOuterContainer, style]}>
      <Pressable
  
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: GlobalStyles.colors.primaryGreen }}
      >
        <Text style={[styles.buttonText,buttonText]}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default FirstButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 15,
    margin: 4,
    overflow: 'hidden',
    
  },
  buttonInnerContainer: {

    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  pressed: {
    opacity: 0.75,
  },

});
