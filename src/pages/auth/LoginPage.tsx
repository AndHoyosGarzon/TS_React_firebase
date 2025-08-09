import CardFooterAuth from "@/components/cardFooterAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { useAuthActions } from "@/hooks/use-auth-actions";
//import react hook form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginZodSchema, type LoginZodSchema } from "@/lib/zodSchema";

const Loginpage = () => {
  const { loading } = useAuthActions();

  const form = useForm<LoginZodSchema>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  //tipamos la data que recibira desde login schema
  const onSubmit = (data: LoginZodSchema) => {};

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">Login</CardTitle>
        <CardDescription>
          Login to your account using email and password or with Google.
        </CardDescription>
      </CardHeader>
      <CardContent>....</CardContent>
      <CardFooterAuth type="Login" loading={loading} />
    </Card>
  );
};

export default Loginpage;
