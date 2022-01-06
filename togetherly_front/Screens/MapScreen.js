import { StatusBar } from "expo-status-bar";
import * as React from "react";
import useToken from "../useToken";
import MapComponent from "../components/MapComponent";
import { useState } from "react";
import { StyleSheet, PermissionsAndroid, View, Text } from "react-native";
import Geolocation from "react-native-geolocation-service";
import LoadingScreen from "../Screens/LoadingScreen";

const FeedScreen = ({ navigation }) => {
  const [permission, setPermission] = useState();
  const [region, setRegion] = useState();

  const requestLocationPermission = async () => {
    try {
      const tmp = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Togetherly location permission",
          message: "Togetherly needs access to your location ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      setPermission(tmp);
      console.log(tmp);
    } catch (err) {
      console.warn(err);
    }
  };

  function getUserLocation() {
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

  function getInitialState() {
    return {
      region: {
        latitude: 51.753745524824076,
        longitude: -19.45162111534344,
        latitudeDelta: 0.0,
        longitudeDelta: 0.0,
      },
    };
  }

  function onRegionChange(region) {
    setRegion(region);
  }


  if (permission === undefined) {
    setPermission(
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
    );
  } else if (permission === PermissionsAndroid.RESULTS.GRANTED) {
    getUserLocation();
  } else if (
    permission === PermissionsAndroid.RESULTS.DENIED ||
    permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
  ) {
    onRegionChange(getInitialState());
    //51.753745524824076, 19.45162111534344
  } else {
    requestLocationPermission();
  }

  if (permission === undefined) {
    return <LoadingScreen />;
  }
  return (
    <View style={styles.container}>
      <Text>This is feed</Text>
      <MapComponent region={region}/>
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

export default FeedScreen;
