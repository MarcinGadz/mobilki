import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import {
    StyleSheet,
    View,
    Alert,
    Text,
    ScrollView,
    Touchable,
    Pressable,
} from "react-native";
import LoadingScreen from "./LoadingScreen";
import useToken from "../useToken";
import axios from "axios";
import Event from "../components/Event";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { colors } from "../globals";

const EventListScreen = () => {
    const [data, setData] = useState([]);
    const { token, setToken } = useToken();
    const [localToken, setLocalToken] = useState();
    const axios = require("axios").default;
    const [isLoading, setLoading] = useState();

    React.useEffect(() => {
        setLoading(true);
        const bootstrapAsync = async () => {
            let userToken;
            try {
                userToken = await token;
            } catch (e) {
                console.log(e);
                // Restoring token failed
                // try to login user again
            }
            setLocalToken(userToken);
        };

        bootstrapAsync();
    }, []);

    React.useEffect(() => {
        if (localToken) {
            let authString = "Bearer " + localToken;
            axios
                .get("/event", { headers: { Authorization: authString } })
                .then((res) => {
                    setData(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });

            setLoading(false);
        }
    }, [localToken]);

    const renderTable = () => {
        return data.map((e) => {
            return <Event EventData={e} key={e.id} />;
        });
    };

    if (isLoading) {
        return <LoadingScreen />;
    } else {
        return (
            <View style={styles.rowStyle}>
                {renderTable()}
                <ScrollView>
                    <View
                        style={{ height: 1000, backgroundColor: "purple" }}
                    ></View>
                </ScrollView>
                <View
                    style={{
                        position: "absolute",
                        right: 20,
                        bottom: 20,
                        borderRadius: 200,
                        overflow: "hidden",
                    }}
                >
                    <Pressable
                        style={{
                            height: 70,
                            width: 70,
                            backgroundColor: "red",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 200,
                            backgroundColor: colors.button.yellow.background,
                            borderColor: colors.button.yellow.border,
                            borderWidth: 2,
                            elevation: 5,
                            shadowColor: "black",
                        }}
                        onPress={() => {
                            Alert.alert("Not yet implemented");
                        }}
                        android_ripple={{
                            color: "#fff8",
                            borderless: false,
                            foreground: true,
                        }}
                    >
                        <FontAwesome5
                            name="calendar-plus"
                            size={35}
                        ></FontAwesome5>
                    </Pressable>
                </View>
            </View>
        );
    }
};

// do zmiany
const styles = StyleSheet.create({
    rowStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
});

export default EventListScreen;
