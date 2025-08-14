import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { useUser } from "reactfire";

export const useProfileActions = () => {
  //react
  const [loading, setLoading] = useState(false);

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
