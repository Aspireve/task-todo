import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import getDateStatus from "../utility/getDateStatus";
import { useSelector, useDispatch } from "react-redux";
import ListTasks from "./ListTasks";
import { hideCompleted, setTodos } from "../redux/slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DisplayTasks() {
  const [todayTodos, setTodayTodos] = useState([]);
  const [laterTodos, setLaterTodos] = useState([]);
  const todos = useSelector((state) => state.todos.todos);
  const [isHidden, setIsHidden] = useState(false);
  const dispatch = useDispatch();

  const handleHideCompleted = async () => {
    if (isHidden) {
      setIsHidden(false);
      await AsyncStorage.getItem("todos").then((todos) => {
        if (todos !== null) {
          dispatch(setTodos(JSON.parse(todos)));
        }
      });
      return;
    }
    setIsHidden(!isHidden);
    dispatch(hideCompleted());
  };

  useLayoutEffect(() => {
    setTodayTodos(todos.filter((todo) => getDateStatus(todo.time) === "TODAY"))
    setLaterTodos(todos.filter((todo) => getDateStatus(todo.time) === "FUTURE"))
  } , [todos])

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>Today</Text>
        <TouchableOpacity onPress={handleHideCompleted}>
          <Text style={{ color: "#3478F6" }}>
            {isHidden ? "Show Completed" : "Hide Completed"}
          </Text>
        </TouchableOpacity>
      </View>
      {todayTodos.length > 0 ? (
        <ListTasks listTodos={todayTodos} />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 13, color: "#000", fontWeight: "bold" }}>
            CONGRATS!
          </Text>
          <Text style={{ fontSize: 13, color: "#737373", fontWeight: "500" }}>
            You don't have any task, enjoy your day.
          </Text>
        </View>
      )}
      <Text style={styles.title}>Tomorrow</Text>
      {laterTodos.length > 0 ? (
        <ListTasks listTodos={laterTodos} />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 13, color: "#000", fontWeight: "bold" }}>
            NICE!
          </Text>
          <Text style={{ fontSize: 13, color: "#737373", fontWeight: "500" }}>
            Nothing is scheduled for tomorrow..
          </Text>
        </View>
      )}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 10,
  },
  pic: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignSelf: "flex-end",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    width: "100%",
  },
});
