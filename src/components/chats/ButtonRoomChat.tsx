import type { Room } from "@/schemas/roomSchema";
import { useUser } from "reactfire";
import { Button } from "../ui/button";
import FriendEmail from "./FriendEmail";
import { Suspense } from "react";

interface Props {
  room: Room;
  handleClickRoomId: (id: string) => void;
}

const RoomChat = ({ room, handleClickRoomId }: Props) => {
  const { data: user } = useUser();

  const friendUID = room.participants.find((id) => id !== user?.uid);

  return (
    <Button variant={"destructive"} onClick={() => handleClickRoomId(room.id)}>
      <Suspense fallback={<div>Loading messages...</div>}>
        {friendUID && <FriendEmail friendUID={friendUID} />}
      </Suspense>
    </Button>
  );
};

export default RoomChat;
