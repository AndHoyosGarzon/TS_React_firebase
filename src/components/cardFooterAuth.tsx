import { useAuthActions } from "@/hooks/use-auth-actions";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";
import { toast } from "sonner";
import { Mail } from "lucide-react";

interface Props {
  type: "Login" | "Register";
  loading: boolean;
}

const CardFooterAuth = ({ type, loading }: Props) => {
  //Hook
  const { loginWithGoole } = useAuthActions();

  //change text
  const isLogin = type === "Login";

  const handleLoginWithGoogle = async () => {
    const result = await loginWithGoole();
    if (result.success) {
      console.log("Login with google");
    } else {
      console.log("error login with google");
      toast.error("Error login with google");
    }
  };
  return (
    <CardFooter>
      <Button
        className="w-full"
        onClick={handleLoginWithGoogle}
        disabled={loading}
        variant={"default"}
      >
        <Mail className="mr-2" />
        {isLogin ? "Login with Google" : "Register with Google"}
      </Button>
    </CardFooter>
  );
};

export default CardFooterAuth;
