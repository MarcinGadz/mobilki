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
                {/* <Text style={styles.title}>SIGN IN</Text> */}
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
                
            </View>
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
        width: "80%",
        backgroundColor: "hsla(219, 29%, 100%, .80)",
        borderRadius: 30,
        height: 45,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: "center",
    },
    TextInput: {
        width: '100%',
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
        color: "white",
    },
    bg: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        position: "absolute",
    },
    wrapper: {
        // flex: 1,
        // flexWrap: "wrap",
        alignContent: "center",
        backgroundColor: "#ffffff30",
        alignItems: "center",
        justifyContent: "center",
        width: '80%',
        height: "auto",
        borderRadius: 30,
        paddingVertical: '10%'
        
    }
});

export default LoginScreen;
