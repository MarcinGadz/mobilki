import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './App';
import { AppRegistry } from 'react-native';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import SignupScreen from './SignupScreen';
import StartScreen from './StartScreen';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
AppRegistry.registerComponent('LoginScreen', () => LoginScreen);
AppRegistry.registerComponent('ProfileScreen', () => ProfileScreen);
AppRegistry.registerComponent('SignupScreen', () => SignupScreen);
AppRegistry.registerComponent('StartScreen', () => StartScreen);
