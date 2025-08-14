import useTaskActions from "@/hooks/use-task-actions";

const ListTask = () => {
  const { tasks } = useTaskActions();

  return <div>{JSON.stringify(tasks, null, 2)}</div>;
};

export default ListTask;
