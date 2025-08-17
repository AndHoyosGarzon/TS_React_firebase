import { useMessageActions } from "@/hooks/use-message-actions";

interface Props {
  roomId: string;
}

const MessagesChat = ({ roomId }: Props) => {
  //1- traemos nuestro hook
  const { messages } = useMessageActions(roomId);

  return (
    <div>
      <h2 className="text-center my-2 font-bold text-2xl ">MessagesChat</h2>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </div>
  );
};

export default MessagesChat;
