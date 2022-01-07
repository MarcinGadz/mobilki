import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import useToken from "../useToken";
import { colors, values } from "../globals";
import { UIContext } from "../UIContext";
import * as gravatar from "gravatar-api";
import Gravatar from "../components/Gravatar";
import ProfileInfoElement from "../components/ProfileInfoElement";

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
    console.log(
        gravatar.imageUrl({
            email: "filiptheg@gmail.com",
            parameters: { size: 1024 },
            secure: true,
        })
    );
    const { state, dispatch } = React.useContext(UIContext);
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
                backgroundColor: "#ffffff",
                overflow: "visible",
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
                        backgroundColor: "white",
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
