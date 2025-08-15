import { tasksSchema, type TasksZodShemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import useTaskActions from "@/hooks/use-task-actions";
import { toast } from "sonner";

const FormTasks = () => {
  //useTransition react funciona como una especie de observable de una promesa
  const [isPending, startTransition] = useTransition();

  //hook
  const { createTask } = useTaskActions();

  //react form
  const form = useForm<TasksZodShemaType>({
    resolver: zodResolver(tasksSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  //creamos funcion onsubmit
  const onSubmit = (data: TasksZodShemaType) => {
    //inicializamos el startTransition
    startTransition(async () => {
      try {
        await createTask(data);
        form.reset();
      } catch (error) {
        toast.error("Error create Task");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title task here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description task here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Creating task..." : "Create new task"}
        </Button>
      </form>
    </Form>
  );
};

export default FormTasks;
