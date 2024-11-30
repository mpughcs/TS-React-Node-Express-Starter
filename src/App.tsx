import { useEffect, useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  dueDate: string;
  createdAt: string;
}

function App() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:4000/tasks");
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const taskDeleteHandler = async (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    const response = await fetch(`http://localhost:4000/tasks/${id}`, {
      method: "DELETE",
    });
    console.log(response);
  };

  return (
    <div>
      <div className="flex justify-around gap-5 dark w-[80%] mx-auto flex-wrap">
        <div className="">
          <h1 className="text-3xl text-slate-200">To Do</h1>
          <TaskList
            tasks={tasks}
            onDelete={taskDeleteHandler}
            statusFilter="toDo"
          />
        </div>
        <div className="">
          <h1 className="text-3xl text-slate-200">Completed</h1>
          <TaskList
            tasks={tasks}
            onDelete={taskDeleteHandler}
            statusFilter="completed"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
