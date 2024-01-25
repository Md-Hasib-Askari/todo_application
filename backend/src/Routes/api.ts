/*
 * Add all your Routes here and export them
 */
import { Request, Response } from "express";
const router = require("express").Router();
import * as TodoController from "../Controllers/TodoController";
import * as UserController from "../Controllers/UserController";
import UserModel from "../Models/UserModel";

// Test
router.get("/", (req: Request, res: Response) => {
  res.send("Hello Express JS");
});

// Todo
router.post("/add-todo", TodoController.createTodo);
router.get("/get-todo", TodoController.getTodos);
router.get("/get-todo/:id", TodoController.getTodoByID);
router.put("/update-todo/:id", TodoController.updateTodo);
router.delete("/delete-todo/:id", TodoController.deleteTodo);

// User
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/otp", UserController.otp);
router.get("/logout", UserController.logout);
router.get("/getUsers", async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({users});
  } catch (e) {
    res.status(500).json({message: "Something is wrong!"})
  }
});

export default router;
