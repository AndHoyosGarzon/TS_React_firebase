import FormMessageChat from "@/components/chats/FormMessageChat";
import FormSearchFriend from "@/components/chats/FormSearchFriend";
import ListRoomsChat from "@/components/chats/ListRoomsChat";
import MessagesChat from "@/components/chats/MessagesChat";
import { Suspense, useState } from "react";
import { MessageCircle, ArrowLeft, Users, Settings } from "lucide-react";

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");

  const handleClickRoomId = (id: string) => {
    setRoomId(id);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Lista de conversaciones */}
      <aside
        className={`
        ${roomId ? "hidden md:flex" : "flex"} 
        w-full md:w-80 border-r border-border bg-muted/30 flex-col
      `}
      >
        {/* Header del sidebar */}
        <div className="p-4 border-b border-border bg-background/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Chats</h2>
            </div>
            <div className="flex items-center gap-1">
              <button
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
              {roomId && (
                <button
                  onClick={() => setRoomId("")}
                  className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
                  aria-label="Back to chats"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          <Suspense
            fallback={
              <div className="text-sm text-muted-foreground">Loading...</div>
            }
          >
            <FormSearchFriend handleClickRoomId={handleClickRoomId} />
          </Suspense>
        </div>

        {/* Lista de rooms */}
        <div className="flex-1 overflow-y-auto">
          <Suspense
            fallback={
              <div className="p-4 text-sm text-muted-foreground">
                Loading rooms...
              </div>
            }
          >
            <ListRoomsChat handleClickRoomId={handleClickRoomId} />
          </Suspense>
        </div>
      </aside>

      {/* Área principal de chat */}
      <main
        className={`
        ${roomId ? "flex  h-full" : "hidden md:flex"} 
        flex-1 flex-col min-w-0
      `}
      >
        {roomId ? (
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center text-muted-foreground min-h-0">
                Loading messages...
              </div>
            }
          >
            {/* Header del chat en móvil */}
            <div className="md:hidden p-4 border-b border-border  flex items-center gap-3 ">
              <button
                onClick={() => setRoomId("")}
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Back to chats"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 flex-1">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Chat</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <button
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Chat options"
              >
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto p-4  min-h-0  ">
              <MessagesChat roomId={roomId} />
            </div>

            {/* Formulario de mensaje fijo en la parte inferior */}
            <div className="border-t border-border bg-background/80 backdrop-blur-sm p-4">
              <FormMessageChat roomId={roomId} />
            </div>
          </Suspense>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/10 min-h-0">
            <div className="text-center text-muted-foreground px-4">
              <div className="mb-4 flex justify-center">
                <MessageCircle className="w-16 h-16 text-muted-foreground/50" />
              </div>
              <p className="text-lg font-medium mb-2">Welcome to Chat</p>
              <p className="text-sm">
                Select a conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatPage;
