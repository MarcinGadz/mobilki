import * as React from "react";
import {
    Alert,
    Modal,
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    Linking,
} from "react-native";

import Button from "./Button";
import AreYouSurePopup from "./AreYouSurePopup";
import PopupBackground from "./PopupBackground";
import { values } from "../globals";
import { UIContext } from "../UIContext";
import SettingsPopup from "./SettingsPopup";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SupportUsPopup = ({ visible, setVisible, background = true }) => {
    const { state, dispatch } = React.useContext(UIContext);
    let colors = state.theme;
    const { signOut } = React.useContext(AuthContext);
    const [areYouSureVisible, setAreYouSureVisibility] = React.useState(false);
    const [settingsVisible, setSettingsVisibility] = React.useState(false);

    const styles = StyleSheet.create({
        modal: {
            width: "100%",
            height: "100%",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
        },
        wrapper: {
            width: "80%",
            height: "auto",
            paddingVertical: 30,
            paddingHorizontal: 20,
            backgroundColor: colors.popupBackground,
            borderColor: colors.popupBorder,
            borderWidth: 2,
            borderRadius: values.popupBorderRadius,
            justifyContent: "center",
            alignItems: "center",
        },
        button: {
            flex: 1,
            marginHorizontal: 3,
            padding: 3,
            alignItems: "center",
            borderColor: "#fff4",
            borderWidth: 2,
            borderRadius: 7,
        },
        buttonTextA: {
            fontWeight: "bold",
            color: colors.tabBarInactiveTintColor,
        },
        buttonTextB: {
            fontSize: 12,
            color: colors.tabBarInactiveTintColor,
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
            >
                <View style={styles.modal}>
                    <View style={styles.wrapper}>
                        <Text
                            style={{
                                textAlign: "center",
                                color: colors.tabBarInactiveTintColor,
                                marginBottom: 7,
                            }}
                        >
                            Do you want to help us?
                        </Text>
                        <Text
                            style={{
                                textAlign: "center",
                                color: colors.tabBarInactiveTintColor,
                                marginBottom: 7,
                            }}
                        >
                            If you appreciate what we do, you can show it by
                            buying us a coffee. It will help us develop the app.
                        </Text>
                        <Text
                            style={{
                                textAlign: "center",
                                color: colors.tabBarInactiveTintColor,
                                fontWeight: "bold",
                                marginBottom: 15,
                            }}
                        >
                            Thank you Togheterly team
                        </Text>
                        <MaterialCommunityIcons
                            name="coffee"
                            size={30}
                            color={colors.tabBarInactiveTintColor}
                        ></MaterialCommunityIcons>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignContent: "space-between",
                                marginTop: 10,
                            }}
                        >
                            <Pressable
                                style={styles.button}
                                onPress={() => {
                                    Linking.openURL(
                                        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                    ).catch((e) => {
                                        console.error(e);
                                    });
                                }}
                            >
                                <Text style={styles.buttonTextA}>Small</Text>
                                <Text style={styles.buttonTextB}>4.99 PLN</Text>
                            </Pressable>
                            <Pressable
                                style={styles.button}
                                onPress={() => {
                                    Linking.openURL(
                                        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                    ).catch((e) => {
                                        console.error(e);
                                    });
                                }}
                            >
                                <Text style={styles.buttonTextA}>Medium</Text>
                                <Text style={styles.buttonTextB}>9.99 PLN</Text>
                            </Pressable>
                            <Pressable
                                style={styles.button}
                                onPress={() => {
                                    Linking.openURL(
                                        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                    ).catch((e) => {
                                        console.error(e);
                                    });
                                }}
                            >
                                <Text style={styles.buttonTextA}>Big</Text>
                                <Text style={styles.buttonTextB}>
                                    19.99 PLN
                                </Text>
                            </Pressable>
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
            </Modal>
        </>
    );
};

export default SupportUsPopup;
