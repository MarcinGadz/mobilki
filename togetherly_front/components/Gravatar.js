import * as React from "react";
import { Image } from "react-native";
import * as gravatar from "gravatar-api";

const Gravatar = ({ size }) => {
    const avatar = gravatar.imageUrl({
        email: "filiptheg@gmail.com",
        parameters: { size: 1024 },
        secure: true,
    });
    return (
        <Image
            style={{ width: size, height: size }}
            source={{ uri: avatar }}
        ></Image>
    );
};

export default Gravatar;
