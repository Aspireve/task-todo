import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, saveTodos } from "../redux/slice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { scheduleTodoNotification } from "../utility/scheduleTodoNotification";

export default function NewTask() {
  const [name, setName] = useState("");
  const [taskdate, setTaskDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [open, setOpen] = useState(false);
  const [withAlert, setWithAlert] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const listTodos = useSelector((state) => state.todos.todos);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const onChange = (event, selectedDate, mode) => {
    if (mode === "time") {
      setTime(selectedDate);
    } else if (mode === "date") {
      setTaskDate(selectedDate);
    }
    setOpen(false);
  };

  const showMode = (currentMode) => {
    setOpen(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const addTodoToList = async () => {
    const date = taskdate.getDate();
    const month = taskdate.getMonth();
    const year = taskdate.getFullYear();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const combinedDate = `${year}-${month < 9 ? "0": ""}${month+1}-${date < 10 ? "0": ""}${date} ${hours}:${minutes}:00`
    const newTodo = {
      id: Math.floor(Math.random() * 1000000),
      text: name,
      isCompleted: false,
      time: combinedDate,
    };
    try {
      const new_todos = [...listTodos, newTodo]
      dispatch(saveTodos(new_todos))
      dispatch(addTodo(newTodo));
      if(withAlert){
          await scheduleTodoNotification(newTodo);
          console.log("scheduled")
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert("Error", e);
    }
  };

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.title}>Add a Task</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Task"
            value={name}
            placeholderTextColor="#00000030"
            onChangeText={(text) => {
              setName(text);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Time</Text>
          <TouchableOpacity onPress={showTimepicker}>
            <Text>{time.getHours() + " : " + time.getMinutes()}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Date</Text>
          <TouchableOpacity onPress={showDatepicker}>
            <Text>
              {monthNames[taskdate.getMonth()] +
                " " +
                taskdate.getDate() +
                ", " +
                taskdate.getFullYear()}
            </Text>
          </TouchableOpacity>
          {open && (
            <DateTimePicker
              value={new Date()}
              mode={mode}
              disabled={open}
              is24Hour={true}
              onChange={(e, s) => onChange(e, s, mode)}
              style={{ width: "80%" }}
            />
          )}
        </View>

        <View
          style={[
            styles.inputContainer,
            { paddingBottom: 0, alignItems: "center" },
          ]}
        >
          <View>
            <Text style={styles.inputTitle}>Alert</Text>
            <Text style={{ color: "#00000040", fontSize: 12, maxWidth: "85%" }}>
              You will receive an alert at the time you set for this reminder
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#999", true: "#999" }}
            thumbColor={withAlert ? "#000" : "#eee"}
            value={withAlert}
            onValueChange={(value) => {
              setWithAlert(value);
            }}
          />
        </View>

        <TouchableOpacity onPress={addTodoToList} style={styles.button}>
          <Text style={{ color: "white" }}>Done</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 10,
  },
  textInput: {
    borderBottomColor: "#00000030",
    borderBottomWidth: 1,
    width: "70%",
  },
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    paddingHorizontal: 30,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
    marginRight: 20,
  },
  inputContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 30,
  },
  button: {
    marginTop: 30,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    height: 46,
    borderRadius: 11,
  },
});
