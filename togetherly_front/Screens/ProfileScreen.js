import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import useToken from "../useToken";
import { UIContext } from "../UIContext";
import * as gravatar from "gravatar-api";
import Gravatar from "../components/Gravatar";
import ProfileInfoElement from "../components/ProfileInfoElement";

const handleScroll = (e) => {
    console.log(e.nativeEvent.contentOffset.y);
};

let colors;

const ProfileScreen = ({ navigation, headerShadow, setHeaderShadow }) => {
    const { token, setToken } = useToken();
    const { signOut } = React.useContext(AuthContext);
    const position = 0;
    let val = "";
    if (!token) {
        val = "no token sadge";
    }
    console.log(
        gravatar.imageUrl({
            email: "filiptheg@gmail.com",
            parameters: { size: 1024 },
            secure: true,
        })
    );
    const { state, dispatch } = React.useContext(UIContext);
    colors = state.theme;
    React.useEffect(() => {
        dispatch({ type: "SET_HEADER_SHADOW", payload: false });
    }, []);
    const avatar = gravatar.imageUrl({
        email: "filiptheg@gmail.com",
        parameters: { size: 1024 },
        secure: true,
    });

    return (
        <ScrollView
            style={{
                flex: 1,
                overflow: "visible",
                backgroundColor: colors.mainSecondaryBackground,
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
                    height: 180,
                    overflow: "visible",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        width: 220,
                        height: 220,
                        backgroundColor: colors.mainSecondaryBackground,
                        borderRadius: 300,
                        transform: [{ translateY: 70 }],
                    }}
                >
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                        }}
                    >
                        <Gravatar
                            size={200}
                            email={"filiptheg@gmail.com"}
                        ></Gravatar>
                    </View>
                    <View
                        style={{
                            position: "absolute",
                            backgroundColor: colors.mainSecondaryBackground,
                            width: 300,
                            left: -40,
                            height: 40,
                            top: 110,
                            zIndex: -2,
                        }}
                    ></View>
                    <View
                        style={{
                            position: "absolute",
                            width: 220,
                            height: 40,
                            top: 107.9999555555,
                        }}
                    >
                        <View
                            style={{
                                position: "absolute",
                                height: 42,
                                width: 42,
                                backgroundColor: colors.mainBackground,
                                borderBottomRightRadius: 30,
                                left: -42.00001,
                            }}
                        ></View>
                        <View
                            style={{
                                position: "absolute",
                                height: 42,
                                width: 42,
                                backgroundColor: colors.mainBackground,
                                borderBottomLeftRadius: 30,
                                right: -42.00001,
                            }}
                        ></View>
                    </View>
                </View>
            </View>

            <View
                style={{
                    // backgroundColor: "red",
                    width: "100%",
                    height: "auto",
                    alignItems: "center",
                }}
            >
                <View style={{ height: 75 }} />
                <ProfileInfoElement
                    style={{
                        width: "90%",
                        marginBottom: 15,
                    }}
                    name={"Name"}
                    content={"filiptheg"}
                ></ProfileInfoElement>
                <ProfileInfoElement
                    style={{
                        width: "90%",
                        marginBottom: 15,
                    }}
                    name={"Email"}
                    content={"filiptheg@gmail.com"}
                ></ProfileInfoElement>
                <ProfileInfoElement
                    style={{
                        width: "90%",
                        marginBottom: 15,
                    }}
                    name={"Birth date"}
                    content={"12.11.2000"}
                ></ProfileInfoElement>
                <ProfileInfoElement
                    style={{
                        width: "90%",
                        marginBottom: 15,
                    }}
                    name={"Phone number"}
                    content={"123456789"}
                ></ProfileInfoElement>
            </View>
            {/* <View style={{ height: 1000 }}></View> */}
        </ScrollView>
    );
};

export default ProfileScreen;
