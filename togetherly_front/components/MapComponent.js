import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import MapView from "react-native-maps";
import LoadingScreen from "../Screens/LoadingScreen";
import * as Location from "expo-location";

const MapComponent = ({ width = "100%", height = "100%", style }) => {
    const [isLoading, setLoading] = useState(false);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission to access location was denied");
                setLocation({
                    latitude: 0.0,
                    longitude: 0.0,
                    latitudeDelta: 100,
                    longitudeDelta: 100,
                });
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            setLoading(false);
        })();
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <View
            style={[
                styles.container,
                {
                    width: width,
                    height: height,
                },
                style,
            ]}
        >
            <MapView
                style={{
                    width: width,
                    height: height,
                }}
                initialRegion={location}
                pitchEnabled={false}
            />
        </View>
    );

    // {markers !== undefined &&
    //   markers.map((marker, index) => (
    //    <Marker
    //      key={index}
    //      coordinate={marker.latlng}
    //      title={marker.title}
    //      description={marker.description}
    //    />
    //  ))}
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        // width: width,
        // height: height,
    },
    map: {
        // width: Dimensions.get("window").width,
        // height: Dimensions.get("window").height,
        // width: width,
        // height: height,
    },
});

export default MapComponent;
