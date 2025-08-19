import type { Messages } from "@/schemas/roomSchema";
import { useUser } from "reactfire";
import FriendEmail from "./FriendEmail";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

interface Props {
  message: Messages;
}

const MessageChat = ({ message }: Props) => {
  //aca tenemos el ID de la persona que esta en la seccion
  const { data: user } = useUser();

  //retorna un booleano si es o no la persona igual al que envio el mensaje
  const isFriend = user?.uid !== message.senderId;

  return (
    <div
      className={cn(
        "max-w-[150px] rounded-sm p-2",
        isFriend
          ? "bg-sky-400 ml-auto border-gray-700/20"
          : "bg-teal-400 border-2 border-gray-700/20"
      )}
    >
      <p>{message.text}</p>
      <p className="truncate text-xs text-gray-700 font-semibold">
        {isFriend ? (
          <Suspense fallback="......">
            <FriendEmail friendUID={message.senderId} />
          </Suspense>
        ) : (
          user.email
        )}
      </p>
    </div>
  );
};

export default MessageChat;
