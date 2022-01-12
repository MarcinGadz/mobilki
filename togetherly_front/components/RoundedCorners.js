import * as React from "react";
import { View } from "react-native";
import { values } from "../globals";
import { UIContext } from "../UIContext";

let colors;

const RoundedCorners = ({ style }) => {
    const { state, dispatch } = React.useContext(UIContext);
    colors = state.theme;
    return (
        <View style={[{ width: "100%" }, style]}>
            <View
                style={{
                    position: "absolute",
                    width: values.popupBorderRadius,
                    height: values.popupBorderRadius + 2,
                    backgroundColor: colors.eventHeader,
                    top: -2.3,
                }}
            >
                <View
                    style={{
                        position: "absolute",
                        width: values.popupBorderRadius,
                        height: values.popupBorderRadius,
                        backgroundColor: colors.mainSecondaryBackground,
                        borderTopLeftRadius: values.popupBorderRadius,
                        bottom: 0,
                    }}
                ></View>
            </View>
            <View
                style={{
                    position: "absolute",
                    width: values.popupBorderRadius,
                    height: values.popupBorderRadius + 2,
                    backgroundColor: colors.eventHeader,
                    top: -2.3,
                    right: 0,
                }}
            >
                <View
                    style={{
                        position: "absolute",
                        width: values.popupBorderRadius,
                        height: values.popupBorderRadius,
                        backgroundColor: colors.mainSecondaryBackground,
                        borderTopRightRadius: values.popupBorderRadius,
                        bottom: 0,
                    }}
                ></View>
            </View>
        </View>
    );
};

export default RoundedCorners;
