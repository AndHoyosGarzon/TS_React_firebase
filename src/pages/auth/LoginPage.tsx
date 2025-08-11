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

//import form shadCn
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

//import hooks propios
import { useAuthActions } from "@/hooks/use-auth-actions";
//import react hook form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginZodSchema, type LoginZodSchema } from "@/lib/zodSchema";
import { toast } from "sonner";
//import toast

const Loginpage = () => {
  const { loading, login } = useAuthActions();

  const form = useForm<LoginZodSchema>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //tipamos la data que recibira desde login schema
  const onSubmit = async (data: LoginZodSchema) => {
    const response = await login(data);

    //validate data with zod
    if (!response.success) {
      if (response.error?.code === "auth/invalid-login-credentials") {
        toast.error("Invalid Email or Password");
        return;
      }
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
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="**********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loggin in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooterAuth type="Login" loading={loading} />
    </Card>
  );
};

export default Loginpage;
