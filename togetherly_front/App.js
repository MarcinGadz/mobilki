import * as React from "react";
import { useMemo, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoadingScreen from "./Screens/LoadingScreen";
import useToken from "./useToken";
import Auth from "./AuthNavigator";
import NoAuth from "./NoAuthNavigator.js";

AuthContext = React.createContext();
const MAIN_URL = "http://192.168.1.106:8080";

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const { token, setToken } = useToken();
  const [localToken, setLocalToken] = useState();

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

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.

      setLocalToken(userToken);
    };
    bootstrapAsync();
  }, []);

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
          async function fetch_authenticate() {
            return Promise.race([
              // maybe verify data before input

              fetch(MAIN_URL + "/user/authenticate", requestOptions)
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Bad response");
                  }
                  return response.text();
                })
                .then((text) => {
                  tempToken = text;
                  if (tempToken !== null) {
                    setLoading(false);
                    setToken(tempToken);
                    return tempToken;
                  }
                })
                .catch(function (error) {
                  // logowanie niepoprawne popup
                  Alert.alert("Couldn't log in");
                  setLoading(false);
                }),
              new Promise((_, reject) =>
                setTimeout(() => reject(new Error("timeout")), 5000)
              ),
            ]);
          }
          setLocalToken(await fetch_authenticate());
          setLoading(false);
        } catch (error) {
          Alert.alert("Couldn't log in");
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
