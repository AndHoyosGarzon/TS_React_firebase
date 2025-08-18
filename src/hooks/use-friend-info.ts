import type { UserFirestore } from "@/schemas/userSchema";
import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";

export const useFriendInfoActions = (friendUID: string) => {
  //1- hacemos la consulta de la base de datos
  const db = useFirestore();

  //2- Ahora hacemos la referencia solo a un unico documento
  //esta funcion lo que hace es que busca en la base de datos el documento que coinsida con un UID especifico
  const friendRef = doc(db, "users", friendUID);

  //3- ahora para poder obtrener la data ocupamos la siguiente funcionalidad de firestore
  const { data: friend } = useFirestoreDocData(friendRef, {
    suspense: true,
  });

  return {
    friend: friend as UserFirestore,
  };
};
