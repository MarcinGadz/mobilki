import * as React from "react";
import { Image } from "react-native";
import * as gravatar from "gravatar-api";

const Gravatar = ({ size, email }) => {
    const avatar = gravatar.imageUrl({
        email: email,
        parameters: { size: 1024 },
        secure: true,
    });
    return (
        <Image
            style={{ width: size, height: size, borderRadius: 300 }}
            source={{ uri: avatar }}
        ></Image>
    );
};

export default Gravatar;
