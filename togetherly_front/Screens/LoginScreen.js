import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
    StyleSheet,
    View,
    TextInput,
    ImageBackground,
} from "react-native";
import bg from "../assets/bg.jpg";
import Button from "../components/Button";
import { UIContext } from "../UIContext";

const LoginScreen = ({ navigation }) => {
    const [username, onChangeUsername] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    const { state, dispatch } = React.useContext(UIContext);
    colors = state.theme;

    const { signIn } = React.useContext(AuthContext);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
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
        loginBtn: {
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

                <Button
                    text="LOGIN"
                    onPress={() =>
                        signIn({ username: username, password: password })
                    }
                    variant="blue"
                    width="80%"
                ></Button>
            </View>
        </View>
    );
};

export default LoginScreen;
