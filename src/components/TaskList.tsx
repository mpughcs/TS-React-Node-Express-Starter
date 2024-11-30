// import { useEffect } from "react";
import TaskItem from "./TaskItem";
import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import Draggable from "./Draggable";
import Droppable from "./Droppable";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  dueDate: string;
  createdAt: string;
}

const TaskList: React.FC<{
  tasks: Task[];
  statusFilter?: "toDo" | "completed";
  onDelete: (id: number) => void;
}> = ({ statusFilter, tasks, onDelete }) => {
  return (
    <DndContext>
      <div className="mb-[50px]">
        {tasks
          .filter((task) =>
            statusFilter ? task.status === statusFilter : true
          )
          .map((task) => (
            <TaskItem key={task.id} task={task} onDelete={onDelete} />
          ))}
      </div>
    </DndContext>
  );
};

export default TaskList;

