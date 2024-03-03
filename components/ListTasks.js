import { FlatList, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Tasks from "./Tasks";

export default function ListTasks({listTodos}) {
  return (
    <FlatList
      data={listTodos}
      style={{width: "100%"}}
      renderItem={({ item }) => {
        return <Tasks {...item} />;
      }}
      keyExtractor={(item) => {
        return item.id;
      }}
    />
  );
}
