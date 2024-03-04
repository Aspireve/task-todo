import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

export default function TaskComplete() {
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Image
          source={require("../assets/no-task.png")}
          style={{
            width: 250,
            height: 250,
            display: "block",
            marginBottom: 20,
            contentFit: "contain",
          }}
        />
        <Text style={{ fontSize: 20, color: "#000", fontWeight: "bold" }}>
          GOOD GOING!
        </Text>
        <Text style={{ fontSize: 18, color: "#737373", fontWeight: "400" }}>
          Nothing is scheduled.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
