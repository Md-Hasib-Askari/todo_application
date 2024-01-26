import { Request, Response } from "express";
import { ITodo } from "../types/todo";
import todoModel from "../Models/TodoModel";
import TodoModel from "../Models/TodoModel";
import UserModel from "../Models/UserModel";

// Create
const createTodo = async (req: Request, res: Response): Promise<void> => {
  const {email} = req.headers as {email: string};
  try {
    const reqBody = req.body as Pick<ITodo, "title" | "description" | "status">;
    const todo: ITodo = new TodoModel({
        title: reqBody.title,
        description: reqBody.description,
        status: reqBody.status,
        author: email
    });
    const newTodo: ITodo = await todo.save();

    res.status(201).json({ status: "success", data: todo });
  } catch (err: any) {
    res.status(404).json({ status: "fail", data: {message: err.message} });
  }
};

// Read
const getTodos = async (req: Request, res: Response): Promise<void> => {
  const {email} = req.headers as {email: string};
  try {
    let data: ITodo[] = await todoModel.aggregate([
        {$match: {author: email}},
        {$sort: {createdAt: -1}}
    ]);
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err });
  }
};

// Read By ID
const getTodoByID = async (req: Request, res: Response) => {
  let id = req.params.id;
  let query = { _id: id };
  try {
    let data = await todoModel.find(query);
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err });
  }
};

// Update
const updateTodo = async (req: Request, res: Response) => {
  const {
    params: {id},
    body
  } = req;
  const query = { _id: id };

  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(query, body);
    res.status(200).json({ status: "success", data: updatedTodo });
  } catch (err: any) {
    res.status(400).json({ status: "fail", data: {message: err.message} });
  }
};

// Delete
const deleteTodo = async (req: Request, res: Response) => {
  let id = req.params.id;
  // console.log(id);
  let query = { _id: id };
  try {
    let data = await todoModel.deleteOne(query);
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err });
  }
};

export { createTodo, getTodos, getTodoByID, updateTodo, deleteTodo };