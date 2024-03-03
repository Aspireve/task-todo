import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  todos: [
    {
      "id": 1,
      "text": "Take out the trash",
      "isCompleted": true,
      "time": new Date("2024-03-02 00:00:00")
    },
    {
      "id": 2,
      "text": "Meeting with the boss",
      "isCompleted": false,
      "time": new Date("2024-03-03 00:00:00")
    },
    {
      "id": 3,
      "text": "Dentist appointment",
      "isCompleted": true,
      "time": new Date("2024-03-10 00:00:00")
    },
    {
      "id": 4,
      "text": "Dentist appointment",
      "isCompleted": true,
      "time": new Date("2024-03-21 00:00:00")
    }
  ],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    hideCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.isCompleted);
    },
    updateTodo: (state, action) => {
      const { id } = action.payload;
      state.todos = state.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
      console.log("new", state.todos)
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
  },
});

export const { setTodos, addTodo, updateTodo, hideCompleted, deleteTodo } =
  todosSlice.actions;

export const fetchTodos = () => async (dispatch) => {
  try {
    const todosString = await AsyncStorage.getItem("todos");
    if (todosString !== null) {
      const todos = JSON.parse(todosString);
      console.log("fetch",todosString)
      dispatch(setTodos(todos));
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

export const saveTodos = (todos) => async (dispatch) => {
  try {
    console.log("todos", todos)
    await AsyncStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving todos:", error);
  }
};

export default todosSlice.reducer;
