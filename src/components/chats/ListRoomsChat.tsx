import { useRoomActions } from "@/hooks/use-rooms-actions";
import RoomChat from "./ButtonRoomChat";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const ListRoomsChat = ({ handleClickRoomId }: Props) => {
  //1- llamamos al hook de las rooms
  const { rooms } = useRoomActions();

  return (
    <div>
      {rooms.map((room) => (
        <RoomChat
          key={room.id}
          room={room}
          handleClickRoomId={handleClickRoomId}
        />
      ))}
    </div>
  );
};

export default ListRoomsChat;
