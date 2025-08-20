import type { Room } from "@/schemas/roomSchema";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

//aca utilizamos todo el esquema de interfaces que creamos anterior mente para este hook

//estas nos permitiran crear mensajes entre ususarios en la base de datos de firestore
export const useRoomActions = () => {
  //1-lo primero que hacemos es llamar a la base de datos que en este caso se llama rooms
  //por medio del metodo useFirestore de reactfire
  const db = useFirestore();

  //2-aca traemos la informacion del usuario actual
  //lo hacemos con el metodo useAuth() de reactfire
  const { data: user } = useUser();

  //3-ahora hacemos la referencia a la base de datos con la que trabajaremos en este caso en rooms
  //por medio del metodo collection(db, "rooms") de firebase/firestore, este metodo recibe la coneccion con la base de datos
  //y el nombre de esta en este caso es rooms
  const roomRef = collection(db, "rooms");

  //4-cuando ya tenemos la referencia, hacemos la query de la siguiente forma
  //utilizando el metodo query() de firestore/firebase, este metodo recibe la referencia y necesita trabajar con el siguiente metodo
  //where() =>  por medio de este hacemos una consulta simple para localizar un dato especifico
  const roomQuery = query(
    roomRef,
    where("participants", "array-contains", user?.uid)
  );

  //5- finalizamos extrayendo la data de la seccion pero con el siguiente metodo
  //useFirestoreCollectionData() => este metodo nos permite extraer los datos de una collecion
  const { data: rooms } = useFirestoreCollectionData(roomQuery, {
    suspense: true, //este suspense nos permite esperar hasta que se cumpla la peticion
    idField: "id", //creamos el campo para traer el id de la room
  });

  //6- recibiremos un email y esta funcion busca y retorna el UID del cliente
  const searchuserWithEmail = async (email: string) => {
    //esta funcion crea la referencia a la collecion en este caso users
    const userRef = collection(db, "users");

    //esta funcion es la que crea como tal la query como en las bases de datos relacionales
    const q = query(userRef, where("email", "==", email));

    //esta funcion es la que hace la peticion
    const querySnapshot = await getDocs(q);

    //valida si esta vacion con su metodo empty
    if (querySnapshot.empty) {
      return null;
    }

    // en caso de que tenga datos almacenamos el array en la posicion 0
    const doc = querySnapshot.docs[0];

    //aca estamos retornando los datos encontrados pero con el metodo .data()
    return doc.data();
  };

  //7- crearemos un metodo que verifique si el usuario seleccionado ya tiene una sala de chat
  //o de lo contrario si no tiene crearemos una sala
  const findOrCreateRoom = async (friendEmail: string) => {
    //primero verificamos si el usuario tiene seccion activa
    if (!user) {
      return {
        success: false,
        message: "401 not Authorized",
        roomId: null,
      };
    }

    //preguntamos el user userEmail es igual a friendEmail
    if (user.email === friendEmail) {
      return {
        success: false,
        message: "400 Not found",
        roomId: null,
      };
    }

    //buscamos por email con la funcion creada en el paso 6 de este hook
    const friend = await searchuserWithEmail(friendEmail);

    //validamos si no existe el friend
    if (!friend) {
      return {
        success: false,
        message: "404 user not found",
        roomId: null,
      };
    }

    //ahora buscamos en la sala
    const existRoom = rooms.find((room) =>
      room.participants.find((uid: string) => uid === friend.uid)
    );

    //validamos si existe la sala y de ser asi la retornamos
    if (existRoom) {
      return {
        success: true,
        message: "200 Search room successfully",
        roomId: existRoom.id,
      };
    }

    //en caso de que no exista la crearemos a continuacion
    const newRoom: Omit<Room, "id"> = {
      createAt: serverTimestamp(), //este metodo crea la marca de tiempo
      lastMessage: null, //al crear esta sala no tenemos mensajes por ende esta en cero
      participants: [friend.uid, user.uid], //aca inyectamos los usuarios que crearan la sala uno de ellos
      //es el que esta en la seccion y el otro es el que se le hara click cuando seleccionesmos en la UI
    };

    //ahora que ya tenemos el objeto creado lo anadiremos a la base de datos
    //este metodo lo primero que recibe es la referencia a la collecion y despues le pasamos los datos de la nueva sala
    const docRef = await addDoc(roomRef, newRoom);
    return {
      success: true,
      message: "201 New room created successfully",
      roomId: docRef.id,
    };
  };

  return {
    rooms: rooms as Room[],
    findOrCreateRoom,
  };
};
