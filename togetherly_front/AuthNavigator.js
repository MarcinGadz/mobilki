import * as React from "react";
import { Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./Screens/ProfileScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FeedScreen from "./Screens/FeedScreen";

const Auth = () => {
  const Tab = createBottomTabNavigator();
  const { signOut } = React.useContext(AuthContext);
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={FeedScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerRight: () => (
            <Button onPress={() => signOut()} title="Log out" style="auto" />
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          headerRight: () => (
            <Button onPress={() => signOut()} title="Log out" style="auto" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerRight: () => (
            <Button onPress={() => signOut()} style="auto" title="Log out" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Auth;
