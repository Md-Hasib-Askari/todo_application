import axios from "axios";

export async function getData() {
    return await axios.get("http://localhost:5000/api/v1/get-todo/");
}

export async function addData({title, status}: {
    title: string;
    status: boolean;
}) {
    return await axios.post(
        "http://localhost:5000/api/v1/add-todo/",
        {
            title,
            status
        },
        {
            headers: {"Content-Type": "application/json",},
        }
        );
}

export async function deleteData(id: string) {
    return await axios.delete(
        `http://localhost:5000/api/v1/delete-todo/${id}`,
        {
            headers: {"Content-Type": "application/json",},
        }
        );
}

export async function updateData({
    _id,
    title,
    status,
}: {
    _id: string;
    title: string;
    status: boolean;
}) {
    return await axios.put(
        `http://localhost:5000/api/v1/update-todo/${_id}`,
        {
            title,
            status
        },
        {
            headers: {"Content-Type": "application/json",},
        }
        );
}