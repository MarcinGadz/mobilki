import "react-native-gesture-handler";
import { registerRootComponent } from "expo";

import App from "./App";
import { AppRegistry } from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import SignupScreen from "./Screens/SignupScreen";
import StartScreen from "./Screens/StartScreen";
import LoadingScreen from "./Screens/LoadingScreen";
import EventListScreen from "./Screens/EventListScreen";
import MapScreen from "./Screens/MapScreen";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
AppRegistry.registerComponent("LoginScreen", () => LoginScreen);
AppRegistry.registerComponent("ProfileScreen", () => ProfileScreen);
AppRegistry.registerComponent("SignupScreen", () => SignupScreen);
AppRegistry.registerComponent("StartScreen", () => StartScreen);
AppRegistry.registerComponent("LoadingScreen", () => LoadingScreen);
AppRegistry.registerComponent("EventListScreen", () => EventListScreen);
AppRegistry.registerComponent("MapScreen", () => MapScreen);
