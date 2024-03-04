import { Alert } from "react-native";
import * as Notifications from 'expo-notifications';

export const scheduleTodoNotification = async (todo) => {
  const trigger = new Date(todo.time);
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Alert! You have a task to do!",
        body: todo.text,
      },
      trigger,
    });
    console.log("Notification scheduled");
  } catch (e) {
    Alert.alert("The notification failed to schedule, make sure the hour is valid");
  }
};
