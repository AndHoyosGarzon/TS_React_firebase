import { useMessageActions } from "@/hooks/use-message-actions";
import MessageChat from "./MessageChat";
import { MessageSquare } from "lucide-react";

interface Props {
  roomId: string;
}

const MessagesChat = ({ roomId }: Props) => {
  //1- traemos nuestro hook
  const { messages } = useMessageActions(roomId);

  return (
    <div className="flex flex-col gap-2 w-full p-4 min-h-full">
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground/50" />
            </div>
            <p className="text-sm font-medium mb-1">No messages yet</p>
            <p className="text-xs">Start the conversation!</p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((m) => (
            <MessageChat key={m.id} message={m} />
          ))}
          {/* Espaciador para que el último mensaje no quede pegado al formulario */}
          <div className="h-2" />
        </>
      )}
    </div>
  );
};

export default MessagesChat;
