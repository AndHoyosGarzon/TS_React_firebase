import CardFooterAuth from "@/components/cardFooterAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthActions } from "@/hooks/use-auth-actions";

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
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterZodSchemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const RegisterPage = () => {
  //hook
  const { loading, register } = useAuthActions();

  //react-hook-form
  const form = useForm<RegisterZodSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      displayName: "",
      /*  password: "",
      confirmPassword: "", */
    },
  });

  //create onSubmit
  const onSubmit = async (data: RegisterZodSchemaType) => {
    const response = await register(data);
    if (response.error) {
      console.log(response.error.code);
      if (response.error.code === "auth/email-already-in-use") {
        toast.error("This email exist in Google.");
      } else {
        console.error("registration error: ", response.error);
      }
    } else {
      console.log("Registration successful", data);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">
          Register
        </CardTitle>
        <CardDescription>
          Register to your account using email and password or with Google.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
              {loading ? "Registering ..." : "Register"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooterAuth type="Register" loading={loading} />
    </Card>
  );
};

export default RegisterPage;
