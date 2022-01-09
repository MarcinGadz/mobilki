import { StatusBar } from "expo-status-bar";
import * as React from "react";
import MapComponent from "../components/MapComponent";
import { StyleSheet, View } from "react-native";


const MapScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <MapComponent region={null}/>
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
