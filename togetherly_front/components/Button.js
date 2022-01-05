import * as React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const Button = ({ text, onPress, width }) => {
    return (
        <TouchableOpacity
            style={{
                height: 50,
                width: width,
                backgroundColor: "#313f59dd",
                borderColor: "hsla(219, 29%, 20%, .85)",
                borderWidth: 3,
                borderRadius: 200,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={onPress}
        >
            <Text>{text}</Text>
        </TouchableOpacity>
    );
};

export default Button;
