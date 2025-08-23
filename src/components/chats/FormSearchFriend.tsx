import { emailFriendSchema, type EmailZodSchemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useRoomActions } from "@/hooks/use-rooms-actions";
import { toast } from "sonner";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const FormSearchFriend = ({ handleClickRoomId }: Props) => {
  //llamamos al useTransition
  const [isLoading, startTransition] = useTransition();

  //hook
  const { findOrCreateRoom } = useRoomActions();

  const form = useForm<EmailZodSchemaType>({
    resolver: zodResolver(emailFriendSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: EmailZodSchemaType) => {
    startTransition(async () => {
      const response = await findOrCreateRoom(data.email);

      if (response.success) {
        handleClickRoomId(response.roomId);
        toast.success("Search friend successfully...!");
        form.reset();
        return;
      }

      toast.error("Search friend error...!");
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input 
                    type="email" 
                    placeholder="Search by email..." 
                    className="pl-9 h-10 bg-background border-muted-foreground/20 focus:border-primary"
                    disabled={isLoading}
                    {...field} 
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full h-10" 
          disabled={isLoading || !form.watch('email')?.trim()}
          size="sm"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Searching...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              <span>Add Friend</span>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormSearchFriend;
