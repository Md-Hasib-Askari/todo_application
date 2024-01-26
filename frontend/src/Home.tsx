import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader, Checkbox,
    Divider,
    Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip
} from "@nextui-org/react";
import React, {useEffect} from "react";
import {FaTrash} from "react-icons/fa";
import {toast, Toaster} from "react-hot-toast";
import {addData, getData, deleteData, updateData} from "./api/fetchTodo.ts";
import {useTodoStore} from "./store/todoStore.ts";
import {Todo} from "./types/todo.ts";
import EditModal from "./components/EditModal.tsx";
import AvatarComponent from "./components/AvatarComponent.tsx";

const columns = [
    {name: "Todo", uid: "isDone"},
    {name: "Action", uid: "action"},
];

function Home() {
    const {todoList, setTodoList, addTodo, toggleTodo, removeTodo} = useTodoStore(state => {
        return {
            todoList: state.todoList,
            setTodoList: state.setTodoList,
            addTodo: state.addTodo,
            toggleTodo: state.toggleTodo,
            removeTodo: state.removeTodo
        }
    })
    const inputRef = React.useRef<HTMLInputElement>(null);

    const renderCell = React.useCallback((todo: Todo, columnKey: React.Key) => {
        switch (columnKey) {
            case "isDone":
                return (
                    <Checkbox isSelected={todo.status} lineThrough={todo.status} onValueChange={() => selectTodo(todo)}>
                        {todo.title}
                    </Checkbox>
                );
            case "action":
                return (
                    <div className="relative flex jus items-center gap-2">
                        <EditModal todo={todo} />
                        <Tooltip color="danger" content="Delete Todo">
                            <Button className="text-lg text-danger cursor-pointer active:opacity-50"
                                onClick={() => deleteTodo(todo)}
                            >
                                <FaTrash />
                            </Button>
                        </Tooltip>
                    </div>
                );
            default:
                return null;
        }
    }, [todoList])

    useEffect(() => {
        (async () => {
            const {data} = await getData();
            if (data.status === 'success') {
                sortingTodos(data.data);
            }
        })();
    }, []);

    const addTodoForm = async () => {
        const todo = inputRef.current?.value;
        if (todo) {
            inputRef.current!.value = "";
            inputRef.current.focus();
            const newTodo: Todo = {
                _id: "",
                title: todo,
                status: false,
            }
            const {data: {data}} = await addData(newTodo)
            addTodo(data);
            sortingTodos([data, ...todoList]);
        } else {
            toast.error("Please enter a todo");
        }
    }
    const deleteTodo = async (todo: Todo) => {
        const {data} = await deleteData(todo._id);
        if (data.status === 'success') {
            const res = await getData();
            if (res.data.status === 'success') {
                removeTodo(todo);
                sortingTodos(res.data.data);
            }
            toast.success("Todo deleted successfully!")
        }
    }

    const selectTodo = async (todo: Todo) => {
        todo.status = !todo.status;
        const {data} = await updateData(todo);
        if (data.status === "success") {
            const res = await getData();
            if (res.data.status === 'success') {
                toggleTodo({
                    _id: todo._id,
                    title: todo.title,
                    status: todo.status
                });
                sortingTodos(res.data.data);
            }
        }
    }
    const sortingTodos = (data: Todo[]) => {
        const todoDone = data.filter((item) => item.status).reverse()
        const todoNotDone = data.filter((item) => !item.status)

        setTodoList([...todoNotDone, ...todoDone]);
    }
  return (
    <div className="relative h-screen flex justify-center">
        <div><Toaster /></div>
        <div className="absolute top-[2rem] right-[2rem] dark:text-white">
            <AvatarComponent />
        </div>
        <Card className="w-2/3 h-3/4 mt-16 p-2">
            <CardHeader className="flex flex-col gap-4 mb-5">
                <div className="w-full">
                    <h1 className="text-3xl text-danger font-bold mb-2 drop-shadow-sm">Todo Application</h1>
                    <p>Best todo application ever.</p>
                </div>
                <form className="w-full flex gap-2 justify-between"
                    onSubmit={(e) => {
                        e.preventDefault();
                        addTodoForm();
                    }}
                >
                    <input ref={inputRef} className="input input-success input-block flex-grow" placeholder="What to do next?"/>

                    <Button
                        className="h-full text-white flex-none"
                        size="lg"
                        variant="shadow"
                        color="success"
                        type="submit"
                    >
                        Add
                    </Button>
                </form>

            </CardHeader>
            <Divider />
            <CardBody>
                <Table
                    aria-label="Selection behavior table example with dynamic content"
                    hideHeader={true}
                >
                    <TableHeader columns={columns}>
                        {
                            (columnKey) => <TableColumn key={columnKey.uid}>{columnKey.name}</TableColumn>
                        }
                    </TableHeader>
                    <TableBody>
                        {
                            todoList.map((item, key) => (
                                <TableRow key={key}>
                                    {(columnKey) => <TableCell width={'100%'}>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardBody>
            <CardFooter>
                <p className="text-center text-black/50 dark:text-white/90">
                    Made with ❤️ by <a href="#" className="text-danger">Md Hasib Askari</a>
                </p>
            </CardFooter>
        </Card>
    </div>
  )
}

export default Home
