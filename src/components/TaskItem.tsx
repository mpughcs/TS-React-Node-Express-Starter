import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@/components/ui/label";
interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  dueDate: string;
}

const TaskItem: React.FC<{ task: Task; onDelete: (id: number) => void }> = ({
  task,
  onDelete,
}) => {
  return (
    <Card className="w-[350px] relative h-[250px] my-5">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      {/* <h3 className="text-xl font-bold ">{task.title}</h3> */}
      <CardContent>
        <h4 className="text-sm absolute top-5 right-5">
          {new Date(task.dueDate).toLocaleDateString()}
        </h4>
        <Button
          className="absolute bottom-5 right-5"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
