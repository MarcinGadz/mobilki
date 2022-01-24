export const light = {
    mainBackground: "#313f59",
    mainSecondaryBackground: "#ffffff",
    popupBackground: "#313f59",
    popupSecondaryBackground: "#0007",
    popupBorder: "#242f42d9",
    button: {
        blue: {
            background: "#313f59dd",
            border: "#242f42d9",
            text: "#ffffff",
        },
        yellow: {
            background: "#f2ce16dd",
            border: "#f2bd1ddd",
            text: "#242f42",
        },
    },
    infoName: "#2b364a",
    infoContent: "#313f59",
    eventHeader: "#717f98",
    eventHeaderText: "#000",
    tabBarActiveTintColor: "#F1A81D",
    tabBarInactiveTintColor: "#ffffff",
    tabBarActiveBackgroundColor: "#ffffff15",
    textField: {
        background: "#fff",
        border: "#fff8",
        text: "#000",
    },
    textFieldB: {
        background: "#fff",
        border: "#0002",
        text: "#000",
        placeholder: "#0007",
    },
    searchDropdown: "hsl(219, 29%, 45%)",
    map: [],
};

export const dark = {
    mainBackground: "hsl(219, 5%, 6%)",
    mainSecondaryBackground: "hsl(0, 0%, 20%)",
    popupBackground: "hsl(219, 29%, 10%)",
    popupSecondaryBackground: "#ffffff10",
    popupBorder: "hsla(218, 29%, 20%, 0.3)",
    button: {
        blue: {
            background: "hsla(219, 29%, 27%, 0.9)",
            border: "hsla(218, 29%, 20%, 0.9)",
            text: "hsl(0, 0%, 45%)",
        },
        yellow: {
            background: "hsla(50, 89%, 51%, 0.2)",
            border: "hsla(45, 89%, 53%, 0.3)",
            text: "hsl(218, 29%, 60%)",
        },
    },
    infoName: "hsl(218, 26%, 45%)",
    infoContent: "hsl(219, 29%, 65%)",
    eventHeader: "hsl(218, 15%, 30%)",
    eventHeaderText: "#fff6",
    tabBarActiveTintColor: "hsl(39, 88%, 35%)",
    tabBarInactiveTintColor: "hsl(0, 0%, 50%)",
    tabBarActiveBackgroundColor: "hsla(0, 0%, 100%, 0.1)",
    textField: {
        background: "#fff2",
        border: "#fff4",
        text: "hsl(0, 0%, 80%)",
    },
    textFieldB: {
        background: "#fff2",
        border: "#fff4",
        text: "#fffc",
        placeholder: "#fff5",
    },
    searchDropdown: "hsl(219, 29%, 10%)",
    map: [
        {
            elementType: "geometry",
            stylers: [
                {
                    color: "#242f3e",
                },
            ],
        },
        {
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#746855",
                },
            ],
        },
        {
            elementType: "labels.text.stroke",
            stylers: [
                {
                    color: "#242f3e",
                },
            ],
        },
        {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#d59563",
                },
            ],
        },
        {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#d59563",
                },
            ],
        },
        {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
                {
                    color: "#263c3f",
                },
            ],
        },
        {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#6b9a76",
                },
            ],
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                {
                    color: "#38414e",
                },
            ],
        },
        {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
                {
                    color: "#212a37",
                },
            ],
        },
        {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#9ca5b3",
                },
            ],
        },
        {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
                {
                    color: "#746855",
                },
            ],
        },
        {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
                {
                    color: "#1f2835",
                },
            ],
        },
        {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#f3d19c",
                },
            ],
        },
        {
            featureType: "transit",
            elementType: "geometry",
            stylers: [
                {
                    color: "#2f3948",
                },
            ],
        },
        {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#d59563",
                },
            ],
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [
                {
                    color: "#17263c",
                },
            ],
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#515c6d",
                },
            ],
        },
        {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [
                {
                    color: "#17263c",
                },
            ],
        },
    ],
};

export const values = {
    popupBorderRadius: 10,
};
