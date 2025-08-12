import FormProfile from "@/components/profile/FormProfile";
import { useUser } from "reactfire";

const ProfilePage = () => {
  const { data: user } = useUser();

  if (!user) {
    return <div className="text-red-500">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <FormProfile user={user} />
    </div>
  );
};

export default ProfilePage;
