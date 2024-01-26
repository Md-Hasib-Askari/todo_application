export type Todo = {
    _id: string,
    title: string,
    status: boolean,
};

export interface TodoStore {
    todoList: Todo[];
    setTodoList: (todoList: Todo[]) => void;
    addTodo: (todo: Todo) => void;
    toggleTodo: (todo: Todo) => void;
    editTodo: (todo: Todo) => void;
    removeTodo: (todo: Todo) => void;
}