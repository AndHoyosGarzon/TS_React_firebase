import { useUser } from "reactfire";
import {
  User,
  Mail,
  Calendar,
  Activity,
  MessageCircle,
  ClipboardCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { Suspense } from "react";

const DashboardPage = () => {
  const { data: user } = useUser();

  const stats = [
    {
      name: "Total Messages",
      value: "24",
      icon: MessageCircle,
      change: "+12%",
      changeType: "positive",
    },
    {
      name: "Active Tasks",
      value: "8",
      icon: ClipboardCheck,
      change: "+3",
      changeType: "positive",
    },
    {
      name: "Conversations",
      value: "6",
      icon: Users,
      change: "+2",
      changeType: "positive",
    },
    {
      name: "Profile Completion",
      value: "85%",
      icon: TrendingUp,
      change: "+15%",
      changeType: "positive",
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-6 bg-background min-h-screen">
      {/* Header Section */}
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-4">
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
            <h1 className="text-2xl font-semibold text-foreground mb-1">
              Welcome back, {user?.displayName || "Guest"}!
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{user?.email || "Not provided"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                  <p className="text-2xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Recent Activity
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                action: "Created new task",
                time: "2 hours ago",
                icon: ClipboardCheck,
              },
              {
                action: "Sent message to John",
                time: "4 hours ago",
                icon: MessageCircle,
              },
              { action: "Updated profile", time: "1 day ago", icon: User },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <activity.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "New Message", icon: MessageCircle, href: "/admin/chat" },
              { name: "Add Task", icon: ClipboardCheck, href: "/admin/tasks" },
              { name: "Edit Profile", icon: User, href: "/admin/profile" },
              { name: "View Stats", icon: TrendingUp, href: "/admin" },
            ].map((action) => (
              <button
                key={action.name}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-center"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <action.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {action.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
