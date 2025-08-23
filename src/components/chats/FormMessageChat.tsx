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
import { Send, Loader2 } from "lucide-react";
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-2">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Type a message..."
                  className="min-h-[44px] rounded-full px-4 bg-muted/50 border-muted-foreground/20 focus:border-primary focus:bg-background transition-colors resize-none"
                  disabled={isLoading}
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !form.watch('text')?.trim()}
          size="icon"
          className="rounded-full h-[44px] w-[44px] flex-shrink-0"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormMessageChat;
