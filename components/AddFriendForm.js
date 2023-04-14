import { View, Text, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState, useRef } from "react";
import FirstButton from "./FirstButton";

const AddFriendForm = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      imageUri:
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg",
      role: "system",
      content: "",
      time: "",
    },
  });

  const onSubmit = (data) => {
    props.addFriend(data);
  };

  // const [typeOpen, setTypeOpen] = useState(false);
  // const [typeValue, setTypeValue] = useState(null);
  // const [items, setItems] = useState([
  //   { label: "Human", value: "Human" },
  //   { label: "Animal", value: "Animal" },
  // ]);

  return (
    <View>
      <Text style={styles.label}>Name</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            maxLength={40}
            placeholder="Jeremy"
          />
        )}
        name="name"
      />
      {errors.name && <Text style={styles.error}>This is required.</Text>}
      <Text style={styles.label}>About me</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, styles.multiline]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            onFocus={() => {
              if (!value) {
                onChange("From now on, assistant is going to act as ");
              }
            }}
            multiline={true}
            numberOfLines={4}
            placeholder="e.g. From now on, the assistant is going to act as my friend who name is Jeremy. Jeremy is an outgoing person who loves to play basketball. He is a good friend to me."
          />
        )}
        name="content"
      />
      {errors.content && <Text style={styles.error}>This is required.</Text>}

      {/* <Text style={styles.label}>Character</Text>
      <Controller
        name="Character"
        rules={{
          required: true,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropdownContainer}>
            <DropDownPicker
              listMode="SCROLLVIEW"
              style={styles.dropdown}
              open={typeOpen}
              value={typeValue} 
              items={items}
              setOpen={setTypeOpen}
              setValue={setTypeValue}
              setItems={setItems}
              placeholder="Select Character"
              placeholderStyle={styles.placeholderStyles}
              onChangeValue={onChange}
            />
          </View>
        )}
      />
      {errors.Character && <Text style={styles.error}>This is required.</Text>} */}

      <FirstButton
        onPress={handleSubmit(onSubmit)}
        style={styles.addButton}
        buttonText={styles.buttonText}
      >
        Add
      </FirstButton>
    </View>
  );
};

export default AddFriendForm;

const styles = StyleSheet.create({
  label: {
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 3,
  },
  input: {
    marginHorizontal: 30,
    padding: 8,
    paddingVertical: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#008c8c",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
  },
  addButton: {
    backgroundColor: "#398B8C",
    width: 100,
    height: 40,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginHorizontal: 30,
    marginTop: 3,
  },
  dropdownContainer: {
    marginHorizontal: 30,
    zIndex: 1000,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#008c8c",
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  multiline: {
    padding: 8,
    textAlignVertical: "top",
    height: 150,
  },
});
