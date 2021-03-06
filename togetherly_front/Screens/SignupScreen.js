import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Alert,
    ImageBackground,
} from "react-native";
import bg from "../assets/bg.jpg";

import { UIContext } from "../UIContext";

import Button from "../components/Button";
const SignupScreen = ({ navigation }) => {
    const [username, onChangeUsername] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    const [password2, onChangePassword2] = React.useState(null);
    const [email, onChangeEmail] = React.useState(null);
    const [gravatarEmail, onChangeGravatarEmail] = React.useState(null);
    const { signUp } = React.useContext(AuthContext);
    const { state, dispatch } = React.useContext(UIContext);
    colors = state.theme;

    // validation of signup data
    function validate() {
        if (password === null || password2 === null) {
            Alert.alert("Password is empty");
        } else if (username === null) {
            Alert.alert("Username is empty");
        } else if (email === null) {
            Alert.alert("Email is empty");
        } else if (password === password2) {
            if (password.length > 7 && password.length < 21) {
                return true;
            } else {
                Alert.alert("Password length must be between 8 and 20");
            }
        } else {
            Alert.alert("Passwords are not equal");
            onChangePassword("");
            onChangePassword2("");
            return false;
        }
    }

    async function onSubmit() {
        if (validate()) {
            let result = await signUp({
                username,
                password,
                email,
                gravatarEmail,
            });
            console.log("Account created: " + result);
            if (result) {
                Alert.alert("Account created successfully");
                navigation.navigate("Start", { screen: "StartScreen" });
            } else {
                Alert.alert(result);
            }
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
        },
        inputView: {
            width: "80%",
            backgroundColor: "hsla(219, 29%, 100%, .80)",
            borderRadius: 30,
            height: 45,
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
            elevation: 5,
            shadowColor: "black",
        },
        TextInput: {
            width: "100%",
            height: 200,
            flex: 1,
            padding: 10,
            marginLeft: 20,
        },
        signupBtn: {
            width: "80%",
            borderRadius: 25,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
            marginHorizontal: 40,
            backgroundColor: "#313f59dd",
            borderColor: "hsla(219, 29%, 20%, .85)",
            borderWidth: 3,
        },
        loginText: {
            color: colors.mainSecondaryBackground,
        },
        bg: {
            height: "100%",
            width: "100%",
            justifyContent: "center",
            position: "absolute",
        },
        wrapper: {
            alignContent: "center",
            backgroundColor: "#ffffff30",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            height: "auto",
            borderRadius: 30,
            paddingVertical: "10%",
        },
        title: {
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 30,
        },
    });

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ImageBackground source={bg} resizeMode="cover" style={styles.bg} />
            <View style={styles.wrapper}>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email"
                        placeholderTextColor="#003f5c"
                        value={email}
                        autoComplete="email"
                        onChangeText={onChangeEmail}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="GravatarEmail"
                        placeholderTextColor="#003f5c"
                        value={gravatarEmail}
                        autoComplete="email"
                        onChangeText={gravatarEmail}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Username"
                        placeholderTextColor="#003f5c"
                        value={username}
                        autoComplete="username"
                        onChangeText={onChangeUsername}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        value={password}
                        autoComplete="password"
                        onChangeText={onChangePassword}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Confirm password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        value={password2}
                        autoComplete="password"
                        onChangeText={onChangePassword2}
                    />
                </View>
                <Button
                    text="SIGN UP"
                    onPress={() => onSubmit()}
                    variant="blue"
                    width="80%"
                ></Button>
            </View>
        </View>
    );
};

export default SignupScreen;
