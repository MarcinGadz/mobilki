import * as React from "react";
import { Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./Screens/ProfileScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FeedScreen from "./Screens/FeedScreen";
import MapScreen from "./Screens/MapScreen"
import EventListScreen from "./Screens/EventListScreen";
import { createAppContainer } from "react-navigation";
import MenuPopup from "./components/MenuPopup";
import { View } from "react-native-web";

const Auth = () => {
    const [menuVisible, setMenuVisibility] = React.useState(false);

    const Tab = createBottomTabNavigator();
    const { signOut } = React.useContext(AuthContext);
    const toggleMenu = () => {
        setMenuVisibility(!menuVisible);
    };
    const menuButton = ({ color, size }) => (
        <MaterialCommunityIcons
            name="menu"
            color={"white"}
            size={45}
            onPress={toggleMenu}
        />
    );

    const bgColor = "#313f59";
    return (
        <>
            <Tab.Navigator
                initialRouteName="Profile"
                screenOptions={() => {
                    return {
                        tabBarActiveTintColor: "#F1A81D",
                        tabBarInactiveTintColor: "white",
                        tabBarActiveBackgroundColor: "#ffffff15",

                        tabBarStyle: {
                            backgroundColor: bgColor,
                        },
                        headerStyle: {
                            backgroundColor: bgColor,
                        },
                        headerTitleStyle: {
                            color: "white",
                        },
                        // header: () => (
                        //     <View style={{
                        //         width: 200,
                        //         height: 200,
                        //         backgroundColor: 'green'
                        //     }}></View>
                        // )
                        // tabBarLabel: navigation.isFocused() ? route.name : ''
                    };
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
            <MenuPopup visible={menuVisible} setVisible={toggleMenu}></MenuPopup>
        </>
    );
};

// const TabNavigator = createBottomTabNavigator(
//     {
//         Journal: {
//             screen: EventListScreen,
//             navigationOptions: {
//                 tabBarIcon: ({color, size}) => (
//                     <MaterialCommunityIcons
//                             name="home"
//                             color={color}
//                             size={25}
//                         />
//                 ),
//             },
//         },
//         Feed: {
//             screen: FeedScreen,
//             navigationOptions: {
//                 tabBarIcon: ({color, size}) => (
//                     <MaterialCommunityIcons
//                             name="bell"
//                             color={color}
//                             size={25}
//                         />
//                 ),
//             },
//         },
//         Profile: {
//             screen: ProfileScreen,
//             navigationOptions: {
//                 tabBarIcon: ({color, size}) => (
//                     <MaterialCommunityIcons
//                             name="account"
//                             color={color}
//                             size={25}
//                         />
//                 ),
//             },
//         },
//     },
//     {
//         tabBarOptions: {
//             showLabel: false,
//             activeBackgroundColor: 'red',
//             inactiveBackgroundColor: 'green',
//             backgroundColor: 'green'
//         }
//     }
// );

export default Auth;
// export default createAppContainer(TabNavigator);
