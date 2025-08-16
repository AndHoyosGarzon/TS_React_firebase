import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import type { AuthError } from "firebase/auth";

import { useState } from "react";
import { useAuth } from "reactfire";
import { useUserActions } from "./use-user-actions";

//create interface
interface AuthActionResponse {
  success: boolean;
  error: AuthError | null;
}

export const useAuthActions = () => {
  //1 creamos un estado local
  const [loading, setLoading] = useState(false);

  //taremos el hook de los usuarios para utilizarlo en el register
  const {createUpdateUser} = useUserActions()

  //traemos el Auth
  const auth = useAuth();

  //2 creamos el login
  const login = async (data: {
    email: string;
    password: string; //tipamos el tipo de accion en este caso es una promesa
  }): Promise<AuthActionResponse> => {
    setLoading(true);
    try {
      //utilizamos el metodo de google
      await signInWithEmailAndPassword(auth, data.email, data.password);
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setLoading(false);
    }
  };

  //3-registramos el usuario
  const register = async (data: {
    email: string;
    password: string;
    displayName: string;
  }): Promise<AuthActionResponse> => {
    setLoading(true);
    try {
      const currentUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      //update profile
      if (currentUser.user) {
        await updateProfile(currentUser.user, {
          displayName: data.displayName,
        });

        //aca utilizamos el hook de los usuarios y enviamos la informacion
        // para que se cree los datos en la base de datos de firestore cada vez que se registre
        await createUpdateUser(currentUser.user)

        //forzamos una recarga nuevamente del usuario para poder cargar sus datos en el frontend
        await currentUser.user.reload();
      }
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setLoading(false);
    }
  };

  //4- login with google
  const loginWithGoole = async (): Promise<AuthActionResponse> => {
    setLoading(true);
    try {
      //utilizamos una nueva instancia del metodo GoogleAuthprovider
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);

      //aca otra vez podemos utilizar los datos del usuario para crearlo en la base de datos de ser necesario
      await createUpdateUser(data.user)

      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setLoading(false);
    }
  };

  //5- logout cerramos seccion
  const logout = async (): Promise<AuthActionResponse> => {
    setLoading(true);
    try {
      await signOut(auth);
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setLoading(false);
    }
  };

  // retornamos todos los metodos
  return {
    loading,
    login,
    register,
    loginWithGoole,
    logout,
  };
};
