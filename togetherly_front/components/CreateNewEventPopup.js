import * as React from "react";
import {
    Alert,
    Modal,
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
} from "react-native";

import Button from "../components/Button";
import AreYouSurePopup from "./AreYouSurePopup";
import PopupBackground from "./PopupBackground";
import { light, dark, values } from "../globals";
import { UIContext } from "../UIContext";
import RoundedCorners from "./RoundedCorners";
import DatePicker from "react-native-neat-date-picker";
import TextArea from "react-native-textarea";
import MapView, { Marker } from "react-native-maps";

const CreateNewEventPopup = ({ visible, setVisible, background = true }) => {
    const { state, dispatch } = React.useContext(UIContext);
    let colors = state.theme;
    const [newEvent, setNewEvent] = React.useState({
        title: "",
        description: "",
        startPoint: null,
        date: "",
    });
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [name, setName] = React.useState(null);
    const [date, setDate] = React.useState(null);
    const [position, setPosition] = React.useState(null);
    const [description, setDescription] = React.useState(null);

    const handleChange = (event, name) => {
        setNewEvent({
            ...newEvent,
            [name]: event.nativeEvent,
        });
    };

    return (
        <>
            {background ? (
                <PopupBackground visible={visible} setVisible={setVisible} />
            ) : (
                <></>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(false);
                    setDate(null);
                    setPosition(null);
                    setDescription(null);
                    setName(null);
                }}
                onShow={console.log("shown")}
            >
                <View
                    style={{
                        // paddingVertical: "10%",
                        // backgroundColor: "red",
                        // position: "absolute",
                        // height: Dimensions.get.screenHeight,
                        // paddingTop: "10%",
                        overflow: "visible",
                    }}
                >
                    <ScrollView
                        // scrollEnabled={!mapVisible}
                        contentContainerStyle={{
                            // height: "100%",
                            // width: "100%",
                            // justifyContent: "center",
                            alignItems: "center",
                            // marginVertical: 80,
                            // backgroundColor: colors.mainSecondaryBackground,
                            // width: "85%",
                            borderRadius: values.popupBorderRadius,
                            overflow: "hidden",
                            marginHorizontal: "10%",
                            // borderTopWidth: 50,
                            // borderBottomWidth: 50,
                            // paddingTop: "10%",
                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                marginVertical: 50,
                                borderRadius: values.popupBorderRadius,
                                overflow: "hidden",
                                backgroundColor: colors.mainSecondaryBackground,
                            }}
                        >
                            <Header colors={colors}></Header>
                            <RoundedCorners></RoundedCorners>
                            <View style={{ padding: 15 }}>
                                <TextInput
                                    style={{
                                        backgroundColor:
                                            colors.textFieldB.background,
                                        borderColor: colors.textFieldB.border,
                                        borderRadius: 200,
                                        borderWidth: 2,
                                        paddingHorizontal: 7,
                                        // paddingVertical: 1,
                                        flex: 4,
                                        // width: "auto",
                                        fontSize: 14,
                                        marginBottom: 15,
                                    }}
                                    placeholder={"Name"}
                                    onChangeText={(e) => {
                                        setName(e);
                                        // console.log(e);
                                    }}
                                ></TextInput>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: 15,
                                    }}
                                >
                                    <DatePicker
                                        isVisible={showDatePicker}
                                        mode={"single"}
                                        onCancel={() => {
                                            setShowDatePicker(false);
                                        }}
                                        onConfirm={(date) => {
                                            setShowDatePicker(false);
                                            setDate(date);
                                        }}
                                        // minDate={() => {
                                        //     date = new Date();
                                        //     date.setDate(date.get() - 1);
                                        //     return date;
                                        // }}
                                        // initialDate={null}
                                    />
                                    {/* <Text>Date: </Text> */}
                                    <Pressable
                                        style={{
                                            backgroundColor:
                                                colors.textFieldB.background,
                                            borderColor:
                                                colors.textFieldB.border,
                                            borderRadius: 200,
                                            borderWidth: 2,
                                            paddingHorizontal: 5,
                                            paddingVertical: 4,
                                            flex: 4,
                                            // width: "auto",
                                        }}
                                        onPress={() => {
                                            setShowDatePicker(true);
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: date
                                                    ? colors.textFieldB.text
                                                    : colors.textFieldB
                                                          .placeholder,
                                                fontSize: 14,
                                            }}
                                        >
                                            {date
                                                ? date.toDateString()
                                                : "Date"}
                                        </Text>
                                    </Pressable>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        // padding: 30,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginBottom: 15,
                                    }}
                                >
                                    <TextArea
                                        containerStyle={{
                                            height: 180,
                                            padding: 5,
                                            backgroundColor: "#F5FCFF",
                                            borderColor:
                                                colors.textFieldB.border,
                                            borderWidth: 2,
                                            borderRadius:
                                                values.popupBorderRadius,
                                        }}
                                        style={{
                                            textAlignVertical: "top", // hack android
                                            height: 170,
                                            fontSize: 14,
                                            color: colors.textFieldB.text,
                                        }}
                                        maxLength={300}
                                        underlineColorAndroid={"transparent"}
                                        placeholder="Description"
                                        placeholderTextColor={
                                            colors.textFieldB.placeholder
                                        }
                                        onChangeText={(e) => {
                                            setDescription(e);
                                            // console.log(e);
                                        }}
                                    ></TextArea>
                                </View>
                                <Map
                                    position={position}
                                    setPosition={setPosition}
                                ></Map>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flex: 1, marginRight: 7.5 }}>
                                        <Button text="Cancel"></Button>
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 7.5 }}>
                                        <Button text="Confirm"></Button>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </>
    );
};

const Header = ({ eventData, colors }) => {
    return (
        <View
            style={{
                backgroundColor: colors.eventHeader,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: "auto",
                paddingVertical: 7,
                // borderRadiusTop: 50,
            }}
        >
            <Text
                style={{
                    fontSize: 30,
                    marginVertical: 3,
                    fontWeight: "bold",
                    marginLeft: 15,
                }}
            >
                Create new event
            </Text>
        </View>
    );
};

const Map = ({ position, setPosition }) => {
    return (
        <View
            style={{
                height: 200,
                borderRadius: values.popupBorderRadius,
                overflow: "hidden",
                marginBottom: 15,
            }}
        >
            <MapView
                style={{ height: "100%" }}
                onPress={(e) => {
                    console.log(e.nativeEvent.coordinate);
                    setPosition(e.nativeEvent.coordinate);
                    console.log(position);
                }}
            >
                {position && <Marker coordinate={position}></Marker>}
            </MapView>
        </View>
    );
};

export default CreateNewEventPopup;
