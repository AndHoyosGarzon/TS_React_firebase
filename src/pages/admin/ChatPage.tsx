import FormMessageChat from "@/components/chats/FormMessageChat";
import ListRoomsChat from "@/components/chats/ListRoomsChat";
import MessagesChat from "@/components/chats/MessagesChat";
import { Suspense, useState } from "react";

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");

  const handleClickRoomId = (id: string) => {
    setRoomId(id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <section className="bg-sky-300">
        {/* Mostrar las rooms */}
        <Suspense fallback={<div>Loading rooms here...</div>}>
          <ListRoomsChat handleClickRoomId={handleClickRoomId} />
        </Suspense>
      </section>
      <section className="bg-gray-600/40 overflow-y-scroll ">
        {/* Mostrar los mensajes */}
        {roomId ? (
          <Suspense fallback={<div>Loading messages here...</div>}>
            <FormMessageChat roomId={roomId} />
            <MessagesChat roomId={roomId} />
          </Suspense>
        ) : (
          <div>You don't have Messages...! plase select one room</div>
        )}
      </section>
    </div>
  );
};

export default ChatPage;
