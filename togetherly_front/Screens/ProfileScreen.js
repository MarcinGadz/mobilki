import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import useToken from "../useToken";

const ProfileScreen = ({ navigation }) => {
  const { token, setToken } = useToken();
  const { signOut } = React.useContext(AuthContext);
  let val = "";
  if (!token) {
        val = "no token sadge";
    }
  return (

    <View style={styles.container}>
      <Text>This is profile</Text>
      <Text>{}</Text>   
      <Button title="Log out" style="auto" onPress={() => signOut()} />
      {/* <StatusBar style="auto" /> */}
      <StatusBar style="light" />
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
});

export default ProfileScreen;
