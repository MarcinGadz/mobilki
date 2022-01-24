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
import { Picker } from "@react-native-picker/picker";
import { UIContext } from "../UIContext";
import DatePicker from "react-native-neat-date-picker";

const Search = ({
    setParentRadius,
    dateTo,
    dateFrom,
    setDateTo,
    setDateFrom,
    onRefresh,
    selectedRadius,
    setSelectedRadius,
    searchQuery,
    setSearchQuery,
}) => {
    const { state, dispatch } = React.useContext(UIContext);
    colors = state.theme;
    const [isOpen, setOpen] = React.useState(false);
    const [searchBarHeight, setSearchBarHeight] = React.useState(0);

    const heightAnimated = useRef(new Animated.Value(0)).current;

    const animationIn = () => {
        Animated.timing(heightAnimated, {
            toValue: 100,
            duration: 1000,
        }).start();
    };

    const animationOut = () => {
        Animated.timing(heightAnimated, {
            toValue: 0,
            duration: 1000,
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
                        setSearchBarHeight(height);
                        console.log("s:", searchBarHeight);
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
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
                                color: colors.textField.text,
                            }}
                            onChangeText={(e) => {
                                if (e == "") {
                                    setSearchQuery(null);
                                } else {
                                    setSearchQuery(e);
                                }
                            }}
                            value={searchQuery}
                        ></TextInput>
                        <View
                            style={{
                                flexDirection: "row",
                                flex: 1,
                                justifyContent: "space-around",
                            }}
                        >
                            <FontAwesome5
                                name={"search"}
                                size={33}
                                color={colors.tabBarInactiveTintColor}
                                onPress={onRefresh}
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
                dateFrom={dateFrom}
                dateTo={dateTo}
                setDateFrom={setDateFrom}
                setDateTo={setDateTo}
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
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                }}
            >
                {setSelectedRadius ? (
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
                            <Picker.Item label="15000km" value={15000000} />
                        </Picker>
                    </View>
                ) : null}

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
                                setDateFrom(date);
                            }}
                            colorOptions={colors.datePicker}
                        />
                        <Text style={s.text}>From:</Text>
                        <Pressable
                            style={s.pressable}
                            onPress={() => {
                                setFromDateOpen(true);
                            }}
                            onLongPress={() => {
                                setDateFrom(null);
                            }}
                        >
                            <Text style={[s.text, s.date]}>
                                {dateFrom ? dateFrom.toDateString() : "-"}
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
                                setDateTo(date);
                            }}
                            colorOptions={colors.datePicker}
                        />
                        <Text style={s.text}>To:</Text>
                        <Pressable
                            style={s.pressable}
                            onPress={() => {
                                setToDateOpen(true);
                            }}
                            onLongPress={() => {
                                setDateTo(null);
                            }}
                        >
                            <Text style={[s.text, s.date]}>
                                {dateTo ? dateTo.toDateString() : "-"}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Search;
