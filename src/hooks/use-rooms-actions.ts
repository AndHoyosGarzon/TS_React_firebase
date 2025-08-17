import type { Room } from "@/schemas/roomSchema";
import { collection, query, where } from "firebase/firestore";
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
    suspense: true,//este suspense nos permite esperar hasta que se cumpla la peticion
    idField: "id",//creamos el campo para traer el id de la room
  });

  return {
    rooms: rooms as Room[]
  }
};
