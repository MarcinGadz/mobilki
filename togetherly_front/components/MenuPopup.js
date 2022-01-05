import * as React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";

import Button from "../components/Button";
import AreYouSurePopup from "./AreYouSurePopup";
import PopupBackground from "./PopupBackground";

const MenuPopup = ({ visible, setVisible, background=true }) => {
    // const [visible, setVisible] = React.useState(false);
    console.log("visible", visible);
    console.log("setVisible", setVisible);
    const { signOut } = React.useContext(AuthContext);
    const [areYouSureVisible, setAreYouSureVisibility] = React.useState(false);

    return (
        <>
        {background ? <PopupBackground visible={visible} setVisible={setVisible}/> : ''}
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={setVisible}
                // style={styles.modal}
            >
                <View style={styles.modal}>
                    <View style={styles.wrapper}>
                        <Button
                            text="Cancel"
                            onPress={setVisible}
                            width="80%"
                        ></Button>
                        <Button
                            text="Log out"
                            onPress={() => setAreYouSureVisibility(true)}
                            width="80%"
                        ></Button>
                    </View>
                </View>
                <AreYouSurePopup
                    visible={areYouSureVisible}
                    setVisible={setAreYouSureVisibility}
                    text={"Are you sure?"}
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
        width: "90%",
        height: "70%",
        paddingVertical: 30,
        backgroundColor: "red",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default MenuPopup;
