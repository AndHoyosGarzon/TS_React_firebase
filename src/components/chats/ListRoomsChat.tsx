import { useRoomActions } from "@/hooks/use-rooms-actions";
import { Button } from "../ui/button";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const ListRoomsChat = ({ handleClickRoomId }: Props) => {
  //1- llamamos al hook de las rooms
  const { rooms } = useRoomActions();

  return (
    <div>
      {rooms.map((room) => (
        <Button
          className="m-2 border-1 border-gray-700"
          variant={"secondary"}
          key={room.id}
          onClick={() => handleClickRoomId(room.id)}
        >
          {room.id}
        </Button>
      ))}
      <pre>{JSON.stringify(rooms, null, 2)}</pre>
    </div>
  );
};

export default ListRoomsChat;
