import * as React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
} from "react-native";
import { values } from "../globals";
import { UIContext } from "../UIContext";

const ProfileInfoElement = ({ style, name, content }) => {
    const { state, dispatch } = React.useContext(UIContext);
    let colors = state.theme;

    return (
        <View
            style={[
                {
                    width: "100%",
                    borderRadius: values.popupBorderRadius,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    elevation: 5,
                    shadowColor: "#00000082",
                    backgroundColor: colors.mainSecondaryBackground,
                },
                style,
            ]}
        >
            <Text
                style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    color: colors.infoName,
                }}
            >
                {name}
            </Text>
            <View
                style={{
                    alignItems: "center",
                    flexDirection: "row",
                    marginVertical: 3,
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
