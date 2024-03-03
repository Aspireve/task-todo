import { StyleSheet, View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Home } from "./screens/Home";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Home />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
