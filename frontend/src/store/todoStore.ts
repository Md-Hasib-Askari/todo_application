import { create } from "zustand";

import {TodoStore} from "../types/todo";

export const useTodoStore = create<TodoStore>((set) => ({
    todoList: [],
    setTodoList: (todoList) => set({todoList}),
    addTodo: (todo) => set((state) => ({todoList: [...state.todoList, todo]})),
    toggleTodo: (todo) =>
        set((state) => ({
            todoList: state.todoList.map((t) =>
                t._id === todo._id ? {...t, status: !t.status} : t
                ),
        })),
    editTodo: (todo) =>
        set((state) => ({
            todoList: state.todoList.map((t) =>
                t._id === todo._id ? {...t, title: todo.title} : t
                ),
        })),
    removeTodo: (todo) =>
        set((state) => ({
            todoList: state.todoList.filter((t) => t._id !== todo._id),
        })),
    })
);