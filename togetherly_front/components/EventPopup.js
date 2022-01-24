import * as React from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Alert,
    Pressable,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Button from "./Button";
import PopupBackground from "./PopupBackground";
import { values } from "../globals";
import { ScrollView } from "react-native-gesture-handler";
import Gravatar from "./Gravatar";
import MapComponent from "./MapComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RoundedCorners from "./RoundedCorners";
import { UIContext } from "../UIContext";

var scrollHeight = 0;

const EventPopup = ({
    visible,
    setVisible,
    eventData,
    checkedMap,
    setCheckedMap,
    participateInEvent,
    background = true,
}) => {
    const { state, dispatch } = React.useContext(UIContext);
    let colors = state.theme;
    const scroll = React.useRef();
    var secondLayout = undefined;

    const [mapVisible, setMapVisible] = useState(false);

    var mapPosition = 228;
    var heightCheck = false;

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
                    setMapVisible(false);
                }}
                onShow={console.log("shown")}
            >
                <View
                    style={{
                        overflow: "visible",
                    }}
                >
                    <ScrollView
                        ref={scroll}
                        onLayout={(e) => {
                            if (!heightCheck) {
                                var { x, y, width, height } =
                                    e.nativeEvent.layout;
                                heightCheck = true;
                                scrollHeight = height;
                                console.log(scrollHeight);
                            }
                        }}
                        contentContainerStyle={{
                            alignItems: "center",
                            borderRadius: values.popupBorderRadius,
                            overflow: "hidden",
                            marginHorizontal: "5%",
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
                            <Header
                                eventData={eventData}
                                colors={colors}
                            ></Header>
                            <RoundedCorners></RoundedCorners>
                            <View style={{ padding: 15 }}>
                                <Owner
                                    eventData={eventData}
                                    colors={colors}
                                    participateInEvent={participateInEvent}
                                ></Owner>
                                <EventInfo
                                    eventData={eventData}
                                    colors={colors}
                                ></EventInfo>
                            </View>
                            <View
                                style={{ padding: 15, width: "100%" }}
                                onLayout={(e) => {
                                    let { x, y, width, height } =
                                        e.nativeEvent.layout;
                                    mapPosition = x;
                                }}
                            >
                                <Map
                                    eventData={eventData}
                                    mapVisible={mapVisible}
                                    setMapVisible={setMapVisible}
                                    scroll={scroll}
                                    mapPosition={mapPosition}
                                    colors={colors}
                                ></Map>
                            </View>
                            <Participants
                                colors={colors}
                                eventData={eventData}
                            />
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </>
    );
};

const Participant = ({ username, gravatarEmail }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
                width: "50%",
            }}
        >
            <Gravatar size={40} email={gravatarEmail}></Gravatar>
            <Text
                style={{
                    flex: 1,
                    marginLeft: 10,
                    fontSize: 16,
                }}
                numberOfLines={1}
            >
                {username}
            </Text>
        </View>
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
            }}
        >
            <Text
                style={{
                    fontSize: 23,
                    marginVertical: 3,
                    fontWeight: "bold",
                    marginLeft: 15,
                }}
                numberOfLines={1}
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
    );
};

