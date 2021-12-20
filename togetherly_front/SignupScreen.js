import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, useState, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

const SignupScreen = ({ navigation }) => {
    const [email, onChangeEmail] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    const [name, onChangeName] = React.useState(null);
    const [surname, onChangeSurname] = React.useState(null);

    const { signUp } = React.useContext(AuthContext);
    return (
        <View style={styles.container}>
            <SafeAreaView>
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
                        autoComplete='password'
                        onChangeText={onChangePassword}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Name"
                        placeholderTextColor="#003f5c"
                        value={name}
                        autoComplete='name'
                        onChangeText={onChangeName}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Surname"
                        placeholderTextColor="#003f5c"
                        value={surname}
                        autoComplete='surname'
                        onChangeText={onChangeSurname}
                    />
                </View>

                <TouchableOpacity style={styles.signupBtn}
                    onPress={() => signUp({ email, password, name, surname })}>
                    <Text style={styles.loginText}>LOGIN</Text>
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
    signupBtn: {
        width: 300,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    }
});

export default SignupScreen;