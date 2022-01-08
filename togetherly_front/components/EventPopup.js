import * as React from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Alert,
    Pressable,
    Dimensions,
} from "react-native";
import { useState } from "react";
import Button from "./Button";
import PopupBackground from "./PopupBackground";
import { colors, values } from "../globals";
import { ScrollView } from "react-native-gesture-handler";
import Gravatar from "./Gravatar";
import MapComponent from "./MapComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EventPopup = ({
    visible,
    setVisible,
    eventData,
    checkedMap,
    setCheckedMap,
    background = true,
}) => {
    const scroll = React.useRef();
    var secondLayout = undefined;

    const [mapVisible, setMapVisible] = useState(false);

    var mapPosition = 228;
    var heightCheck = false;
    var scrollHeight = 0;

    const mapEnabled = StyleSheet.create({
        map: {
            position: "absolute",
            zIndex: 1000000,
            height: Dimensions.get("window").height * 0.75,
            width: "100%",
            // transform: [{ translateY: -(mapPosition - 30) }],
        },
        cover: {
            // display: "none",
            height: 0,
            width: 0,
        },
        container: {
            height: "100%",
            overflow: "visible",
        },
        x: {
            display: "flex",
            width: 30,
            height: 30,
            position: "absolute",
            right: 10,
            top: 10,
        },
        presssable: {
            alignSelf: "center",
            top: "5%",
            position: "absolute",
            width: "100%",
            height: Dimensions.get("window").height * 0.75,
        },
        box: {
            width: "100%",
            height: 300,
        },
        add: {
            height:
                scrollHeight < Dimensions.get("window").height * 0.75
                    ? Dimensions.get("window").height * 0.75 - scrollHeight
                    : 0,
        },
    });

    const mapDisabled = StyleSheet.create({
        map: {},
        cover: {},
        container: {},
        x: {
            display: "none",
        },
        presssable: {},
        box: {
            display: "none",
        },
        add: {
            display: "none",
        },
    });

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
                onRequestClose={() => setVisible(false)}
                onShow={console.log("shown")}
            >
                <ScrollView
                    ref={scroll}
                    scrollEnabled={!mapVisible}
                    onLayout={(e) => {
                        if (!heightCheck) {
                            var { x, y, width, height } = e.nativeEvent.layout;
                            heightCheck = true;
                            scrollHeight = height;
                            console.log(scrollHeight);
                        }
                    }}
                >
                    <View
                        style={{
                            height: "100%",
                            width: "100%",
                            // justifyContent: "center",
                            alignItems: "center",
                            marginVertical: 80,
                        }}
                    >
                        <View
                            style={{
                                width: "85%",
                                // height: 1000,
                                backgroundColor: "white",
                                borderRadius: values.popupBorderRadius,
                                overflow: "hidden",
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: colors.eventHeader,
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    height: "auto",
                                    paddingVertical: 7,
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
                                    {eventData.title}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        marginRight: 8,
                                    }}
                                >
                                    #{eventData.id}
                                </Text>
                            </View>
                            <View style={{ padding: 15 }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                    onLayout={(e) => {
                                        var { x, y, width, height } =
                                            e.nativeEvent.layout;
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginBottom: 10,
                                        }}
                                    >
                                        <Gravatar
                                            size={60}
                                            email={"filiptheg@gmail.com"}
                                        ></Gravatar>
                                        <Text
                                            style={{
                                                marginLeft: 10,
                                                fontSize: 20,
                                                fontWeight: "bold",
                                                color: colors.infoName,
                                            }}
                                        >
                                            {eventData.owner}
                                        </Text>
                                    </View>
                                    <View>
                                        <Button
                                            text={"Participate"}
                                            variant="blue"
                                            width={150}
                                            onPress={() => {
                                                Alert.alert(
                                                    "Not yet implemented"
                                                );
                                            }}
                                        ></Button>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        // backgroundColor: "aqua",
                                        // flex: 3,
                                        width: "100%",
                                        padding: 10,
                                    }}
                                >
                                    <View>
                                        <View style={s.infoBlock}>
                                            <Text style={s.infoTitle}>
                                                Date
                                            </Text>
                                            <Text style={s.infoContent}>
                                                {eventData.date}
                                            </Text>
                                        </View>
                                        <View style={s.infoBlock}>
                                            <Text style={s.infoTitle}>
                                                Description
                                            </Text>
                                            <Text style={s.infoContent}>
                                                {eventData.description}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={
                                        mapVisible
                                            ? mapEnabled.box
                                            : mapDisabled.box
                                    }
                                />
                                <Pressable
                                    onLayout={(e) => {
                                        if (!checkedMap) {
                                            var { x, y, width, height } =
                                                e.nativeEvent.layout;
                                            mapPosition = y;
                                            console.log(x, y, width, height);
                                            // if (!heightCheck) {
                                            //     heightCheck = true;
                                            //     scrollHeight = height;
                                            //     console.log(height);
                                            //     console.log(scrollHeight);
                                            // }
                                            setCheckedMap(true);
                                        }
                                    }}
                                    onPress={(e) => {
                                        // if (!mapEnabled) {
                                        scroll.current.scrollTo({
                                            y: mapPosition - 100,
                                            animated: true,
                                        });
                                        console.log(scrollHeight);

                                        // }
                                        setMapVisible(true);
                                    }}
                                    style={[
                                        {
                                            // borderColor: "teal",
                                            // borderWidth: 10,
                                        },
                                        mapVisible
                                            ? mapEnabled.presssable
                                            : mapDisabled.presssable,
                                    ]}
                                >
                                    <View
                                        style={[
                                            {
                                                overflow: "hidden",
                                                borderRadius:
                                                    values.popupBorderRadius,
                                                width: "100%",
                                                height: 300,
                                                // overflow: "visible",
                                            },
                                            mapVisible
                                                ? mapEnabled.container
                                                : mapDisabled.container,
                                        ]}
                                    >
                                        <View
                                            style={[
                                                {
                                                    borderRadius:
                                                        values.popupBorderRadius,
                                                    overflow: "hidden",
                                                    height: "100%",
                                                    width: "100%",
                                                },
                                                mapVisible
                                                    ? mapEnabled.map
                                                    : mapDisabled.map,
                                            ]}
                                        >
                                            <MapComponent />
                                            <Pressable
                                                style={
                                                    ([
                                                        {
                                                            width: 30,
                                                            height: 30,
                                                            position:
                                                                "absolute",
                                                            right: 10,
                                                            top: 10,
                                                        },
                                                    ],
                                                    mapVisible
                                                        ? mapEnabled.x
                                                        : mapDisabled.x)
                                                }
                                                onPress={() => {
                                                    setMapVisible(false);
                                                    console.log(
                                                        "mapVisible",
                                                        mapVisible
                                                    );
                                                }}
                                            >
                                                <MaterialCommunityIcons
                                                    name="close-circle"
                                                    color={"#0008"}
                                                    size={30}
                                                />
                                            </Pressable>
                                        </View>
                                        <View
                                            style={[
                                                {
                                                    width: "100%",
                                                    height: "100%",
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    backgroundColor: "#0000",
                                                },
                                                mapVisible
                                                    ? mapEnabled.cover
                                                    : mapDisabled.cover,
                                            ]}
                                        ></View>
                                    </View>
                                </Pressable>
                                <View
                                    style={
                                        mapVisible
                                            ? mapEnabled.add
                                            : mapDisabled.add
                                    }
                                />
                                <Participant></Participant>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </>
    );
};

const Participant = () => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                zIndex: -1,
            }}
        >
            <Gravatar size={40} email={"filiptheg@gmail.com"}></Gravatar>
            <Text>filiptheg</Text>
        </View>
    );
};

const s = StyleSheet.create({
    infoTitle: {
        fontWeight: "bold",
        color: colors.infoName,
    },
    infoContent: {
        color: colors.infoContent,
        textAlign: "justify",
    },
    infoBlock: {
        marginTop: 7,
    },
});

export default EventPopup;
