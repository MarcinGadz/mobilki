import * as React from "react";
import { useState } from "react";
import { View, Alert, ScrollView, RefreshControl } from "react-native";
import LoadingScreen from "./LoadingScreen";
import useToken from "../useToken";
import Event from "../components/Event";
import FloatingButton from "../components/FloatingButton";
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
    const [location, setLocation] = useState(null);
    const [refreshing, setRefreshing] = React.useState(true);
    const [selectedRadius, setSelectedRadius] = React.useState(500);
    const [dateFrom, setDateFrom] = React.useState(null);
    const [dateTo, setDateTo] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState(null);

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
            }
            setLocalToken(userToken);
        })();
    }, []);

    React.useEffect(() => {
        if (refreshing === false) {
            return;
        }
        if (location) {
            console.log("location " + location);
            let authString = "Bearer " + localToken;
            axios
                .get("/event/get-near", {
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
                        title: searchQuery,
                    },
                })
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

    const participateInEvent = (eventId) => {
        console.log(eventId);
        if (eventId !== null) {
            let authString = "Bearer " + localToken;
            console.log(authString);
            axios
                .post(
                    "user/enroll?event=" + eventId,
                    {},
                    {
                        headers: {
                            Authorization: authString,
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    Alert.alert("Enrolled");
                })
                .catch((error) => {
                    console.log(error);
                    Alert.alert("You are already participant");
                });
        }
    };

    const renderTable = () => {
        return data.map((e) => {
            console.log(e);
            return (
                <Event
                    eventData={e}
                    key={e.id}
                    participateInEvent={participateInEvent}
                />
            );
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
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
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
                    token={localToken}
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
