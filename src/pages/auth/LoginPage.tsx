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

const Loginpage = () => {
  const { loading } = useAuthActions();

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
