import React from "react";
import {Checkbox, Tooltip} from "@nextui-org/react";
import {FaPen, FaTrash} from "react-icons/fa";

type Todo = {
    key: number,
    isDone: boolean,
    todo: string
}

type Function = (todo: Todo) => void;

const renderCell = (todo: Todo, columnKey: React.Key, editTodo: Function, deleteTodo: Function, selectTodo: Function) => {
    switch (columnKey) {
        case "isDone":
            return (
                <Checkbox isSelected={todo.isDone} lineThrough={todo.isDone} onValueChange={() => selectTodo(todo)}>
                    {todo.todo} {todo.key} {todo.isDone.toString()}
                </Checkbox>
            );
        case "action":
            return (
                <div className="relative flex jus items-center gap-2">
                    <Tooltip content="Edit Todo">
                        <button className="text-secondary border-b-3 cursor-pointer active:opacity-50"
                                onClick={() => editTodo(todo)}
                        >
                            <FaPen />
                        </button>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete Todo">
                        <button className="text-lg text-danger cursor-pointer active:opacity-50"
                                onClick={() => deleteTodo(todo)}
                        >
                            <FaTrash />
                        </button>
                    </Tooltip>
                </div>
            );
        default:
            return null;
    }
}

export default renderCell;