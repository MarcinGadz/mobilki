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
import * as Location from "expo-location";

let colors;

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const EventListScreen = () => {
    const [data, setData] = useState([]);
    const { token, setToken } = useToken();
    const [localToken, setLocalToken] = useState();
    const axios = require("axios").default;
    const { state, dispatch } = React.useContext(UIContext);
    colors = state.theme;

    const [isLoading, setLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const [refreshing, setRefreshing] = React.useState(true);
    const [selectedRadius, setSelectedRadius] = React.useState(500);
    const [dateFrom, setDateFrom] = React.useState(null);
    const [dateTo, setDateTo] = React.useState(null);
    // const wrapperSetParentRadius = React.useCallback(
    //     (val) => {
    //         setSelectedRadius(val);
    //     },
    //     [setSelectedRadius]
    // );

    const [createEventPopupVisible, setCreateEventPopupVisible] =
        React.useState(false);
    const toggleCreateEventPopupVisible = () => {
        setCreateEventPopupVisible(!createEventPopupVisible);
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setLocation({
                    latitude: 0.0,
                    longitude: 0.0,
                    latitudeDelta: 100,
                    longitudeDelta: 100,
                });
            } else {
                let location = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                });
            }

            let userToken;
            try {
                userToken = await token;
            } catch (e) {
                console.log(e);
                // Restoring token failed
                // try to login user again
            }
            setLocalToken(userToken);
        })();
    }, []);

    React.useEffect(() => {
        if (refreshing === false) {
            return;
        }
        if (location) {
            // GET /event/get-near?longitude=x.xxx&latitude=y.yyy
            console.log("location " + location);
            let authString = "Bearer " + localToken;
            axios
                .get(
                    "/event/get-near",
                    // "/event/get-near" +
                    //     "?latitude=" +
                    //     location.latitude +
                    //     "&longitude=" +
                    //     location.longitude +
                    //     "&radius=" +
                    //     selectedRadius,
                    {
                        headers: {
                            Authorization: authString,
                        },
                        params: {
                            latitude: location.latitude,
                            longitude: location.longitude,
                            radius: selectedRadius,
                            after: dateFrom
                                ? dateFrom.toISOString().split("T")[0]
                                : null,
                            before: dateTo
                                ? dateTo.toISOString().split("T")[0]
                                : null,
                        },
                    }
                )
                .then((res) => {
                    setData(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            console.log("Data2:" + data);
        }
        setRefreshing(false);
    }, [refreshing, location, localToken]);

    const renderTable = () => {
        return data.map((e) => {
            console.log(e);
            return <Event eventData={e} key={e.id} />;
        });
    };

    if (refreshing) {
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
                <Search
                    // setParentRadius={wrapperSetParentRadius}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    setDateFrom={setDateFrom}
                    setDateTo={setDateTo}
                    onRefresh={onRefresh}
                    selectedRadius={selectedRadius}
                    setSelectedRadius={setSelectedRadius}
                />

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
                    {renderTable()}
                </ScrollView>
                <CreateNewEventPopup
                    visible={createEventPopupVisible}
                    setVisible={toggleCreateEventPopupVisible}
                    currentLocation={location}
                ></CreateNewEventPopup>
                <FloatingButton
                    onPress={() => {
                        setCreateEventPopupVisible(true);
                    }}
                />
            </View>
        );
    }
};

export default EventListScreen;
