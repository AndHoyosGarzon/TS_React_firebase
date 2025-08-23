import useTaskActions from "@/hooks/use-task-actions";
import ItemTask from "./ItemTask";
import { ClipboardCheck, CheckCircle2 } from "lucide-react";

const ListTask = () => {
  const { tasks } = useTaskActions();

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <ClipboardCheck className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No tasks yet</h3>
        <p className="text-sm text-muted-foreground">
          Create your first task to get started and stay organized!
        </p>
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="space-y-6">
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ClipboardCheck className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Pending Tasks ({pendingTasks.length})
            </h3>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <ItemTask key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-foreground">
              Completed Tasks ({completedTasks.length})
            </h3>
          </div>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <ItemTask key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListTask;
