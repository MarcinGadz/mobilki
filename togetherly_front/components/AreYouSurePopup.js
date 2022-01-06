import * as React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import Button from "../components/Button";
import PopupBackground from "./PopupBackground";
import { colors, values } from "../globals";

const AreYouSurePopup = ({
    visible,
    setVisible,
    text,
    event,
    parents,
    background = true,
}) => {
    return (
        <>
            {background ? (
                <PopupBackground visible={visible} setVisible={setVisible} />
            ) : (
                <></>
            )}
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <View style={s.modal}>
                    <View style={s.wrapper}>
                        <Text style={s.text}>{text}</Text>
                        <View style={s.buttons}>
                            <View style={s.cancel}>
                                <Button
                                    text={"Cancel"}
                                    onPress={() => {
                                        setVisible(false);
                                    }}
                                    width={100}
                                ></Button>
                            </View>
                            <View style={s.logOut}>
                                <Button
                                    text={"Log out"}
                                    onPress={() => {
                                        parents.forEach((f) => f(false));
                                        event();
                                        setVisible(false);
                                    }}
                                    width={100}
                                ></Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const s = StyleSheet.create({
    modal: {
        width: "100%",
        height: "100%",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
    },
    wrapper: {
        width: "auto",
        height: "auto",
        padding: 30,
        backgroundColor: colors.popupBackground,
        borderColor: colors.popupBorder,
        borderWidth: 2,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: values.popupBorderRadius,
    },
    text: {
        fontSize: 20,
        color: "white",
        transform: [{ translateY: -15 }],
        textAlign: "center",
    },
    cancel: {
        marginRight: 10,
    },
    logOut: {
        marginLeft: 10,
    },
    buttons: {
        flexDirection: "row",
    },
});

export default AreYouSurePopup;
