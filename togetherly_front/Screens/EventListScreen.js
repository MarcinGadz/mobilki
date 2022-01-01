import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import LoadingScreen from "./LoadingScreen";
import useToken from "../useToken";
import axios from "axios";
import Event from "../model/Event";

const EventListScreen = () => {
  const [data, setData] = useState([]);
  const { token, setToken } = useToken();
  const [localToken, setLocalToken] = useState();
  const axios = require("axios").default;
  const [isLoading, setLoading] = useState();

  React.useEffect(() => {
    setLoading(true);
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await token;
      } catch (e) {
        console.log(e);
        // Restoring token failed
        // try to login user again
      }
      setLocalToken(userToken);
    };

    bootstrapAsync();
  }, []);

  React.useEffect(() => {
    if (localToken) {
      let authString = "Bearer " + localToken;
      axios
        .get("/event", { headers: { Authorization: authString } })
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

      setLoading(false);
    }
  }, [localToken]);

  const renderTable = () => {
    return data.map((e) => {
      return <Event EventData={e} key={e.id} />;
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return <View style={styles.rowStyle}>{renderTable()}</View>;
  }
};

// do zmiany
const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default EventListScreen;
