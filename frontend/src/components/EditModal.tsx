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
import React, {useEffect} from "react";

type T = {
    key: number,
    isDone: boolean,
    todo: string
}

export default function EditModal({ todo, callback } : {
    todo: T,
    callback: (todo: T) => void
}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [changedTodo, setChangedTodo] = React.useState(todo);

    function changeTodo(onClose: () => void) {
        // console.log(changedTodo);
        callback(changedTodo);
        onClose();
    }

    useEffect(() => {
        console.log(changedTodo)
        callback(changedTodo);
    }, [changedTodo]);

    return (
        <>
            <Tooltip content="Edit Todo">
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
                            <ModalHeader className="flex flex-col gap-1">Edit</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Todo"
                                    variant="bordered"
                                    defaultValue={changedTodo.todo}
                                    onChange={() => setChangedTodo({...changedTodo})}
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