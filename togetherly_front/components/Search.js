import * as React from "react";
import { TextInput, View } from "react-native";
import { UIContext } from "../UIContext";

const Search = () => {
    const { state, dispatch } = React.useContext(UIContext);
    colors = state.theme;
    return (
        <View>
            <TextInput></TextInput>
        </View>
    );
};

export default Search;
