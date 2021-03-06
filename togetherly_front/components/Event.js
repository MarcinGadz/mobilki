import * as React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { values } from "../globals";
import Gravatar from "./Gravatar";
import EventPopup from "./EventPopup";
import { abs, color } from "react-native-reanimated";
import MapComponent from "./MapComponent";
import RoundedCorners from "./RoundedCorners";
import { UIContext } from "../UIContext";

const Event = ({ eventData, participateInEvent }) => {
    const [eventVisible, setEventVisibility] = React.useState(false);
    const { state, dispatch } = React.useContext(UIContext);
    let colors = state.theme;
    const [checkedMap, setCheckedMap] = React.useState(false);

    const s = StyleSheet.create({
        infoTitle: {
            fontWeight: "bold",
            color: colors.infoName,
        },
        infoContent: {
            color: colors.infoContent,
        },
        infoBlock: {
            marginTop: 7,
        },
    });

    return (
        <>
            <EventPopup
                visible={eventVisible}
                setVisible={setEventVisibility}
                eventData={eventData}
                checkedMap={checkedMap}
                setCheckedMap={setCheckedMap}
                participateInEvent={participateInEvent}
            ></EventPopup>
            <Pressable
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                    marginVertical: 10,
                    width: "90%",
                    borderRadius: values.popupBorderRadius,
                    overflow: "hidden",
                    height: "auto",
                    elevation: 5,
                    shadowColor: "black",
                    zIndex: -100,
                }}
                key={eventData.id}
                onPress={() => {
                    setEventVisibility(true);
                    setCheckedMap(false);
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
                        paddingVertical: 4,
                        overflow: "visible",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            marginVertical: 3,
                            fontWeight: "bold",
                            marginLeft: 8,
                            color: colors.eventHeaderText,
                        }}
                    >
                        {eventData.title}
                    </Text>
                    <Text
                        style={{
                            fontSize: 13,
                            marginRight: 8,
                            color: colors.eventHeaderText,
                        }}
                    >
                        #{eventData.id}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: colors.mainSecondaryBackground,
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            width: values.popupBorderRadius,
                            height: values.popupBorderRadius + 2,
                            backgroundColor: colors.eventHeader,
                            top: -2.3,
                        }}
                    >
                        <View
                            style={{
                                position: "absolute",
                                width: values.popupBorderRadius,
                                height: values.popupBorderRadius,
                                backgroundColor: colors.mainSecondaryBackground,
                                borderTopLeftRadius: values.popupBorderRadius,
                                bottom: 0,
                            }}
                        ></View>
                    </View>
                    <View
                        style={{
                            position: "absolute",
                            width: values.popupBorderRadius,
                            height: values.popupBorderRadius + 2,
                            backgroundColor: colors.eventHeader,
                            top: -2.3,
                            right: 0,
                        }}
                    >
                        <View
                            style={{
                                position: "absolute",
                                width: values.popupBorderRadius,
                                height: values.popupBorderRadius,
                                backgroundColor: colors.mainSecondaryBackground,
                                borderTopRightRadius: values.popupBorderRadius,
                                bottom: 0,
                            }}
                        ></View>
                    </View>

                    <View
                        style={{
                            flex: 3,
                            width: "100%",
                            padding: 10,
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
                                size={40}
                                email={eventData.ownerShortInfo.gravatarEmail}
                            ></Gravatar>
                            <Text
                                style={{
                                    marginLeft: 10,
                                    fontSize: 17,
                                    fontWeight: "bold",
                                    color: colors.infoName,
                                }}
                            >
                                {eventData.ownerShortInfo.username}
                            </Text>
                        </View>
                        <View
                            style={
                                {
                                    // height: 102,
                                }
                            }
                        >
                            <View style={s.infoBlock}>
                                <Text style={s.infoTitle}>Date</Text>
                                <Text style={s.infoContent}>
                                    {new Date(eventData.date).toDateString()}
                                </Text>
                            </View>
                            <View style={s.infoBlock}>
                                <Text style={s.infoTitle}>Time</Text>
                                <Text style={s.infoContent}>
                                    {(
                                        "00" +
                                        new Date(eventData.date).getHours()
                                    ).slice(-2) +
                                        ":" +
                                        (
                                            "00" +
                                            new Date(
                                                eventData.date
                                            ).getMinutes()
                                        ).slice(-2)}
                                </Text>
                            </View>
                            <View style={s.infoBlock}>
                                <Text style={s.infoTitle}>Description</Text>
                                <Text style={s.infoContent} numberOfLines={2}>
                                    {eventData.description}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor: "teal",
                            flex: 2,
                            width: "100%",
                            justifyContent: "center",
                            // padding: 4,
                            borderRadius: values.popupBorderRadius,
                            margin: 8,
                            overflow: "hidden",
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
                        />
                        <View
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "red",
                                opacity: 0,
                            }}
                        />
                    </View>
                </View>
            </Pressable>
        </>
    );
};

export default Event;
