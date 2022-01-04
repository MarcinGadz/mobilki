import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import bg from "../assets/bg.png";
const SignupScreen = ({ navigation }) => {
  const [username, onChangeUsername] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [password2, onChangePassword2] = React.useState(null);

  const { signUp } = React.useContext(AuthContext);

  // validation of signup data
  function validate() {
    if (password === null || password2 === null) {
      Alert.alert("Password is empty");
    } else if (username === null) {
      Alert.alert("Username is empty");
    } else if (password === password2) {
      //
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

  function onSubmit() {
    if (validate()) {
      signUp({ username, password });
    }
  }

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
        {/* <Text style={styles.title}>SIGN UP</Text> */}
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
            placeholder="Confirm Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            value={password2}
            autoComplete="password"
            onChangeText={onChangePassword2}
          />
        </View>

        <TouchableOpacity style={styles.signupBtn} onPress={() => onSubmit()}>
          <Text style={styles.loginText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

export default SignupScreen;
