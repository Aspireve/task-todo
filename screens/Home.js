import { useSelector, useDispatch } from "react-redux";
import TaskState from "../components/TaskState";
import { useEffect, useState } from "react";
import { fetchTodos } from "../redux/slice";
import ListTasks from "../components/ListTasks";
import * as Notifications from "expo-notifications";
import registerForPushNotificationsAsync from "../utility/registerForPushNotificationsAsync";
import { useNavigation } from "@react-navigation/native";
import checkFirstLaunch from "../utility/checkFirstLaunch";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import DisplayTasks from "../components/DisplayTasks";
import TaskComplete from "../components/TaskComplete";
import AddTask from "../components/AddTask";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Home() {
  const todos = useSelector((state) => state.todos.todos);
  const [expoPushToken, setExpoPushToken] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    checkFirstLaunch(navigation);
  }, []);

  return (
    <>
      {todos.length > 0 ? <DisplayTasks /> : <TaskComplete />}
      <AddTask />
    </>
  );
}
