import CardFooterAuth from "@/components/cardFooterAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthActions } from "@/hooks/use-auth-actions";

const RegisterPage = () => {


  //hook
  const {loading} = useAuthActions()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">Register</CardTitle>
        <CardDescription>
          Register to your account using email and password or with Google.
        </CardDescription>
      </CardHeader>
      <CardContent>....</CardContent>
      <CardFooterAuth type="Register" loading={loading} />
    </Card>
  );
};

export default RegisterPage;
