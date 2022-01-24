import * as React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { UIContext } from "../UIContext";

const PopupBackground = ({ visible, setVisible }) => {
    const { state, dispatch } = React.useContext(UIContext);
    let colors = state.theme;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onShow={console.log("shown bg")}
        >
            <TouchableOpacity
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: colors.popupSecondaryBackground,
                }}
                onPress={() => {
                    setVisible(false);
                }}
            />
        </Modal>
    );
};

export default PopupBackground;
