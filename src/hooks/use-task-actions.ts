import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
//importamos todos los metodos que necesitamos para trabajar con las colleciones de la base de datos en firestore
import {
  collection,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import type { Task } from "@/schemas/taskSchema";

// crud=> Create, Read, Updated, Delete

export const useTaskActions = () => {
  //1- useUser => firebase trae la seccion del usuario
  const { data: user } = useUser();

  //2- usefirestore => este viene directamente de los hooks de react fire
  const db = useFirestore(); //esta constante tiene la configuracion de nuestro proyecto

  //referenciamos el nombre de la base de dtaos o collecion
  const taskCollectionRef = collection(db, "tasks");

  //query en firebase
  const tasksQuery = query(taskCollectionRef, where("userId", "==", user!.uid));

  //get  => crearemos a continuacion un observable de una base de datos en tiempo real con el sigueinte hook de reactfire
  const { status, data: tasks } = useFirestoreCollectionData(tasksQuery, {
    idField: "id",
    suspense: true,
  });

  //create => aca crearemos al funcionalida que nos permitira crear tareas en la base de datos
  //utilizaremos el metodo addDoc este crea automaticamente un ID en las colleciones de firebase
  const createTask = async (data: { title: string; description?: string }) => {
    const newTask = {
      ...data,
      completed: false,
      userId: user!.uid,
    };

    //retornamos la tarea creada en el metodo addDoc tiene que tener la referencia a la coleccion y despues la nueva tarea
    return await addDoc(taskCollectionRef, newTask);
  };

  //delete => nos permite eliminar un documento en especifico de una coleccion dependiendo el ID de la tarea
  const deleteTask = async (taskId: string) => {
    //utilizamos el metodo doc de firebase patra encontrar la tarea
    const taskDoc = doc(db, "tasks", taskId);
    //ahora retornamos y a la vez eliminamos con el metodo deleteDoc
    return await deleteDoc(taskDoc);
  };

  //update => este metodo nos permite actualizar una tarea
  const toggleTaskUpdate = async (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    //utilizamos el metodo doc de firebase para enciontrare la tarea
    const taskDoc = doc(db, "tasks", taskId);
    //ahora actualizamos al tarea con el siguiente metodo que es update y viene de firebase
    return await updateDoc(taskDoc, {
      complete: !task.complete,
    });
  };

  return {
    tasks: tasks as Task[],
    isLoading: status === "loading",

    createTask,
    deleteTask,
    toggleTaskUpdate,
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
