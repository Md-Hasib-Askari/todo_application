import { Request, Response } from "express";
const router = require("express").Router();
import * as TodoController from "../Controllers/TodoController";
import * as UserController from "../Controllers/UserController";
import UserModel from "../Models/UserModel";
import {authVerify} from "../Middlewares/AuthVerify";

// Test
router.get("/", (req: Request, res: Response) => {
  res.send("Hello Express JS");
});

// Todo
router.post("/add-todo", authVerify, TodoController.createTodo);
router.get("/get-todo", authVerify, TodoController.getTodos);
router.get("/get-todo/:id", authVerify, TodoController.getTodoByID);
router.put("/update-todo/:id", authVerify, TodoController.updateTodo);
router.delete("/delete-todo/:id", authVerify, TodoController.deleteTodo);

// User
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/isLoggedIn", UserController.isLoggedIn);
router.get("/otp", UserController.otp);
router.get("/logout", authVerify, UserController.logout);
router.post("/change-password", authVerify, UserController.changePassword);
router.get("/getUsers", authVerify, async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({users});
  } catch (e) {
    res.status(500).json({message: "Something is wrong!"})
  }
});

export default router;
