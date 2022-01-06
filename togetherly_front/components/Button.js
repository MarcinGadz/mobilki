import * as React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { colors } from "../colors";
import { FontAwesome } from "@expo/vector-icons";

const Button = ({ text, onPress, icon, width = "100%" }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                height: 50,
                width: width,
                backgroundColor: "#313f59dd",
                borderColor: "hsla(219, 29%, 20%, .85)",
                backgroundColor: colors.buttonBackground,
                borderColor: colors.buttonBorder,
                borderWidth: 3,
                borderRadius: 200,
                // justifyContent: "center",
                alignItems: "center",
            }}
            onPress={onPress}
        >
            {icon !== undefined ? (
                <>
                    <View
                        style={{
                            width: 40,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <FontAwesome name={icon} size={25}></FontAwesome>
                    </View>
                    <Text> </Text>
                    <Text
                        style={{
                            color: "black",
                        }}
                    >
                        {text}
                    </Text>
                </>
            ) : (
                <View
                    style={{
                        width: "100%",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "black",
                        }}
                    >
                        {text}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default Button;
