import { tasksSchema, type TasksZodShemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import useTaskActions from "@/hooks/use-task-actions";
import { toast } from "sonner";
import { Plus, Loader2, Type, FileText } from "lucide-react";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-foreground">
                  <Type className="w-4 h-4 text-primary" />
                  Title
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter task title..." 
                    className="bg-muted/50 border-muted-foreground/20 focus:border-primary focus:bg-background transition-colors"
                    {...field} 
                  />
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
                <FormLabel className="flex items-center gap-2 text-foreground">
                  <FileText className="w-4 h-4 text-primary" />
                  Description
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter task description..." 
                    className="bg-muted/50 border-muted-foreground/20 focus:border-primary focus:bg-background transition-colors"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button 
          type="submit" 
          className="w-full md:w-auto flex items-center gap-2" 
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating task...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Create new task
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormTasks;
