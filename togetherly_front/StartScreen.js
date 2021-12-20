import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, useState, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

const StartScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text>This is login screen</Text>
                <StatusBar style="auto" />

                <TouchableOpacity style={styles.loginBtn}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginBtn}
                    onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.loginText}>SIGN UP</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    }
});

export default StartScreen;