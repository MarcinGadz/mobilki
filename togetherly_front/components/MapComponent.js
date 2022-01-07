import * as React from "react";
import { useState } from "react";
import { StyleSheet, View, Dimensions, PermissionsAndroid } from "react-native";
import { MapView, Marker } from "react-native-maps";
import LoadingScreen from "../Screens/LoadingScreen";
import Geolocation from "react-native-geolocation-service";

const MapComponent = ({ regionData }) => {
  const [region, setRegion] = useState(null);
  const [permission, setPermission] = useState();

  const getInitialRegion = () => {
    return {
      region: {
        latitude: 51.753745524824076,
        longitude: 19.45162111534344,
        latitudeDelta: 0.0,
        longitudeDelta: 0.0,
      },
    };
  };
  function getUserLocation() {
    console.log("o ja $%^&*");
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  const getLocation = async () => {
    try {
      var a = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      setPermission(a);
      console.log("Permission herre " + a);
      if (permission === (await PermissionsAndroid.RESULTS.GRANTED)) {
        // has permission
        setRegion(getUserLocation());
      } else if (permission === undefined) {
        // ask for permission
        setPermission(
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            {
              title: "Togetherly location permission",
              message: "Togetherly needs access to your location ",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          )
        );
        console.log("here");
        setRegion(getUserLocation());
      } else {
        // location permission is not granted selecting default region
        console.log("Location permission denied");
        setRegion(getInitialRegion());
      }
      console.log(permission);
    } catch (err) {
      console.warn(err);
    }
  };

  function onRegionChange(region) {
    setRegion(region);
  }

  React.useEffect(() => {
    console.log(region);
    // if region is provided then set provided region as region
    if (regionData) {
      setRegion(regionData);
    } else {
      getLocation();
    }
  }, []);

  if (!region) {
    return <LoadingScreen />;
  }
  return (
    <View style={styles.container}>
      <MapView
        region={region}
        onRegionChange={onRegionChange()}
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
