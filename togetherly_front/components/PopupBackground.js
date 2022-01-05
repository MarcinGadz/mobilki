import * as React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";


const PopupBackground = ({ visible, setVisible}) => {
    return (
        <Modal animationType="fade" transparent={true} visible={visible}>
            <View style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                opacity: .5
            }}/>
        </Modal>
    );
};



export default PopupBackground;
