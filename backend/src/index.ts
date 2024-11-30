import express from "express";
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import tasksRouter from "./routes/tasks";
import dotenv from "dotenv";




const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use("/tasks", tasksRouter)
dotenv.config();

console.log("Database URL:", process.env.DATABASE_URL);
// Define routes
app.get("/", (req, res) => {
  res.send('test')
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
