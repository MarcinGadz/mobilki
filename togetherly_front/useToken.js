import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function useToken() {

    const getToken = async () => {
        let tmp = await SecureStore.getItemAsync('userToken');
        if (tmp) {
            return tmp.replace(/"/g, "");
        } else {
            return tmp;
        }
    };

    const [token, setToken] = useState(getToken());

    const saveToken = async (userToken) => {
        if (userToken === null) {
            await SecureStore.deleteItemAsync('userToken');
            setToken(getToken());
        } else {
            await SecureStore.setItemAsync('userToken', JSON.stringify(userToken));
            setToken(userToken.token);
        }
    };

    return {
        setToken: saveToken,
        token
    }
}