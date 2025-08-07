import { Button } from "@/components/ui/button";
import { useAuthActions } from "../../hooks/use-auth-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { toast } from "sonner";

const Loginpage = () => {
  //import hooks
  const { loginWithGoole } = useAuthActions();

  const handleLoginWithGoogle = async () => {
    const result = await loginWithGoole();
    if (result.success) {
      console.log("Login with google");
    } else {
      console.log("error login with google");
      toast.error("Error login with google",  );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">Login</CardTitle>
        <CardDescription>
          Login to your account using email and password or with Google.
        </CardDescription>
      </CardHeader>
      <CardContent>....</CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleLoginWithGoogle}>
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Loginpage;
/* Estamos trabajando enla rama 02 tailwind aca en esta rama trabajaremos los estilos y en las otras ramas estamos trabajando la logica */
