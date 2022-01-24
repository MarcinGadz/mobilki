import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import { View, ScrollView } from "react-native";
import useToken from "../useToken";
import { UIContext } from "../UIContext";
import * as gravatar from "gravatar-api";
import Gravatar from "../components/Gravatar";
import ProfileInfoElement from "../components/ProfileInfoElement";
import LoadingScreen from "./LoadingScreen";

const handleScroll = (e) => {
    console.log(e.nativeEvent.contentOffset.y);
};

let colors;

const ProfileScreen = ({ navigation, route }) => {
    const [isLoading, setLoading] = useState(true);
    const { token, setToken } = useToken();
    const axios = require("axios").default;
    const [localToken, setLocalToken] = useState();
    const [userData, setUserData] = useState();
    const { state, dispatch } = React.useContext(UIContext);
    colors = state.theme;

    React.useEffect(() => {
        (async () => {
            let userToken;
            try {
                userToken = await token;
            } catch (e) {
                console.log(e);
            }
            setLocalToken(userToken);
        })();
        dispatch({ type: "SET_HEADER_SHADOW", payload: false });
    }, []);

    React.useEffect(() => {
        let username = route.params?.username ?? "";
        if (localToken) {
            console.log("Username " + username);
            let authString = "Bearer " + localToken;
            axios
                .get("/user/find" + "?username=" + username, {
                    headers: {
                        Authorization: authString,
                    },
                })
                .then((res) => {
                    setUserData(res.data);
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [localToken]);

    React.useEffect(() => {
        if (userData) {
            setLoading(false);
        }
    }, [userData]);

    if (isLoading) {
        return <LoadingScreen />;
    } else {
        const avatar = gravatar.imageUrl({
            email: userData.gravatarEmail,
            parameters: { size: 1024 },
            secure: true,
        });
        console.log("userData" + userData);
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
                                email={userData.email}
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
                        content={userData.username}
                    ></ProfileInfoElement>
                    <ProfileInfoElement
                        style={{
                            width: "90%",
                            marginBottom: 15,
                        }}
                        name={"Email"}
                        content={userData.email}
                    ></ProfileInfoElement>
                    <ProfileInfoElement
                        style={{
                            width: "90%",
                            marginBottom: 15,
                        }}
                        name={"Birth date"}
                        content={userData.birthDate}
                    ></ProfileInfoElement>
                </View>
            </ScrollView>
        );
    }
};

export default ProfileScreen;
