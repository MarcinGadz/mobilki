import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import useToken from "../useToken";
import MenuPopup from "../components/MenuPopup";
import { Gravatar, GravatarApi } from "react-native-gravatar";
import { colors, values } from "../globals";
import { UIContext } from "../UIContext";

const handleScroll = (e) => {
    console.log(e.nativeEvent.contentOffset.y);
};

const ProfileScreen = ({ navigation, headerShadow, setHeaderShadow }) => {
    const { token, setToken } = useToken();
    const { signOut } = React.useContext(AuthContext);
    const position = 0;
    let val = "";
    if (!token) {
        val = "no token sadge";
    }

    const { state, dispatch } = React.useContext(UIContext);
    React.useEffect(() => {
        dispatch({ type: "SET_HEADER_SHADOW", payload: false });
    }, []);

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#fff",
            }}
            onScroll={(e) => {
                if (e.nativeEvent.contentOffset.y == 0) {
                    dispatch({ type: "SET_HEADER_SHADOW", payload: false });
                } else {
                    dispatch({ type: "SET_HEADER_SHADOW", payload: true });
                }
            }}
            // onScrollBeginDrag={

            // }
        >
            <StatusBar style="light" />
            <View
                style={{
                    backgroundColor: colors.mainBackground,
                    width: "100%",
                    height: 200,
                }}
            ></View>
            <Gravatar
                options={{
                    email: "filiptheg@gmail.com",
                    parameters: { size: "400", d: "mm" },
                    secure: true,
                }}
                style={{
                    borderRadius: 20000,
                }}
            ></Gravatar>
            <View
                style={{
                    backgroundColor: colors.mainBackground,
                    width: "100%",
                    height: 2000,
                }}
            ></View>
        </ScrollView>
    );
};

export default ProfileScreen;
