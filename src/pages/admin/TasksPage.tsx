import FormTasks from "@/components/tasks/FormTasks";
import ListTask from "@/components/tasks/ListTask";
import { Suspense } from "react";
import { ClipboardCheck, Plus, Loader2 } from "lucide-react";

const TasksPage = () => {
  return (
    <div className="flex-1 bg-background min-h-screen">
      {/* Header Section */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Tasks</h1>
              <p className="text-sm text-muted-foreground">Manage your tasks and stay organized</p>
            </div>
          </div>
          
          {/* Form Section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Plus className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Add New Task</h2>
            </div>
            <FormTasks />
          </div>
        </div>
      </div>

      {/* Tasks List Section */}
      <div className="p-6">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Your Tasks</h2>
            <p className="text-sm text-muted-foreground mt-1">Keep track of your progress</p>
          </div>
          
          <div className="p-6">
            <Suspense 
              fallback={
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Loading tasks...</span>
                  </div>
                </div>
              }
            >
              <ListTask />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
