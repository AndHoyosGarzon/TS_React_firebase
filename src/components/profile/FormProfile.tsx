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
import { User as UserIcon, Image, Save, Loader2 } from "lucide-react";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-foreground">
                  <UserIcon className="w-4 h-4 text-primary" />
                  Display Name
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your display name..." 
                    className="bg-muted/50 border-muted-foreground/20 focus:border-primary focus:bg-background transition-colors"
                    {...field} 
                  />
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
                <FormLabel className="flex items-center gap-2 text-foreground">
                  <Image className="w-4 h-4 text-primary" />
                  Photo URL
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://example.com/photo.jpg" 
                    className="bg-muted/50 border-muted-foreground/20 focus:border-primary focus:bg-background transition-colors"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormProfile;
