import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Tooltip,
    useDisclosure
} from "@nextui-org/react";
import {FaPen} from "react-icons/fa";
import React from "react";
import { Todo as T } from "../types/todo";
import {useTodoStore} from "../store/todoStore.ts";
import {updateData} from "../api/fetchTodo.ts";

export default function EditModal({ todo } : {
    todo: T,
}) {
    const { editTodo } = useTodoStore(state => {
        return {editTodo: state.editTodo}
    })
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [changedTodo, setChangedTodo] = React.useState(todo.title);

    async function changeTodo(onClose: () => void) {
        todo = {...todo, title: changedTodo};
        const {data: {data}} = await updateData(todo);
        if (data.status === 'success') {
            editTodo({
                _id: todo._id,
                title: changedTodo,
                status: todo.status
            });
        }
        editTodo(todo);
        onClose();
    }

    return (
        <>
            <Tooltip color="warning" content="Edit Todo">
                <Button className="text-secondary border-b-3 cursor-pointer active:opacity-50"
                        onPress={onOpen}
                >
                    <FaPen />
                </Button>

            </Tooltip>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 dark:text-white">Edit</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Todo"
                                    className="dark:text-white"
                                    variant="bordered"
                                    defaultValue={changedTodo}
                                    onChange={(event) => setChangedTodo(event.target.value)}
                                    inputMode={"text"}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => {changeTodo(onClose)}}>
                                    Done
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}