import { useAuthActions } from "@/hooks/use-auth-actions";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { Link } from "react-router";

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
    <CardFooter className="flex flex-col items-center gap-4">
      <Button
        className="w-full"
        onClick={handleLoginWithGoogle}
        disabled={loading}
        variant={"outline"}
      >
        <Mail className="mr-2" />
        {isLogin ? "Login with Google" : "Register with Google"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {isLogin ? "Don't have an account? " : " Already have an account? "}
        <Link to={isLogin ? "/auth/register" : "/auth/login"}>
          <Button
            variant={"link"}
            className="p-0 h-auto font-normal cursor-pointer"
          >
            {isLogin ? "Register" : "Sign in"}
          </Button>
        </Link>
      </p>
    </CardFooter>
  );
};

export default CardFooterAuth;
