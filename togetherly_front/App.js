import * as React from "react";
import { useMemo, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoadingScreen from "./Screens/LoadingScreen";
import useToken from "./useToken";
import Auth from "./AuthNavigator";
import NoAuth from "./NoAuthNavigator.js";
import axios from "axios";

AuthContext = React.createContext();
const MAIN_URL = "http://192.168.1.106:8080";

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const { token, setToken } = useToken();
  const [localToken, setLocalToken] = useState();
  const axios = require("axios");
  axios.defaults.baseURL = "http://192.168.1.106:8080";
  axios.defaults.timeout = 2500;

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await token;
      } catch (e) {
        // Restoring token failed
        // try to login user again
      }
      if (userToken) {
        axios.defaults.headers.common['Authorization'] = userToken;
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.

      setLocalToken(userToken);
    };
    bootstrapAsync();
  }, [localToken]);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        let tempToken = null;
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: data.email,
            password: data.password,
          }),
        };
        setLoading(true);

        try {
          axios
            .post("/user/authenticate", {
              username: "Mar",
              password: "t",
              // username: data.email,
              // password: data.password,
            })
            .then((response) => {
              tempToken = response.data;
              if (tempToken) {
                setToken(tempToken);
                setLocalToken(tempToken);
              }
            })
            .catch((error) => {
              // logowanie niepoprawne popup
              Alert.alert("Couldn't log in, bad request");
              setLoading(false);
            });
        } catch (error) {
          Alert.alert("Couldn't log in: " + error);
        } finally {
          setLoading(false);
        }
      },
      signOut: async () => {
        setLoading(true);
        await setToken(null);
        setLoading(false);
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
      },
    }),
    []
  );
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>{token ? <NoAuth /> : <Auth />}</NavigationContainer>
    </AuthContext.Provider>
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

export default App;
