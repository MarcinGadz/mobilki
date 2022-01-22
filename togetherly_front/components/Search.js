import { FontAwesome5 } from "@expo/vector-icons";
import * as React from "react";
import { useRef, useState } from "react";
import {
    Modal,
    TextInput,
    View,
    Animated,
    Pressable,
    Text,
    StyleSheet,
} from "react-native";
// import Picker from "react-native-picker";
import { Picker } from "@react-native-picker/picker";
import { UIContext } from "../UIContext";
import DatePicker from "react-native-neat-date-picker";

const Search = () => {
    const { state, dispatch } = React.useContext(UIContext);
    colors = state.theme;
    const [isOpen, setOpen] = React.useState(false);
    // let searchBarHeight = 0;
    const [searchBarHeight, setSearchBarHeight] = React.useState(0);
    const [selectedRadius, setSelectedRadius] = React.useState(1000);
    const [dateFrom, setDateFrom] = React.useState(null);
    const [dateTo, setDateTo] = React.useState(null);

    const heightAnimated = useRef(new Animated.Value(0)).current;

    const animationIn = () => {
        Animated.timing(heightAnimated, {
            toValue: 100,
            duration: 1000,
            // easing: "easeOut",
        }).start();
    };

    const animationOut = () => {
        Animated.timing(heightAnimated, {
            toValue: 0,
            duration: 1000,
            // easing: "easeIn",
        }).start();
    };

    return (
        <>
            <View
                style={{
                    backgroundColor: colors.mainBackground,
                    paddingVertical: 15,
                    paddingHorizontal: 5,
                    position: "relative",
                }}
            >
                <View
                    onLayout={(e) => {
                        var { x, y, width, height } = e.nativeEvent.layout;
                        // searchBarHeight = height;
                        setSearchBarHeight(height);
                        console.log("s:", searchBarHeight);
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                            // backgroundColor: "yellow",
                        }}
                    >
                        <TextInput
                            style={{
                                backgroundColor: colors.textField.background,
                                borderColor: colors.textField.border,
                                borderRadius: 200,
                                borderWidth: 3,
                                paddingHorizontal: 15,
                                paddingVertical: 3,
                                flex: 4,
                                width: "auto",
                            }}
                        ></TextInput>
                        <View
                            style={{
                                flexDirection: "row",
                                flex: 1,
                                justifyContent: "space-around",
                                // backgroundColor: "teal",
                            }}
                        >
                            <FontAwesome5
                                name={"search"}
                                style={
                                    {
                                        // flex: 1,
                                        // marginLeft: 15,
                                        // backgroundColor: "red",
                                    }
                                }
                                size={33}
                                color={colors.tabBarInactiveTintColor}
                            />
                            <View
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <FontAwesome5
                                    name={"chevron-down"}
                                    style={{
                                        // flex: 1,
                                        // marginLeft: 20,
                                        // backgroundColor: "green",
                                        transform: [
                                            {
                                                rotate: isOpen
                                                    ? "180deg"
                                                    : "0deg",
                                            },
                                        ],
                                    }}
                                    size={15}
                                    color={colors.tabBarInactiveTintColor}
                                    onPress={() => {
                                        setOpen(!isOpen);
                                        console.log(isOpen);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <Dropdown
                colors={colors}
                isOpen={isOpen}
                searchBarHeight={searchBarHeight}
                style={{}}
                selectedRadius={selectedRadius}
                setSelectedRadius={setSelectedRadius}
            ></Dropdown>
        </>
    );
};

const Dropdown = ({
    colors,
    isOpen,
    searchBarHeight,
    style,
    selectedRadius,
    setSelectedRadius,
    dateTo,
    dateFrom,
    setDateTo,
    setDateFrom,
}) => {
    const s = StyleSheet.create({
        dateContainer: {
            flexDirection: "row",
            width: "48%",
            // backgroundColor: "red",
        },
        text: {
            color: colors.tabBarInactiveTintColor,
        },
        date: {
            borderWidth: 2,
            borderRadius: 100,
            borderColor: colors.textField.border,
            textAlign: "center",
        },
        pressable: {
            // width: 100,
            flex: 1,
            marginLeft: 10,
        },
    });

    const [fromDateOpen, setFromDateOpen] = useState(false);
    const [toDateOpen, setToDateOpen] = useState(false);

    return (
        <View
            style={[
                {
                    // top: searchBarHeight + 30,
                    // position: "absolute",
                    height: isOpen ? "auto" : 0,
                    overflow: "hidden",
                    backgroundColor: colors.searchDropdown,
                    width: "96%",
                    alignSelf: "center",
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                },
                style,
            ]}
        >
            <View
                style={{
                    // backgroundColor: "red",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                }}
            >
                <View
                    style={{
                        borderWidth: 2,
                        borderRadius: 100,
                        borderColor: colors.textField.border,
                    }}
                >
                    <Picker
                        mode={"dropdown"}
                        prompt={"qwerty"}
                        selectedValue={selectedRadius}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedRadius(itemValue)
                        }
                        style={[s.text]}
                        dropdownIconColor={colors.tabBarInactiveTintColor}
                        dropdownIconRippleColor={"#fff4"}
                    >
                        <Picker.Item label="500m" value={500} />
                        <Picker.Item label="1km" value={1000} />
                        <Picker.Item label="5km" value={5000} />
                        <Picker.Item label="10km" value={10000} />
                        <Picker.Item label="15km" value={15000} />
                    </Picker>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                    }}
                >
                    <View style={s.dateContainer}>
                        <DatePicker
                            isVisible={fromDateOpen}
                            mode={"single"}
                            onCancel={() => {
                                setFromDateOpen(false);
                            }}
                            onConfirm={(date) => {
                                setFromDateOpen(false);
                                console.log(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    date.getDate()
                                );
                            }}
                        />
                        <Text style={s.text}>From:</Text>
                        <Pressable
                            style={s.pressable}
                            onPress={() => {
                                setFromDateOpen(true);
                            }}
                        >
                            <Text style={[s.text, s.date]}>
                                {dateFrom ? dateFrom : "-"}
                            </Text>
                        </Pressable>
                    </View>
                    <View style={s.dateContainer}>
                        <DatePicker
                            isVisible={toDateOpen}
                            mode={"single"}
                            onCancel={() => {
                                setToDateOpen(false);
                            }}
                            onConfirm={(date) => {
                                setToDateOpen(false);
                                console.log(date.getDate());
                            }}
                        />
                        <Text style={s.text}>To:</Text>
                        <Pressable
                            style={s.pressable}
                            onPress={() => {
                                setToDateOpen(true);
                            }}
                        >
                            <Text style={[s.text, s.date]}>
                                {dateTo ? dateTo : "-"}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Search;
