import { useMessageActions } from "@/hooks/use-message-actions";

interface Props {
  roomId: string;
}

const MessagesChat = ({ roomId }: Props) => {
  //1- traemos nuestro hook
  const { messages } = useMessageActions(roomId);

  console.log(messages);

  return (
    <div>
      <h2>MessagesChat</h2>
      <pre>{JSON.stringify(messages, null, 20)}</pre>
    </div>
  );
};

export default MessagesChat;
