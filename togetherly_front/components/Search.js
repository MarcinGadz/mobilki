import * as React from "react";
import { TextInput, View } from "react-native";
import { UIContext } from "../UIContext";

const Search = () => {
    const { state, dispatch } = React.useContext(UIContext);
    colors = state.theme;
    return (
        <View style={{ backgroundColor: colors.mainBackground, padding: 15 }}>
            <TextInput
                style={{
                    backgroundColor: colors.textField.background,
                    borderColor: colors.textField.border,
                    borderRadius: 200,
                    borderWidth: 3,
                    paddingHorizontal: 15,
                    paddingVertical: 3,
                }}
            ></TextInput>
        </View>
    );
};

export default Search;
