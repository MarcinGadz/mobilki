import * as React from 'react';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import SignupScreen from './SignupScreen';
import StartScreen from './StartScreen';
import useToken from './useToken';


const Stack = createNativeStackNavigator();
AuthContext = React.createContext();
const MAIN_URL = "http://192.168.1.106:8080";



const App = () => {

  const { token, setToken } = useToken();

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // maybe verify data before input
        let tempToken = null;

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              username: data.email,
              password: data.password
            })
        };
        fetch(MAIN_URL + '/user/authenticate', requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Bad response');
          } return response.text();
        })
        .then(text => {
          tempToken = text;
          if (tempToken !== null) {
            setToken(tempToken);  
          } 
        })
        .catch(function (error) {
            // logowanie niepoprawne popup
          });
                  
      },
      signOut: async () => {
        await setToken(null); 
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {token ? (
            <>
              <Stack.Screen name="Start" component={StartScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Profile" component={ProfileScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;