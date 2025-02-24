import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
const app: Application = express();
// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
export default app;
