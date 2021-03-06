import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Alert, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import LoadingScreen from "../Screens/LoadingScreen";
import * as Location from "expo-location";
import { UIContext } from "../UIContext";

const MapComponent = ({
    width = "100%",
    height = "100%",
    style,
    points,
    autoZoom = true,
    getEventPopup = (() => void 0),
}) => {
    const [isLoading, setLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const { state, dispatch } = React.useContext(UIContext);
    let colors = state.theme;

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setLocation({
                    latitude: 0.0,
                    longitude: 0.0,
                    latitudeDelta: 100,
                    longitudeDelta: 100,
                });
                return;
            }
            if (autoZoom) {
                const maxLatitude = Math.max.apply(
                    Math,
                    points.map((point) => {
                        return point.coordinates.latitude;
                    })
                );
                const minLatitude = Math.min.apply(
                    Math,
                    points.map((point) => {
                        return point.coordinates.latitude;
                    })
                );
                const maxLongitude = Math.max.apply(
                    Math,
                    points.map((point) => {
                        return point.coordinates.longitude;
                    })
                );
                const minLongitude = Math.min.apply(
                    Math,
                    points.map((point) => {
                        return point.coordinates.longitude;
                    })
                );
                console.log(
                    maxLatitude,
                    minLatitude,
                    maxLongitude,
                    minLongitude
                );

                setLocation({
                    latitude: (maxLatitude + minLatitude) / 2,
                    longitude: (maxLongitude + minLongitude) / 2,
                    latitudeDelta:
                        (Math.abs(maxLatitude) + Math.abs(minLatitude)) * 0.2,
                    longitudeDelta:
                        (Math.abs(maxLongitude) + Math.abs(minLongitude)) * 0.2,
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
                customMapStyle={colors.map}
            >
                {points &&
                    points.map((point) => {
                        return (
                            <Marker
                                key={point.id}
                                coordinate={point.coordinates}
                                onCalloutPress={(e) =>
                                    getEventPopup(point.title)
                                }
                            >
                                <Callout>
                                    <View>
                                        <Text>{point.title}</Text>
                                    </View>
                                </Callout>
                            </Marker>
                        );
                    })}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
    },
});

export default MapComponent;
