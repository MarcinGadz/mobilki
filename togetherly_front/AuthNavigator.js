import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./Screens/ProfileScreen";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import MapScreen from "./Screens/MapScreen";
import EventListScreen from "./Screens/EventListScreen";
import MenuPopup from "./components/MenuPopup";
import { UIContext } from "./UIContext";
import EnrolledEventsScreen from "./Screens/EnrolledEventScreens";

let colors;

const Auth = ({ username }) => {
    const [menuVisible, setMenuVisibility] = React.useState(false);
    const [headerShadow, setHeaderShadow] = React.useState(true);
    const [local_username, setUsername] = React.useState(username);

    const Tab = createBottomTabNavigator();
    const { signOut } = React.useContext(AuthContext);
    const toggleMenu = () => {
        setMenuVisibility(!menuVisible);
    };
    const menuButton = ({ color, size }) => (
        <MaterialCommunityIcons
            name="menu"
            color={colors.tabBarInactiveTintColor}
            size={45}
            onPress={toggleMenu}
            style={{
                marginRight: 8,
            }}
        />
    );

    const { state, dispatch } = React.useContext(UIContext);
    colors = state.theme;

    const bgColor = colors.mainBackground;

    return (
        <>
            <Tab.Navigator
                initialRouteName="Profile"
                screenOptions={{
                    tabBarActiveTintColor: colors.tabBarActiveTintColor,
                    tabBarInactiveTintColor: colors.tabBarInactiveTintColor,
                    tabBarActiveBackgroundColor:
                        colors.tabBarActiveBackgroundColor,

                    tabBarStyle: {
                        backgroundColor: bgColor,
                    },
                    headerStyle: {
                        backgroundColor: bgColor,
                        elevation: state.headerShadow ? 4 : 0,
                    },
                    headerTitleStyle: {
                        color: colors.tabBarInactiveTintColor,
                    },
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
                    name="Events Map"
                    component={MapScreen}
                    options={{
                        tabBarLabel: "Events Map",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="map"
                                color={color}
                                size={size}
                            />
                        ),
                        headerRight: menuButton,
                    }}
                />
                <Tab.Screen
                    name="Enrolled Events"
                    component={EnrolledEventsScreen}
                    options={{
                        tabBarLabel: "Enrolled Events",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons
                                name="event-available"
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
                    initialParams={{
                        username: local_username,
                    }}
                />
            </Tab.Navigator>
            <MenuPopup
                visible={menuVisible}
                setVisible={toggleMenu}
            ></MenuPopup>
        </>
    );
};

export default Auth;
