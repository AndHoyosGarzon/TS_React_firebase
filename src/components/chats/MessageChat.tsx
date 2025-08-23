import type { Messages } from "@/schemas/roomSchema";
import { useUser } from "reactfire";
import FriendEmail from "./FriendEmail";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Check, CheckCheck, Clock, User } from "lucide-react";

interface Props {
  message: Messages;
}

const MessageChat = ({ message }: Props) => {
  //aca tenemos el ID de la persona que esta en la seccion
  const { data: user } = useUser();

  //retorna un booleano si es o no la persona igual al que envio el mensaje
  const isFriend = user?.uid !== message.senderId;

  return (
    <div className={cn("flex w-full mb-2", isFriend ? "justify-start" : "justify-end")}>
      <div className={cn("flex flex-col max-w-[70%] sm:max-w-[60%]", isFriend ? "items-start" : "items-end")}>
        {/* Burbuja del mensaje */}
        <div
          className={cn(
            "rounded-2xl px-4 py-2 shadow-sm",
            isFriend
              ? "bg-muted text-foreground rounded-tl-md"
              : "bg-primary text-primary-foreground rounded-tr-md"
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
        </div>
        
        {/* Información del remitente */}
        <div className={cn("flex items-center gap-2 mt-1 px-2", isFriend ? "justify-start" : "justify-end")}>
          <div className={cn("flex items-center gap-1", isFriend ? "flex-row" : "flex-row-reverse")}>
            <div className="flex items-center gap-1">
              {isFriend ? (
                <User className="w-3 h-3 text-muted-foreground" />
              ) : (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">12:34</span>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isFriend ? (
                <Suspense fallback="...">
                  <FriendEmail friendUID={message.senderId} />
                </Suspense>
              ) : (
                "You"
              )}
            </p>
            {/* Estado del mensaje para mensajes propios */}
            {!isFriend && (
              <div className="flex items-center">
                <CheckCheck className="w-3 h-3 text-blue-500" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageChat;