const Owner = ({ eventData, colors, participateInEvent }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
            onLayout={(e) => {
                var { x, y, width, height } = e.nativeEvent.layout;
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
                    email={eventData.ownerShortInfo.gravatarEmail}
                ></Gravatar>
                <Text
                    style={{
                        marginLeft: 10,
                        fontSize: 20,
                        fontWeight: "bold",
                        color: colors.infoName,
                    }}
                >
                    {eventData.ownerShortInfo.username}
                </Text>
            </View>
            <View>
                {participateInEvent ? (
                    <Button
                        text={"Participate"}
                        variant="blue"
                        width={150}
                        onPress={() => {
                            participateInEvent(eventData.id);
                        }}
                    ></Button>
                ) : null}
            </View>
        </View>
    );
};

const EventInfo = ({ eventData, colors }) => {
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

    return (
        <View
            style={{
                width: "100%",
                padding: 10,
            }}
        >
            <View>
                <View style={s.infoBlock}>
                    <Text style={s.infoTitle}>Date</Text>
                    <Text style={s.infoContent}>
                        {new Date(eventData.date).toDateString()}
                    </Text>
                </View>
                <View style={s.infoBlock}>
                    <Text style={s.infoTitle}>Time</Text>
                    <Text style={s.infoContent}>
                        {("00" + new Date(eventData.date).getHours()).slice(
                            -2
                        ) +
                            ":" +
                            (
                                "00" + new Date(eventData.date).getMinutes()
                            ).slice(-2)}
                    </Text>
                </View>
                <View style={s.infoBlock}>
                    <Text style={s.infoTitle}>Description</Text>
                    <Text style={s.infoContent}>{eventData.description}</Text>
                </View>
            </View>
        </View>
    );
};

const Map = ({
    mapVisible,
    setMapVisible,
    scroll,
    mapPosition,
    colors,
    eventData,
}) => {
    const mapEnabled = StyleSheet.create({
        wrapper: {
            height: Dimensions.get("window").height * 0.7,
        },
        x: {
            transform: [{ scaleX: 1 }],
        },
        cover: {
            width: 0,
            height: 0,
        },
    });
    const mapDisabled = StyleSheet.create({
        wrapper: {
            height: 250,
        },
        x: {
            transform: [{ scaleX: 0 }],
        },
        cover: {
            width: "100%",
            height: "100%",
        },
    });
    let touchCords = [0, 0];
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

    return (
        <View
            style={{
                paddingHorizontal: 10,
            }}
        >
            <Text style={s.infoTitle}>Localization</Text>
            <View
                style={[
                    {
                        borderRadius: values.popupBorderRadius,
                        overflow: "hidden",
                        backgroundColor: "red",
                        marginTop: 5,
                    },
                    mapVisible ? mapEnabled.wrapper : mapDisabled.wrapper,
                ]}
            >
                <Pressable
                    style={{ height: "100%", width: "100%" }}
                    onPressIn={(e) => {
                        touchCords = [
                            e.nativeEvent.locationX,
                            e.nativeEvent.locationY,
                        ];
                    }}
                    onPressOut={(e) => {
                        if (
                            Math.abs(e.nativeEvent.locationX - touchCords[0]) <
                                5 ||
                            Math.abs(e.nativeEvent.locationY - touchCords[1]) <
                                5
                        ) {
                            setMapVisible(true);
                            scroll.current.scrollTo({
                                y: mapPosition,
                                animated: true,
                            });
                        }
                    }}
                >
                    <MapComponent
                        points={[
                            {
                                id: eventData.id,
                                coordinates: {
                                    latitude: eventData.startPoint.x,
                                    longitude: eventData.startPoint.y,
                                },
                                title: eventData.title,
                                description: eventData.description,
                            },
                        ]}
                    ></MapComponent>
                    <View
                        style={[
                            {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                backgroundColor: "#0002",
                                zIndex: 200,
                                height: "100%",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                            },
                            mapVisible ? mapEnabled.cover : mapDisabled.cover,
                        ]}
                    >
                        <MaterialCommunityIcons
                            name="fullscreen"
                            size={150}
                            color="#fffa"
                        ></MaterialCommunityIcons>
                    </View>
                    <Pressable
                        style={[
                            {
                                position: "absolute",
                                right: 10,
                                top: 10,
                                zIndex: 200000,
                            },
                            mapVisible ? mapEnabled.x : mapDisabled.x,
                        ]}
                        onPress={() => setMapVisible(false)}
                    >
                        <MaterialCommunityIcons
                            name="close-circle"
                            size={25}
                            color="#000b"
                        ></MaterialCommunityIcons>
                    </Pressable>
                </Pressable>
            </View>
        </View>
    );
};

const Participants = ({ colors, eventData }) => {
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

    const renderParticipants = () => {
        if (typeof eventData.enrolledUsers !== undefined) {
            return eventData.enrolledUsers.map((u) => {
                return (
                    <Participant
                        key={u.id}
                        username={u.username}
                        gravatarEmail={u.gravatarEmail}
                    />
                );
            });
        } else {
            return null;
        }
    };

    return (
        <View
            style={{
                marginTop: 20,
                paddingHorizontal: 10,
            }}
        >
            <Text style={s.infoTitle}>Participants</Text>
            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
            >
                {renderParticipants()}
            </View>
        </View>
    );
};

export default EventPopup;
