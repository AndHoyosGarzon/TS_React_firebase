import { emailFriendSchema, type EmailZodSchemaType } from "@/lib/zodSchema";
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
import { Search } from "lucide-react";
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search friend by email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="mail@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Searching friend..." : <Search className="w-5 h-5" />}
        </Button>
      </form>
    </Form>
  );
};

export default FormSearchFriend;
