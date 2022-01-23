import * as React from "react";
import { Alert, Modal, View, Text, StyleSheet } from "react-native";

import Button from "../components/Button";
import AreYouSurePopup from "./AreYouSurePopup";
import PopupBackground from "./PopupBackground";
import { values } from "../globals";
import { UIContext } from "../UIContext";
import SettingsPopup from "./SettingsPopup";
import SupportUsPopup from "./SupportUsPopup";

const MenuPopup = ({ visible, setVisible, background = true }) => {
    const { state, dispatch } = React.useContext(UIContext);
    let colors = state.theme;
    console.log("visible", visible);
    console.log("setVisible", setVisible);
    const { signOut } = React.useContext(AuthContext);
    const [areYouSureVisible, setAreYouSureVisibility] = React.useState(false);
    const [settingsVisible, setSettingsVisibility] = React.useState(false);
    const [supportUsVisible, setSupportUsVisibility] = React.useState(false);

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
                        <View style={styles.button}>
                            <Button
                                text="Settings"
                                onPress={() => {
                                    setSettingsVisibility(true);
                                    console.log("a:", areYouSureVisible);
                                    console.log("s:", settingsVisible);
                                }}
                                icon={"cog"}
                            ></Button>
                        </View>
                        <View style={styles.button}>
                            <Button
                                text="About"
                                onPress={() => {
                                    Alert.alert("Not yet implemented");
                                }}
                                icon={"info"}
                            ></Button>
                        </View>
                        <View style={styles.button}>
                            <Button
                                text="Support us!"
                                onPress={() => {
                                    // Alert.alert("Not yet implemented");
                                    setSupportUsVisibility(true);
                                }}
                                icon={"dollar"}
                            ></Button>
                        </View>
                        <View style={styles.button}>
                            <Button
                                text="Log out"
                                onPress={() => setAreYouSureVisibility(true)}
                                icon={"sign-out"}
                                variant="yellow"
                            ></Button>
                        </View>
                    </View>
                </View>
                <AreYouSurePopup
                    visible={areYouSureVisible}
                    setVisible={setAreYouSureVisibility}
                    text={"Are you sure you want to log out?"}
                    event={signOut}
                    parents={[setVisible]}
                ></AreYouSurePopup>
                <SettingsPopup
                    visible={settingsVisible}
                    setVisible={setSettingsVisibility}
                ></SettingsPopup>
                <SupportUsPopup
                    setVisible={setSupportUsVisibility}
                    visible={supportUsVisible}
                ></SupportUsPopup>
            </Modal>
        </>
    );
};

export default MenuPopup;
