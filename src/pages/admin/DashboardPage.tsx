import { useAuth, useUser } from "reactfire";

const DashboardPage = () => {
  //hooks react-fire
  const auth = useAuth();

  const { data: user } = useUser();

  const handleCloseSectionWithGoogle = () => {
    auth.signOut();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-20 mt-20 border-1 border-amber-950 rounded-2xl p-5">
      <h1 className="font-bold text-3xl">Dashoard Page</h1>
      <p>Welcome, {user?.displayName || "Guest"}!</p>
      <p>Email: {user?.email || "Not provided"}</p>
      <button
        onClick={handleCloseSectionWithGoogle}
        className="btn btn-md bg-sky-600 hover:bg-sky-600/20"
      >
        Sign Up
      </button>
    </div>
  );
};

export default DashboardPage;
