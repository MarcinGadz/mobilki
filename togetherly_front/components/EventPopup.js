import * as React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";

import Button from "./Button";
import PopupBackground from "./PopupBackground";
import { colors, values } from "../globals";

const EventPopup = ({ visible, setVisible, eventData, background = true }) => {
    return (
        <>
            {/* {background ? (
                <PopupBackground visible={visible} setVisible={setVisible} />
            ) : (
                <></>
            )} */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => setVisible(false)}
                onShow={console.log("shown")}
            >
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "red",
                    }}
                ></View>
            </Modal>
        </>
    );
};

export default EventPopup;
