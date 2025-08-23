import type { Room } from "@/schemas/roomSchema";
import { useUser } from "reactfire";
import FriendEmail from "./FriendEmail";
import { Suspense } from "react";
import { User, MessageSquare, Clock } from "lucide-react";

interface Props {
  room: Room;
  handleClickRoomId: (id: string) => void;
}

const RoomChat = ({ room, handleClickRoomId }: Props) => {
  const { data: user } = useUser();

  const friendUID = room.participants.find((id) => id !== user?.uid);

  return (
    <button 
      onClick={() => handleClickRoomId(room.id)}
      className="w-full text-left p-3 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-b-0 focus:outline-none focus:bg-muted/70"
    >
      <div className="flex items-center space-x-3">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 relative">
          <User className="w-5 h-5 text-primary" />
          {/* Indicador de estado online */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
        </div>
        
        {/* Conversation info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground truncate">
              <Suspense fallback={<span className="text-muted-foreground">Loading...</span>}>
                {friendUID && <FriendEmail friendUID={friendUID} />}
              </Suspense>
            </p>
            <div className="flex items-center gap-1 ml-2">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">now</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              <span>Tap to open conversation</span>
            </p>
            {/* Badge de mensajes no leídos */}
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default RoomChat;
