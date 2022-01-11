import * as React from "react";
import { Pressable, View, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { UIContext } from "../UIContext";

const FloatingButton = ({ onPress }) => {
    const { state, dispatch } = React.useContext(UIContext);
    let colors = state.theme;
    return (
        <View
            style={{
                width: Dimensions.get("screen").width,
                height: Dimensions.get("screen").height,
                position: "absolute",
                bottom: 0,
            }}
        >
            <View
                style={{
                    position: "absolute",
                    right: 20,
                    bottom: 20,
                    borderRadius: 200,
                    overflow: "hidden",
                }}
            >
                <Pressable
                    style={{
                        height: 70,
                        width: 70,
                        backgroundColor: "red",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 200,
                        backgroundColor: colors.button.blue.background,
                        borderColor: colors.button.blue.border,
                        borderWidth: 2,
                        elevation: 5,
                        shadowColor: "black",
                    }}
                    onPress={onPress}
                    android_ripple={{
                        color: "#fff8",
                        borderless: false,
                        foreground: true,
                    }}
                >
                    <FontAwesome5
                        name="calendar-plus"
                        size={35}
                        color={colors.button.blue.text}
                    ></FontAwesome5>
                </Pressable>
            </View>
        </View>
    );
};

export default FloatingButton;
