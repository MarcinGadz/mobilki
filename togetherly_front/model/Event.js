import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

const Event = ( {EventData} ) => {
  return (
    <View style={styles.Event} key={EventData.id}>
      <Text>Event data passed</Text>
      <Text>{EventData.id}</Text>
      <Text>{EventData.description}</Text>
      <Text>{EventData.owner}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Event: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Event;