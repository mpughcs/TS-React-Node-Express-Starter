import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { json } from "stream/consumers";

const router = Router();
const prisma = new PrismaClient();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ error: "An error occurred while fetching tasks", message: error.message });
  }
});

// what would the endpoint look like for this?
// GET /tasks/1
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(405).json({ error: 'Must specify an id' })
  }

  try {
    const taskToReturn = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    })
    res.json(taskToReturn);
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ error: "An error occurred while fetching tasks", message: error.message });
  }
});

// Create a new task
router.post("/", async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  const task = await prisma.task.create({
    data: { title, description, dueDate: new Date(dueDate), status },
  });
  res.json(task);
});

// Update a task
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;
  const task = await prisma.task.update({
    where: { id: Number(id) },
    data: { title, description, dueDate: new Date(dueDate), status },
  });
  res.json(task);
});


//delete a task

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(405).json({ error: 'Must specify an id' })
  }
  try {
    const task = await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.json(task);
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ error: "An error occurred while deleting task", message: error.message });
  }
});

export default router;
