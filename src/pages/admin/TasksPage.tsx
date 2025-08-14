import ListTask from "@/components/tasks/ListTask";
import { Suspense } from "react";

const TasksPage = () => {
  return (
    <div>
      <h1 className="text-2xl text-center font-semibold">Tasks</h1>
      {/* aca llamamos a suspence */}
      <Suspense fallback={<div>Loading Tasks...</div>}></Suspense>
      <ListTask />
    </div>
  );
};

export default TasksPage;
