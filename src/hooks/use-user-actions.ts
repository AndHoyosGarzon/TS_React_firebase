import type { UserFirestore } from "@/schemas/userSchema";
import type { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useFirestore } from "reactfire";

//metodos que nos crean los usuarios y los almacena en la base de datos  de react fire
export const useUserActions = () => {
  //1- hacemos un llamado a la referecnai de la base de datos en react fire
  const db = useFirestore();

  //2- creamos un nuevo metodo que nos permita actualizar un nuevo usuario
  const createUpdateUser = async (user: User) => {
    //al tipar el usuario de esta forma automaticamente nos trae la seccion del usuario
    if (!user) throw new Error("User not available");

    //hacemos referencia del documento en firestores
    const userDocRef = doc(db, "users", user.uid); //este id viene de la seccion que nosotros le estamos enviando a firestore

    //creamos la data del usuario ya que no tenemos la data en este caso podemos crear una interface
    const userData: UserFirestore = {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      photoUrl: user.photoURL || "",
    };

    //ahora retornamos los datos con el siguiente metodo
    //setDoc = este recive la referencia, y la data del nuevo usuario 
    //y aparte hay que darle una configuracion por que este metodo nos va a permitir crear y actualizar
    return await setDoc(userDocRef, userData, {
        merge: true// este metodo nos permite que en caso de que no exista el usuario lo crea
        //y si el usuario esta actualizando el displayName, solo actualiza ese campo y no hace nada mas 
    });
  };



  return {
    createUpdateUser
  }
};
