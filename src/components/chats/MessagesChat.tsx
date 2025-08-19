import { useMessageActions } from "@/hooks/use-message-actions";
import MessageChat from "./MessageChat";

interface Props {
  roomId: string;
}

const MessagesChat = ({ roomId }: Props) => {
  //1- traemos nuestro hook
  const { messages } = useMessageActions(roomId);

  return (
    <div className="flex flex-col gap-4 w-full px-2">
      {messages.map((m) => (
        <MessageChat key={m.id} message={m} />
      ))}
      {/* <pre>{JSON.stringify(messages, null, 20)}</pre> */}
    </div>
  );
};

export default MessagesChat;
