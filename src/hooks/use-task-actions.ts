import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
//importamos todos los metodos que necesitamos para trabajar con las colleciones de la base de datos en firestore
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import type { Task } from "@/schemas/taskSchema";

// crud=> Create, Read, Updated, Delete

export const useTaskActions = () => {
  //1- useUser => firebase trae la seccion del usuario
  const { data: user } = useUser();

  console.log(user?.uid)
  //2- usefirestore => este viene directamente de los hooks de react fire
  const db = useFirestore(); //esta constante tiene la configuracion de nuestro proyecto

  //referenciamos el nombre de la base de dtaos o collecion
  const taskCollectionRef = collection(db, "tasks");

  //query en firebase
  const tasksQuery = query(taskCollectionRef, where("userId", "==", user!.uid));

  //crearemos a continuacion un observable de una base de datos en tiempo real con el sigueinte hook de reactfire
  const { status, data: tasks } = useFirestoreCollectionData(tasksQuery, {
    idField: "id",
    suspense: true,
  });

  return {
    tasks: tasks as Task[],
    isLoading: status === "loading",
  };
};

export default useTaskActions;

/* 
Métodos clave

useUser: Hook de ReactFire para obtener el usuario autenticado.

useFirestore: Hook de ReactFire para acceder a la instancia de Firestore.

collection: Obtiene una referencia a una colección específica en Firestore.

query: Crea una consulta para filtrar documentos.

where: Filtra documentos según un campo específico.

useFirestoreCollectionData: Hook de ReactFire para obtener datos de una colección de Firestore con soporte para suspense y bases de datos en tiempo real.

addDoc: Agrega un nuevo documento a una colección.

deleteDoc: Elimina un documento específico.

doc: Obtiene una referencia a un documento específico en Firestore.

updateDoc: Actualiza un documento existente.
*/
