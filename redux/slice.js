import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  todos: [],
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
      dispatch(setTodos(todos));
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

export const saveTodos = (todos) => async (dispatch) => {
  try {
    await AsyncStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving todos:", error);
  }
};

export default todosSlice.reducer;
