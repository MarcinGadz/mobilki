import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import useToken from '../useToken';


const FeedScreen = ({navigation}) => {
    const { token, setToken } = useToken();
    const { signOut } = React.useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text>This is feed</Text>            
            <Button
                title="Log out"
                style="auto"
                onPress={() => signOut()}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default FeedScreen;