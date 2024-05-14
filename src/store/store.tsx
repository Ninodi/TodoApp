import { configureStore } from "@reduxjs/toolkit";
import popupReducer from './popup/popup.slice';
import selectedTodoReducer from "./selectedTodo/selectedTodo.slice";
import todoReducer from "./todo/todo.slice";

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        popup: popupReducer,
        selectedTodo: selectedTodoReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
