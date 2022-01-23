import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import MapComponent from "../components/MapComponent";
import { StyleSheet, View } from "react-native";
import { UIContext } from "../UIContext";
import useToken from "../useToken";
import LoadingScreen from "../Screens/LoadingScreen";

const MapScreen = ({ navigation }) => {
    const { token, setToken } = useToken();
    const [localToken, setLocalToken] = useState();
    const axios = require("axios").default;
    const { state, dispatch } = React.useContext(UIContext);
    let colors = state.theme;
    const [isLoading, setLoading] = useState(true);
    const [points, setPoints] = React.useState([]);

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
                console.log(error);
            });
    }

    React.useEffect(() => {
        if (isLoading === false) {
            return;
        }
        if (localToken) {
            fetchData();
        }
    }, [localToken, isLoading]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          fetchData();
        });
        return unsubscribe;
      }, [navigation]);

    const mapPoints = (data) => {
        return data.map((e) => {
            return {
                id: e[0],
                title: e[1],
                coordinates: { latitude: e[2].x, longitude: e[2].y },
            };
        });
    };

    if (isLoading) {
        return <LoadingScreen />;
    } else {
        return (
            <View style={styles.container}>
                <MapComponent region={null} points={points} autoZoom={true} />
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
