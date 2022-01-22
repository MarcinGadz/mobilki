import * as React from "react";
import {
  Alert,
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";

import Button from "../components/Button";
import AreYouSurePopup from "./AreYouSurePopup";
import PopupBackground from "./PopupBackground";
import { light, dark, values } from "../globals";
import { UIContext } from "../UIContext";

const CreateNewEventPopup = ({ visible, setVisible, background = true }) => {
  const { state, dispatch } = React.useContext(UIContext);
  let colors = state.theme;
  console.log("visible", visible);
  console.log("setVisible", setVisible);
  const [newEvent, setNewEvent] = React.useState({
    title: "",
    description: "",
    startPoint: null,
    date: "",
  });

  const handleChange = (event, name) => {
    setNewEvent({
      ...newEvent,
      [name]: event.nativeEvent,
    });
  };

  const styles = StyleSheet.create({
    modal: {
      width: "100%",
      height: "100%",
      margin: "auto",
      justifyContent: "center",
      alignItems: "center",
    },
    wrapper: {
      // flex: 1,
      width: "60%",
      height: "auto",
      paddingVertical: 30,
      backgroundColor: colors.popupBackground,
      borderColor: colors.popupBorder,
      borderWidth: 2,
      borderRadius: values.popupBorderRadius,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: "80%",
      marginVertical: 10,
    },
    inputView: {
    //   width: "80%",
    //   backgroundColor: "hsla(219, 29%, 100%, .80)",
    //   borderRadius: 30,
    //   height: 200,
    //   marginBottom: 20,
    //   justifyContent: "center",
    //   alignItems: "center",
    //   elevation: 5,
    //   shadowColor: "black",
    },
    TextInput: {
      width: "100%",
      height: 200,
      flex: 1,
      padding: 10,
      marginLeft: 20,
      borderWidth: 2,
    },
    dateContainer: {
      flexDirection: "row",
      width: "48%",
      // backgroundColor: "red",
    },
    text: {
      color: colors.tabBarInactiveTintColor,
    },
    date: {
      borderWidth: 2,
      borderRadius: 100,
      borderColor: colors.textField.border,
      textAlign: "center",
    },
    pressable: {
      // width: 100,
      flex: 1,
      marginLeft: 10,
    },
  });

  return (
    <>
      {background ? (
        <PopupBackground visible={visible} setVisible={setVisible} />
      ) : (
        <></>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={setVisible}
        // style={styles.modal}
      >
        <View style={styles.modal}>
          <View style={styles.wrapper}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="title"
                placeholderTextColor="#003f5c"
                value={newEvent.title}
                onChangeText={(evt) => handleChange(evt, "title")}
              />
              <TextInput
                style={styles.TextInput}
                placeholder="description"
                placeholderTextColor="#003f5c"
                value={newEvent.description}
                onChangeText={(evt) => handleChange(evt, "description")}
              />
              {/* location picker
              <TextInput
              style={styles.TextInput}
              placeholder="title"
              placeholderTextColor="#003f5c"
              value={newEvent.startPoint}
              onChangeText={handleChange}
            /> */}
              <View style={styles.dateContainer}>
                <Text style={styles.text}>From:</Text>
                <Pressable style={styles.pressable}>
                  <Text style={[styles.text, styles.date]}>
                    {newEvent.date ? newEvent.date : "-"}
                  </Text>
                </Pressable>
              </View>

              <Button text="Text" />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CreateNewEventPopup;
