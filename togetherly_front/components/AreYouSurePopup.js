import * as React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";

import Button from "../components/Button";
import PopupBackground from "./PopupBackground";

const AreYouSurePopup = ({ visible, setVisible, text, event, parents, background=true }) => {
    return (
        <>
            {background ? <PopupBackground visible={visible} setVisible={setVisible}/> : ''}
            <PopupBackground visible={visible} setVisible={setVisible}/>
            <Modal animationType="fade" transparent={true} visible={visible}>
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
                                    onPress={(parents) => {
                                        // parents.forEach(f => f(false))
                                        for (
                                            let i = 0;
                                            i < parents.length;
                                            i++
                                        ) {
                                            const f = parents[i];
                                            f(false);
                                        }
                                        event();
                                        setVisible(false);
                                    }}
                                    width={100}
                                    style={s.button}
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
        backgroundColor: "green",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
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
