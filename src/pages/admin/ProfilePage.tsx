import FormProfile from "@/components/profile/FormProfile";
import { useUser } from "reactfire";
import { User, Edit, Loader2, Shield, Mail, Calendar } from "lucide-react";
import { Suspense } from "react";

const ProfilePage = () => {
  const { data: user } = useUser();

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background min-h-screen">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background min-h-screen">
      {/* Header Section */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Suspense fallback={<div>Loading image ....</div>}>
                {user?.photoURL && (
                  <img
                    className="w-16 h-16 rounded-full  object-cover"
                    src={user.photoURL || ""}
                    alt="user"
                  />
                )}
              </Suspense>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-foreground">
                Profile Settings
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your account information and preferences
              </p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Secure</span>
            </div>
          </div>

          {/* User Info Summary */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-foreground">
                  {user.displayName || "No display name"}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Joined{" "}
                      {user.metadata.creationTime
                        ? new Date(
                            user.metadata.creationTime
                          ).toLocaleDateString()
                        : "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-6">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                Edit Profile
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Update your personal information
            </p>
          </div>

          <div className="p-6">
            <FormProfile user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
