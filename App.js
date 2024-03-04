import "react-native-gesture-handler";
import { StyleSheet, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Home from "./screens/Home";
import Onboarding from "./screens/Onboarding";
import NewTask from "./screens/NewTask";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Add"
            component={NewTask}
            options={{
              presentation: "modal",
              headerTitle: "Task",
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{
              headerShown: false,
              presentation: 'modal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
