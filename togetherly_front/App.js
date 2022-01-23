import * as React from "react";
import { useMemo, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoadingScreen from "./Screens/LoadingScreen";
import useToken from "./useToken";
import Auth from "./AuthNavigator";
import NoAuth from "./NoAuthNavigator.js";
import axios from "axios";
import { UIProvider } from "./UIContext";

AuthContext = React.createContext();

const App = () => {
    const [isLoading, setLoading] = useState(false);
    const { token, setToken } = useToken();
    const [localToken, setLocalToken] = useState();
    const [username, setUsername] = useState();
    const axios = require("axios");
    // const [visible, settVisible] = React.useState(false);
    axios.defaults.baseURL = "https://togetherly-app.herokuapp.com/";
    axios.defaults.timeout = 2500;

    // const toggleVisible = () => {
    //     settVisible(!visible);
    // };

    const authContext = useMemo(
        () => ({
            signIn: async (data) => {
                let tempToken = null;
                setLoading(true);
                setUsername(data.username);

                try {
                    axios
                        .post(
                            "/user/authenticate",
                            {
                                // username: "M", for quick debug login
                                // password: "t",
                                username: data.username,
                                password: data.password,
                            },
                            { headers: {} }
                        )
                        .then((response) => {
                            tempToken = response.data;
                            if (tempToken) {
                                setToken(tempToken);
                                setLocalToken(tempToken);
                                setUsername(data.username);
                                axios.defaults.headers.common["Authorization"] =
                                    tempToken;
                            }
                        })
                        .catch((error) => {
                            // logowanie niepoprawne popup
                            Alert.alert("Couldn't log in, bad request" + error);
                            console.log(error);
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
                let tempToken = null;
                setLoading(true);

                // creating user
                axios
                    .post(
                        "/user",
                        {
                            username: data.username,
                            password: data.password,
                        },
                        { headers: {} }
                    )
                    .catch((error) => {
                        // logowanie niepoprawne popup
                        Alert.alert("Couldn't sign up" + error);
                        console.log(error);
                        setLoading(false);
                        return error;
                    });
                setLoading(false);
                return true;
            },
        }),
        []
    );
    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <AuthContext.Provider value={authContext}>
            <UIProvider>
                <NavigationContainer>
                    {token ? <NoAuth /> : <Auth username={username} />}
                </NavigationContainer>
            </UIProvider>
        </AuthContext.Provider>
    );
};
// {/* <MenuPopup visible={visible} setVisible={toggleVisible}></MenuPopup> */}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default App;
