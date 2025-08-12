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
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileZodSchemaType } from "@/lib/zodSchema";
import { useProfileActions } from "@/hooks/use-profile-actions";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import type { User } from "firebase/auth";

interface Props {
  user: User;
}

const FormProfile = ({ user }: Props) => {
  //react form
  const form = useForm<ProfileZodSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      photoUrl: user?.photoURL || undefined,
    },
  });

  //navigate
  const navigate = useNavigate();

  //hook
  const { loading, updateUserProfile } = useProfileActions();

  //function submit
  const onSubmit = async (data: ProfileZodSchemaType) => {
    const { success } = await updateUserProfile(data);

    if (!success) {
      toast.error("Error updating profile user");
    }
    toast.success("Update profile user successfully");

    success && navigate("/admin");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input placeholder="Username here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo Url</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/photo.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FormProfile;
