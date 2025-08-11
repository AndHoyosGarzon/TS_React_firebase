import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import type React from "react";
import {
  AuthProvider,
  FirestoreProvider,
  StorageProvider,
  useFirebaseApp,
} from "reactfire";

//habilitacion de hooks para firebase
interface Props {
  children: React.ReactNode;
}

const FirebaseServices = ({ children }: Props) => {
  // 1- para poder utilizar los servicios de firebase, tendremos que habilitar primero el APP
  //esto funciona por que ya tenemos el proveedor de firebase envolviendo todo nuestro proyecto en el main
  const app = useFirebaseApp();

  // 2- llamamos a firebse auth y se le pasa el app
  const auth = getAuth(app);

  //3- como tercer paso llamamos a firestore y le pasamos app
  const firestore = getFirestore(app);

  //4- ahora llamamos a storage y le pasamos el app
  const storage = getStorage(app);

  // 5- este es el ultimo paso donde llamamos a los siguientes 3 providers que necesitamos para
  //envolver nuestro children, y a cada uno de estos le pasamos el sdk que pertenece a las 3
  //variables anterior mente creadas como son auth, firesote, storage.
  //con esto nuestra app va a poder acceder a los hooks de nuestro servicio que nosotros tenemos activados
  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <StorageProvider sdk={storage}>{children}</StorageProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
};

export default FirebaseServices;
