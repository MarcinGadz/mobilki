import * as React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const PopupBackground = ({ visible, setVisible }) => {
    return (
        <Modal animationType="fade" transparent={true} visible={visible}>
            <TouchableOpacity
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "black",
                    opacity: 0.5,
                }}
                onPress={() => {
                    setVisible(false);
                }}
            />
        </Modal>
    );
};

export default PopupBackground;
