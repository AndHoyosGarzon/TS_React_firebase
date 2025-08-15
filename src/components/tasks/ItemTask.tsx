import useTaskActions from "@/hooks/use-task-actions";
import type { Task } from "@/schemas/taskSchema";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  task: Task;
}

const ItemTask = ({ task }: Props) => {
  //hook
  const { deleteTask, toggleTaskUpdate } = useTaskActions();

  //useTransition react
  const [isPending, startTransition] = useTransition();

  //handleDelete
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteTask(task.id);
      } catch (error) {
        toast.error("Error delete task");
      }
    });
  };

  //hanldeUpdate
  const handleUpdate = () => {
    startTransition(async () => {
      try {
        await toggleTaskUpdate(task.id);
        console.log("clik update", task.completed);
      } catch (error) {
        toast.error("Error update task");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={cn(
            "text-lg font-semibold",
            task.completed && "line-through text-gray-500"
          )}
        >
          {task.title}
        </CardTitle>
        <CardAction className="space-x-2">
          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={isPending}
          >
            Delete
          </Button>
          <Button
            variant={"outline"}
            onClick={handleUpdate}
            disabled={isPending}
          >
            Update
          </Button>
        </CardAction>
      </CardHeader>
      {task.description && <CardContent>{task.description}</CardContent>}
    </Card>
  );
};

export default ItemTask;
