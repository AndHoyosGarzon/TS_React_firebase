import type { LastMessage, Messages } from "@/schemas/roomSchema";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useMessageActions = (roomId: string) => {
  //seccion del usuario
  const { data: user } = useUser();

  //1- hacemos el llamado a la basew de datos
  const db = useFirestore();

  //2- hacemos la referencia  primero a la collecion que almacena los mensajes y se llama "rooms"
  //ahora como tercer parametro le pasamos el ID de la room
  //y como cuarto parametro le pasamos el nombre de la subcoleccion
  const messagesRef = collection(db, "rooms", roomId, "messages");

  //3- ahora hacemos la query, y le decimos que lo ordene por linea de tiempo de forma ascendente
  const messagesQuery = query(messagesRef, orderBy("timeStamp", "asc")); //, orderBy("timestamp", "desc")

  //4- ahora extraemos la data que sale de la query === GET
  const { data: messages } = useFirestoreCollectionData(messagesQuery, {
    suspense: true,
    idField: "id",
  });

  const sendMessage = async (text: string) => {
    if (!user) throw new Error("useMessageActions:401");

    //este metodo nos lo proporciona firestore para crear marcas de tiempo en nuestra base de datos
    const timestamp = serverTimestamp();

    //crear mensaje
    const messageData: Omit<Messages, "id"> = {
      senderId: user.uid,
      text: text,
      timeStamp: timestamp,
    };

    //aqui agregamos un nuevo mensaje a la base de datos firestore database
    //await addDoc(messagesRef, messageData);

    //actualizar el ultimo mensaje en room necesitamos hacer lo siguiente
    //1- referenciar la sala
    const roomRef = doc(db, "rooms", roomId);
    //2- construimos el ultimo mensaje
    const lastMessage: LastMessage = {
      senderId: user.uid,
      text: text,
      timeStamp: timestamp,
    };
    //3- hacemos el update del documento con updateDoc()
    /* await updateDoc(roomRef, {
      lastMessage: lastMessage,
    }); */
    // tambien podemos ejecutar el metodo promise.all()
    // este metodo toma 2 o mas promesas que no dependan una de la otra y las ejecuta a la par
    // y hasta que estas no terminen este no devuelve nada
    await Promise.all([
      addDoc(messagesRef, messageData), //promesa 1 => esta crea
      updateDoc(roomRef, { lastMessage: lastMessage }), //promesa 2 => esta actualiza
    ]);
  };

  // retornamos los mensajes tipados
  return {
    messages: messages as Messages[],
    sendMessage,
  };
};
