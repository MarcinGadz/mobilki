import * as React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { MapView, Marker } from "react-native-maps";

const MapComponent = ({ region }) => {
  return (
    <View style={styles.container}>
      <MapView
        region={region}
        // onRegionChange={onRegionChange()}
        style={styles.map}
      ></MapView>
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
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapComponent;
