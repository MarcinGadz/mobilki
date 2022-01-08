import * as React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";

import Button from "./Button";
import PopupBackground from "./PopupBackground";
import { colors, values } from "../globals";
import { ScrollView } from "react-native-gesture-handler";

const EventPopup = ({ visible, setVisible, eventData, background = true }) => {
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
                onRequestClose={() => setVisible(false)}
                onShow={console.log("shown")}
            >
                <ScrollView>
                    <View
                        style={{
                            height: "100%",
                            width: "100%",
                            // justifyContent: "center",
                            alignItems: "center",
                            marginVertical: 80,
                        }}
                    >
                        <View
                            style={{
                                width: "85%",
                                height: 1000,
                                backgroundColor: "white",
                                borderRadius: values.popupBorderRadius,
                                overflow: "hidden",
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: colors.eventHeader,
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    height: "auto",
                                    paddingVertical: 7,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 30,
                                        marginVertical: 3,
                                        fontWeight: "bold",
                                        marginLeft: 15,
                                    }}
                                >
                                    {eventData.title}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </>
    );
};

export default EventPopup;
