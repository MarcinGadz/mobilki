import * as React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
} from "react-native";
import { colors, values } from "../globals";

const ProfileInfoElement = ({ style, name, content }) => {
    return (
        <View
            style={[
                {
                    width: "100%",
                    height: Dimensions.get("screen").height / 13,
                    borderRadius: values.popupBorderRadius,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    elevation: 5,
                    shadowColor: "#00000082",
                    backgroundColor: "white",
                },
                style,
            ]}
        >
            <Text
                style={{
                    flex: 1,
                    fontWeight: "bold",
                    fontSize: 18,
                    color: colors.infoName,
                }}
            >
                {name}
            </Text>
            <View
                style={{
                    flex: 2,
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <Text
                    style={{
                        color: colors.infoContent,
                        flex: 1,
                        fontSize: 16,
                    }}
                >
                    {content}
                </Text>
            </View>
        </View>
    );
};

export default ProfileInfoElement;
