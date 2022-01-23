import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import MapComponent from "../components/MapComponent";
import { StyleSheet, View } from "react-native";
import { UIContext } from "../UIContext";
import useToken from "../useToken";
import LoadingScreen from "../Screens/LoadingScreen";
import EventPopup from "../components/EventPopup";
import FloatingButton from "../components/FloatingButton";

const MapScreen = ({ navigation }) => {
    const { token, setToken } = useToken();
    const [localToken, setLocalToken] = useState();
    const axios = require("axios").default;
    const { state, dispatch } = React.useContext(UIContext);
    let colors = state.theme;
    const [isLoading, setLoading] = useState(true);
    const [points, setPoints] = React.useState([]);
    const [data, setData] = React.useState([]);

    const [selectedEventTitle, setSelectedEventTitle] = React.useState();
    const [popupVisible, setPopupVisible] = React.useState(false);
    const [eventData, setEventData] = React.useState();

    React.useEffect(() => {
        (async () => {
            setLoading(true);
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

    function fetchData() {
        let authString = "Bearer " + localToken;
        axios
            .get("/event/start-points", {
                headers: {
                    Authorization: authString,
                },
            })
            .then((res) => {
                setPoints(mapPoints(res.data));
                setLoading(false);
            })
            .catch((error) => {
                console.log(localToken);
                console.log("SUPA ERROR");
                console.log(error);
            });
    }

    React.useEffect(() => {
        if (isLoading === true && localToken) {
            if (localToken) {
                fetchData();
                navigation.addListener("focus", () => {
                    setLoading(true);
                });
            }
        }
    }, [localToken, isLoading]);

    const mapPoints = (data) => {
        return data.map((e) => {
            console.log(e);
            return {
                id: e[0],
                title: e[1],
                coordinates: { latitude: e[2].x, longitude: e[2].y },
            };
        });
    };

    // React.useEffect(() => {
    //     if (selectedEventTitle) {
    //         if (localToken) {
    //             fetchData();
    //             navigation.addListener("focus", () => {
    //                 setLoading(true);
    //             });
    //         }
    //     }
    // }, [selectedEventTitle]);

    const getEventPopup = () => {
        if (selectedEventTitle){
            let authString = "Bearer " + localToken;
        axios
            .get("/event/find", {
                headers: {
                    Authorization: authString,
                },
                params: {
                    title: selectedEventTitle,
                }
            })
            .then((res) => {
                setEventData(res.data);
                setPopupVisible(true);
            })
            .catch((error) => {
                console.log("SUPA ERRA");
                console.log(error);
            });
        }
        
    };

    if (isLoading) {
        return <LoadingScreen />;
    } else {
        return (
            <View style={styles.container}>
                <MapComponent
                    region={null}
                    points={points}
                    autoZoom={true}
                    setEventTitle={setSelectedEventTitle}
                />
                <EventPopup
                    visible={popupVisible}
                    setVisible={setPopupVisible}
                    eventData={eventData}
                    checkedMap={null}
                    setCheckedMap={null}
                    background={false}
                />
                {selectedEventTitle ? (
                    <FloatingButton
                        onPress={() => {
                            getEventPopup();
                        }}
                    />
                ) : null}
                <StatusBar style="light" />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default MapScreen;
