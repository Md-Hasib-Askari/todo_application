/*
 * Add all your Routes here and export them
 */
import { Request, Response } from "express";
const router = require("express").Router();
const TodoController = require("../Controllers/TodoController");

// Test
router.get("/", (req: Request, res: Response) => {
  res.send("Hello Express JS");
});

// Create
router.post("/add-todo", TodoController.createTodo);

// Read
router.get("/get-todo", TodoController.getTodos);
router.get("/get-todo/:id", TodoController.getTodoByID);

// Update
router.put("/update-todo/:id", TodoController.updateTodo);

// Delete
router.delete("/delete-todo/:id", TodoController.deleteTodo);

export default router;
