import { useFriendInfoActions } from "@/hooks/use-friend-info";
import type { Messages } from "@/schemas/roomSchema";
import { useUser } from "reactfire";

interface Props {
  message: Messages;
}

const MessageChat = ({ message }: Props) => {
  //  const {friend} = useFriendInfoActions()

  //aca tenemos el ID de la persona que esta en la seccion
  const { data: user } = useUser();

  //retorna un booleano si es o no la persona igual al que envio el mensaje
  const isFriend = user?.uid !== message.senderId;

  return (
    <div>
      <p>{message.text}</p>
      <p>{isFriend ? "Is other person" : user.email}</p>
    </div>
  );
};

export default MessageChat;
