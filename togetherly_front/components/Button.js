import * as React from "react";
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { UIContext } from "../UIContext";

const Button = ({
    text,
    onPress,
    icon,
    width = "100%",
    variant = "yellow",
    marginHorizontal = 0,
    marginVertical = 0,
}) => {
    const { state, dispatch } = React.useContext(UIContext);
    let colors = state.theme;

    let bgColor = colors.button.yellow.background;
    let borderColor = colors.button.yellow.border;
    let textColor = colors.button.yellow.text;

    switch (variant) {
        case "yellow":
            bgColor = colors.button.yellow.background;
            borderColor = colors.button.yellow.border;
            textColor = colors.button.yellow.text;
            break;
        case "blue":
            bgColor = colors.button.blue.background;
            borderColor = colors.button.blue.border;
            textColor = colors.button.blue.text;
            break;
    }

    return (
        <View
            style={{
                borderRadius: 200,
                overflow: "hidden",
                elevation: 5,
                shadowColor: "black",
                marginHorizontal: marginHorizontal,
                marginVertical: marginVertical,
            }}
        >
            <Pressable
                style={{
                    flexDirection: "row",
                    height: 50,
                    width: width,
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    borderWidth: 2,
                    borderRadius: 200,
                    alignItems: "center",
                }}
                android_ripple={{
                    color: "#fff8",
                    borderless: false,
                    // foreground: false,
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
                            <FontAwesome
                                name={icon}
                                size={25}
                                color={textColor}
                            ></FontAwesome>
                        </View>
                        <Text> </Text>
                        <Text
                            style={{
                                color: textColor,
                                fontWeight: "700",
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
                                color: textColor,
                                fontWeight: "700",
                            }}
                        >
                            {text}
                        </Text>
                    </View>
                )}
            </Pressable>
        </View>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(["yellow", "blue"]),
};

export default Button;
