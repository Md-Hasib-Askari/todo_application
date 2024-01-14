/*
 * This is the main file for initializing your server
 */
import { Express } from "express";

require("dotenv").config({
  path: "./.env",
});
import initializeApp from "./app";

const PORT: number = parseInt(process.env.PORT ?? "5000");
initializeApp.listen(PORT, () => {
  console.log(`Server running @ http://localhost:${PORT}`);
});
