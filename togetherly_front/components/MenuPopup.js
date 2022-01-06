import * as React from "react";
import { Alert, Modal, View, Text, StyleSheet } from "react-native";

import Button from "../components/Button";
import AreYouSurePopup from "./AreYouSurePopup";
import PopupBackground from "./PopupBackground";
import { colors, values } from "../globals";

const MenuPopup = ({ visible, setVisible, background = true }) => {
    // const [visible, setVisible] = React.useState(false);
    console.log("visible", visible);
    console.log("setVisible", setVisible);
    const { signOut } = React.useContext(AuthContext);
    const [areYouSureVisible, setAreYouSureVisibility] = React.useState(false);

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
                                    Alert.alert("Not yet implemented");
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
            </Modal>
        </>
    );
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
});

export default MenuPopup;
