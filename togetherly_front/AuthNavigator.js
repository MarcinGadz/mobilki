import * as React from "react";
import { Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./Screens/ProfileScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FeedScreen from "./Screens/FeedScreen";
import EventListScreen from "./Screens/EventListScreen";

const Auth = () => {
    const Tab = createBottomTabNavigator();
    const { signOut } = React.useContext(AuthContext);
    const menuButton = ({ color, size }) => (
        // <Button
        //     onPress={() => signOut()}
        //     title="Log out"
        //     style="auto"
        // />
        <MaterialCommunityIcons
            name="menu"
            color={'white'}
            size={45}
        />
    )
    const bgColor = '#313f59'
    return (
        <Tab.Navigator
            initialRouteName="Profile"
            screenOptions={{
                tabBarActiveTintColor: "#F1A81D",
                tabBarInactiveTintColor: "white",
                tabBarActiveBackgroundColor: '#ffffff15',
                tabBarStyle: {
                    backgroundColor: bgColor,
                    
                },
                headerStyle: {
                    backgroundColor: bgColor,
                    
                },
                headerTitleStyle: {
                    color:'white'
                }
            }}
        >
            <Tab.Screen
                name="Event List"
                component={EventListScreen}
                options={{
                    tabBarLabel: "Event List",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={size}
                        />
                    ),
                    headerRight: menuButton,
                }}
            />
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    tabBarLabel: "Feed",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="bell"
                            color={color}
                            size={size}
                        />
                    ),
                    headerRight: menuButton,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="account"
                            color={color}
                            size={size}
                        />
                    ),
                    headerRight: menuButton,
                }}
            />
        </Tab.Navigator>
    );
};

export default Auth;
