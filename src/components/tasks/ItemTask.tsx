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
import { Trash2, CheckCircle, Circle, FileText, Loader2 } from "lucide-react";

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
    <Card className={cn(
      "border border-border bg-card hover:shadow-md transition-all duration-200",
      task.completed && "bg-muted/30"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <button
              onClick={handleUpdate}
              disabled={isPending}
              className={cn(
                "mt-1 transition-colors hover:scale-110 transform",
                task.completed ? "text-green-600" : "text-muted-foreground hover:text-primary"
              )}
            >
              {task.completed ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>
            <div className="flex-1">
              <CardTitle
                className={cn(
                  "text-lg font-semibold text-foreground transition-all",
                  task.completed && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </CardTitle>
              {task.description && (
                <div className="flex items-start gap-2 mt-2">
                  <FileText className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className={cn(
                    "text-sm text-muted-foreground",
                    task.completed && "line-through"
                  )}>
                    {task.description}
                  </p>
                </div>
              )}
            </div>
          </div>
          <CardAction>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isPending}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </Button>
          </CardAction>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ItemTask;
