import * as React from "react";
import { Alert, Modal, View, Text, StyleSheet, Switch } from "react-native";

import Button from "../components/Button";
import AreYouSurePopup from "./AreYouSurePopup";
import PopupBackground from "./PopupBackground";
import { values } from "../globals";
import { UIContext } from "../UIContext";

const SettingsPopup = ({ visible, setVisible, background = true }) => {
    const { state, dispatch } = React.useContext(UIContext);
    let colors = state.theme;
    console.log("visible", visible);
    console.log("setVisible", setVisible);
    const { signOut } = React.useContext(AuthContext);
    const [areYouSureVisible, setAreYouSureVisibility] = React.useState(false);

    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        if (isEnabled) {
            dispatch({ type: "SET_THEME", payload: "light" });
        } else {
            dispatch({ type: "SET_THEME", payload: "dark" });
        }
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
                        <Switch
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        ></Switch>
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

export default SettingsPopup;
