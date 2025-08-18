import { useMessageActions } from "@/hooks/use-message-actions";
import { messagesSchema, type MessageZodSchemaType } from "@/lib/zodSchema";
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
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";

interface Props {
  roomId: string;
}

const FormMessageChat = ({ roomId }: Props) => {
  //useTransition()
  const [isLoading, startTransition] = useTransition();

  //hook
  const { sendMessage } = useMessageActions(roomId);

  //reactform
  const form = useForm<MessageZodSchemaType>({
    resolver: zodResolver(messagesSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (data: MessageZodSchemaType) => {
    startTransition(async () => {
      try {
        await sendMessage(data.text);
        form.reset();
      } catch (error) {
        toast.error("Error send message, please again this operation.");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Please enter your message here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Send..." : <Send />}
        </Button>
      </form>
    </Form>
  );
};

export default FormMessageChat;
