import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground,
} from "react-native";
import bg from "../assets/bg.png";

const LoginScreen = ({ navigation }) => {
    const [email, onChangeEmail] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);

    const { signIn } = React.useContext(AuthContext);

    // const bg = {uri: './resources/port-man-with-runner-street-be-running-exercise.png'}

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ImageBackground
                    source={bg}
                    resizeMode="cover"
                    style={styles.bg}
                />
                <Text>This is login screen</Text>
                <StatusBar style="auto" />

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
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        value={password}
                        autoComplete="password"
                        onChangeText={onChangePassword}
                    />
                </View>

                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => signIn({ email, password })}
                >
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fffab4',
        alignItems: "center",
        justifyContent: "center",
    },
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: 300,
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },
    TextInput: {
        height: 200,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    loginBtn: {
        width: 300,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
    bg: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        position: "absolute",
    },
});

export default LoginScreen;
