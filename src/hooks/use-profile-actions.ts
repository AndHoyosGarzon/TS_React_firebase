import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { useUser } from "reactfire";
import { useUserActions } from "./use-user-actions";

export const useProfileActions = () => {
  //react
  const [loading, setLoading] = useState(false);

  //taremos el hook de los usuarios para utilizarlo en el register
  const { createUpdateUser } = useUserActions();

  //data firestore
  const { data: user } = useUser();

  //1- update
  const updateUserProfile = async (data: {
    displayName?: string;
    photoUrl?: string;
  }) => {
    if (!user) {
      throw new Error("User is not authenticated");
    }

    setLoading(true);

    try {
      await updateProfile(user, {
        displayName: data.displayName || user.displayName,
        photoURL: data.photoUrl || user.photoURL,
      });

      createUpdateUser({ ...user, ...data });

      return {
        success: true,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    updateUserProfile,
  };
};
