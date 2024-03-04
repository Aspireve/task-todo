import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
  Switch,
} from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function NewTask() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [open, setOpen] = useState(false);
  const [withAlert, setWithAlert] = useState(false);
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
      console.log("date");
      setDate(selectedDate);
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

  const addTodo = () => {};

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
              {monthNames[date.getMonth()] +
                " " +
                date.getDate() +
                ", " +
                date.getFullYear()}
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

        <TouchableOpacity onPress={addTodo} style={styles.button}>
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
