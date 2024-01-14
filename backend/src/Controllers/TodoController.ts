import { Request, Response } from "express";
import { ITodo } from "../types/todo";
import todoModel from "../Models/TodoModel";
import TodoModel from "../Models/TodoModel";

// Create
const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const reqBody = req.body as Pick<ITodo, "title" | "description" | "status">;
    console.log(reqBody);
    const todo: ITodo = new TodoModel({
        title: reqBody.title,
        description: reqBody.description,
        status: reqBody.status,
    });
    const newTodo: ITodo = await todo.save();

    res.status(201).json({ status: "success", data: newTodo });
  } catch (err: any) {
    res.status(404).json({ status: "fail", data: {message: err.message} });
  }
};

// Read
const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    let data: ITodo[] = await todoModel.aggregate([
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