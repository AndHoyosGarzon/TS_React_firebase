import { Button } from "../../components/ui/button";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { useUser } from "reactfire";

const DashboardPage = () => {
  const { data: user } = useUser();

  //hook
  const { logout } = useAuthActions();

  console.log(user);

  return (
    <div>
      <h1 className="font-bold text-3xl">Dashoard Page</h1>
      <p>Welcome, {user!.displayName || "Guest"}!</p>
      <p>Email: {user!.email || "Not provided"}</p>
      <Button variant={"destructive"} onClick={logout}>
        Sign Up
      </Button>
    </div>
  );
};

export default DashboardPage;
