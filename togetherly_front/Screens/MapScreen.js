import { StatusBar } from "expo-status-bar";
import * as React from "react";
import MapComponent from "../components/MapComponent";
import { StyleSheet, View } from "react-native";
import { UIContext } from "../UIContext";

const MapScreen = ({ navigation }) => {
    const { state, dispatch } = React.useContext(UIContext);
    let colors = state.theme;

    const points = [
        {
            id: 1,
            coordinates: { latitude: 16.82739, longitude: -164.7437 },
            title: "Punkt 1",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus.",
        },
        {
            id: 2,
            coordinates: { latitude: 31.75676, longitude: -151.82154 },
            title: "Punkt 2",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus.",
        },
        {
            id: 2,
            coordinates: { latitude: 28.48787, longitude: -130.96293 },
            title: "Punkt 4",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus.",
        },
    ];

    return (
        <View style={styles.container}>
            <MapComponent region={null} points={points} autoZoom={false} />
            <StatusBar style="light" />
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
});

export default MapScreen;
