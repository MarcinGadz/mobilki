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
    RefreshControl,
} from "react-native";
import LoadingScreen from "./LoadingScreen";
import useToken from "../useToken";
import axios from "axios";
import Event from "../components/Event";
import FloatingButton from "../components/FloatingButton";
import { FlipInEasyY } from "react-native-reanimated";
import { UIContext } from "../UIContext";
import Search from "../components/Search";
import CreateNewEventPopup from "../components/CreateNewEventPopup";

let colors;

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const EventListScreen = () => {
    const [data, setData] = useState([]);
    const { token, setToken } = useToken();
    const [localToken, setLocalToken] = useState();
    const axios = require("axios").default;
    const [isLoading, setLoading] = useState();
    const { state, dispatch } = React.useContext(UIContext);
    colors = state.theme;

    const [refreshing, setRefreshing] = React.useState(false);
    const [createEventPopupVisible, setCreateEventPopupVisible] = React.useState(false);
    const toggleCreateEventPopupVisible = () => {
        setCreateEventPopupVisible(!createEventPopupVisible);
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    // const onRefresh = () => {
    //     setRefreshing(true);
    //     fetchData().then(() => setRefreshing(false));
    // };

    // const onRefresh = () => {
    //     setRefreshing(true);
    //     setValue({});
    //     setRefreshing(false);
    // };

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
                .get("/event/get-near", {
                    headers: {
                        Authorization: authString,
                        params: {
                            latitude: 1,
                            longitude: 1,
                            radius: 1000,
                            before: null,
                            after: null,
                        },
                    },
                })
                .then((res) => {
                    setData(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            console.log(localToken);
            console.log(data);
            setLoading(false);
        }
    }, [localToken]);

    const renderTable = () => {
        return data.map((e) => {
            return <Event eventData={e} key={e.id} />;
        });
    };

    if (isLoading) {
        return <LoadingScreen />;
    } else {
        return (
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: colors.mainSecondaryBackground,
                }}
            >
                {/* {renderTable()} */}
                <Search />

                <ScrollView
                    contentContainerStyle={{
                        alignItems: "center",
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {/* <View
                        style={{ height: 1000, backgroundColor: "teal" }}
                    ></View> */}
                    <Event
                        eventData={{
                            title: "Flany",
                            id: 1234567,
                            description:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rutrum leo mi. Pellentesque non erat non turpis porttitor vulputate. Nunc pulvinar velit ut iaculis tincidunt. Quisque eget dapibus sem, eget sodales ex. Cras interdum dolor eget tortor dapibus condimentum. Phasellus ligula massa, mollis ac eleifend sit amet, rhoncus at ligula. Sed efficitur sem vitae dolor vehicula venenatis. Integer vitae ex.",
                            owner: "filiptheg",
                            date: "12.12.2022",
                        }}
                    ></Event>
                    <Event
                        eventData={{
                            title: "Flany",
                            id: 2137,
                            description:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus varius ligula, sed tempus nisl condimentum vel. Ut vel sem.",
                            owner: "filiptheg",
                            date: "12.12.2022",
                        }}
                    ></Event>
                    <Event
                        eventData={{
                            title: "Flany",
                            id: 69420,
                            description:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus varius ligula, sed tempus nisl condimentum vel. Ut vel sem.",
                            owner: "filiptheg",
                            date: "12.12.2022",
                        }}
                    ></Event>
                    <Event
                        eventData={{
                            title: "Flany",
                            id: 69420,
                            description:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus varius ligula, sed tempus nisl condimentum vel. Ut vel sem.",
                            owner: "filiptheg",
                            date: "12.12.2022",
                        }}
                    ></Event>
                    <Event
                        eventData={{
                            title: "Flany",
                            id: 69420,
                            description:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus varius ligula, sed tempus nisl condimentum vel. Ut vel sem.",
                            owner: "filiptheg",
                            date: "12.12.2022",
                        }}
                    ></Event>
                    <Event
                        eventData={{
                            title: "Flany",
                            id: 69420,
                            description:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus varius ligula, sed tempus nisl condimentum vel. Ut vel sem.",
                            owner: "filiptheg",
                            date: "12.12.2022",
                        }}
                    ></Event>
                    <Event
                        eventData={{
                            title: "Flany",
                            id: 69420,
                            description:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus varius ligula, sed tempus nisl condimentum vel. Ut vel sem.",
                            owner: "filiptheg",
                            date: "12.12.2022",
                        }}
                    ></Event>
                </ScrollView>
                <CreateNewEventPopup
                     visible={createEventPopupVisible}
                     setVisible={toggleCreateEventPopupVisible}
                ></CreateNewEventPopup>
                <FloatingButton
                    onPress={() => {
                        setCreateEventPopupVisible(true)
                    }}
                />
            </View>
        );
    }
};

export default EventListScreen;
