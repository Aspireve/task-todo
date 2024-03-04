import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../redux/slice";
import TaskState from "./TaskState";
import formatISODateToDMY from "../utility/formatISODateToDMY";

export default function Tasks({ id, text, isCompleted, time }) {
  const listTodos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(id));
    try {
      const updatedTodos = listTodos.filter((todo) => todo.id !== id);
      dispatch(saveTodos(updatedTodos));
    } catch (e) {
      Alert.alert("Error", "Error Deleting Task")
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.todoRow}>
        <TaskState id={id} isCompleted={isCompleted} />
        <View style={styles.todoTextContainer}>
          <Text
            selectable
            style={
              isCompleted
                ? [
                    styles.text,
                    { textDecorationLine: "line-through", color: "#73737330" },
                  ]
                : styles.text
            }
          >
            {text}
          </Text>
          <Text style={styles.time}>{formatISODateToDMY(time)}</Text>
        </View>
        <TouchableOpacity onPress={handleDeleteTodo}>
          <MaterialIcons
            name="delete-outline"
            size={24}
            color="rgba(255, 0, 0, 0.4)"
            style={styles.delete}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  todoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoTextContainer: {
    flex: 1,
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    color: "#737373",
  },
  time: {
    fontSize: 13,
    color: "#a3a3a3",
    fontWeight: "500",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#73737330",
  },
  delete: {},
});

