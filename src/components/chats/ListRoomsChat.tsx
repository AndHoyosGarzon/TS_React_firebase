import { useRoomActions } from "@/hooks/use-rooms-actions";
import RoomChat from "./ButtonRoomChat";
import { Users } from "lucide-react";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const ListRoomsChat = ({ handleClickRoomId }: Props) => {
  //1- llamamos al hook de las rooms
  const { rooms } = useRoomActions();

  return (
    <div className="space-y-1">
      {rooms.length === 0 ? (
        <div className="p-6 text-center text-muted-foreground">
          <div className="mb-3 flex justify-center">
            <Users className="w-12 h-12 text-muted-foreground/50" />
          </div>
          <p className="text-sm font-medium mb-1">No conversations yet</p>
          <p className="text-xs">Search for a friend to start chatting!</p>
        </div>
      ) : (
        rooms.map((room) => (
          <RoomChat
            key={room.id}
            room={room}
            handleClickRoomId={handleClickRoomId}
          />
        ))
      )}
    </div>
  );
};

export default ListRoomsChat;
