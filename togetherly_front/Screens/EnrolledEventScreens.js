import * as React from "react";
import { useState } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import LoadingScreen from "./LoadingScreen";
import useToken from "../useToken";
import Event from "../components/Event";
import { UIContext } from "../UIContext";
import Search from "../components/Search";
let colors;

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const EnrolledEventsScreen = () => {
    const [data, setData] = useState([]);
    const { token, setToken } = useToken();
    const [localToken, setLocalToken] = useState();
    const axios = require("axios").default;
    const { state, dispatch } = React.useContext(UIContext);
    colors = state.theme;

    const [refreshing, setRefreshing] = React.useState(true);
    const [dateFrom, setDateFrom] = React.useState(null);
    const [dateTo, setDateTo] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState(null);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    React.useEffect(() => {
        (async () => {
            let userToken;
            try {
                userToken = await token;
            } catch (e) {
                console.log(e);
            }
            setLocalToken(userToken);
        })();
    }, []);

    React.useEffect(() => {
        if (localToken && refreshing) {
            let authString = "Bearer " + localToken;
            axios
                .get("/user/events", {
                    headers: {
                        Authorization: authString,
                    },
                    params: {
                        after: dateFrom
                            ? dateFrom.toISOString().split("T")[0]
                            : null,
                        before: dateTo
                            ? dateTo.toISOString().split("T")[0]
                            : null,
                        title: searchQuery,
                    },
                })
                .then((res) => {
                    setData(res.data);
                    setRefreshing(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [refreshing, localToken]);

    const renderTable = () => {
        return data.map((e) => {
            console.log(e);
            return <Event eventData={e} key={e.id} participateInEvent={null} />;
        });
    };

    if (refreshing) {
        return <LoadingScreen />;
    } else {
        return (
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: colors.mainSecondaryBackground,
                }}
            >
                <Search
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    setDateFrom={setDateFrom}
                    setDateTo={setDateTo}
                    onRefresh={onRefresh}
                    selectedRadius={null}
                    setSelectedRadius={null}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <ScrollView
                    contentContainerStyle={{
                        alignItems: "center",
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {renderTable()}
                </ScrollView>
            </View>
        );
    }
};

export default EnrolledEventsScreen;
