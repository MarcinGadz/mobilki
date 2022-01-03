import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground,
    Image
} from "react-native";

import bg from "../assets/bg.png";
import logo from "../assets/logo.png";

const StartScreen = ({ navigation }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ImageBackground source={bg} resizeMode="cover" style={styles.bg} />
            <View style={styles.wrapper} blurRadius={5}>
                <Image source={logo} resizeMode="contain" style={styles.logo}></Image>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.loginText}> LOGIN </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => navigation.navigate("Signup")}
                >
                    <Text style={styles.loginText}> SIGN UP </Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        flexWrap: "wrap",
        alignContent: "center",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    inputView: {
        backgroundColor: "#313f59",
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
        width: '80%',
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginHorizontal: 40,
        backgroundColor: "#313f59dd",
        borderColor: "#273247",
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
        // opacity: .8
    },
    logo: {
        width: '70%',
        height: '40%',
        // marginTop: -200,
        marginBottom: '10%',
        tintColor: '#313F59',
    },
    wrapper: {
        // flex: 1,
        flexWrap: "wrap",
        alignContent: "center",
        backgroundColor: "#ffffff30",
        alignItems: "center",
        justifyContent: "center",
        width: '80%',
        height: "70%",
        borderRadius: 30,
        
    }
});

export default StartScreen;
