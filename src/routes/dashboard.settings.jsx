import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/focusflow/TopBar";
import { User, Shield, Bell, Camera, Loader2, Trash2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "@/lib/api";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "Settings — FocusFlow" }] }),
});

function SettingsPage() {
  const { user, checkAuth } = useAuth();
  const [updating, setUpdating] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || ""
    }
  });

  const onUpdateProfile = async (data) => {
    setUpdating(true);
    try {
      await api.put('/auth/profile', data);
      await checkAuth(); // refresh global user data
      toast.success("Profile updated successfully.");
    } catch (err) {
      toast.error("Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <TopBar title="Settings" subtitle="Personalize and secure your workspace." />
      
      <div className="glass rounded-3xl overflow-hidden border border-border/40 shadow-elegant mt-6">
        <Tabs defaultValue="profile" className="w-full flex flex-col md:flex-row h-full min-h-[500px]">
          
          {/* Left Sidebar for Tabs */}
          <div className="w-full md:w-64 bg-muted/10 border-b md:border-b-0 md:border-r border-border/40 p-4">
            <TabsList className="flex flex-col h-auto bg-transparent space-y-1 items-stretch">
              <TabsTrigger value="profile" className="justify-start gap-3 px-4 py-3 data-[state=active]:bg-background/80 data-[state=active]:shadow-sm rounded-xl text-left">
                <User className="h-4 w-4" /> Profile
              </TabsTrigger>
              <TabsTrigger value="account" className="justify-start gap-3 px-4 py-3 data-[state=active]:bg-background/80 data-[state=active]:shadow-sm rounded-xl text-left">
                <Shield className="h-4 w-4" /> Account & Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start gap-3 px-4 py-3 data-[state=active]:bg-background/80 data-[state=active]:shadow-sm rounded-xl text-left">
                <Bell className="h-4 w-4" /> Notifications
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Right Area Content */}
          <div className="flex-1 p-6 md:p-10 bg-background/20">
            
            {/* PROFILE TAB */}
            <TabsContent value="profile" className="m-0 outline-none space-y-8">
              <div>
                <h3 className="text-xl font-display font-semibold">Public Profile</h3>
                <p className="text-sm text-muted-foreground mt-1">Update how your workspace presence looks to others.</p>
              </div>

              <div className="flex items-center gap-6 pb-6 border-b border-border/30">
                <div className="relative group cursor-pointer">
                  <div className="h-20 w-20 rounded-full bg-aurora grid place-items-center text-2xl font-semibold text-background shadow-lg transition-transform group-hover:scale-105">
                    {user?.name ? user.name[0].toUpperCase() : "?"}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <button 
                    onClick={() => toast.info("Avatar upload simulation activated.")}
                    className="text-sm font-medium bg-muted/50 hover:bg-muted px-4 py-2 rounded-lg transition-colors border border-border/60 shadow-sm">
                    Upload new picture
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6 max-w-xl">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Name</label>
                  <input 
                    {...register("name")}
                    className="w-full bg-background border border-border/60 rounded-xl px-4 py-2.5 text-sm shadow-sm outline-none focus:border-primary/50" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input 
                    value={user?.email || ""}
                    disabled
                    className="w-full bg-muted/40 border border-border/40 rounded-xl px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <textarea 
                    {...register("bio")}
                    rows={3}
                    placeholder="A quick snippet about you..."
                    className="w-full bg-background border border-border/60 rounded-xl px-4 py-2.5 text-sm shadow-sm outline-none focus:border-primary/50 resize-none" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={updating}
                  className="bg-foreground text-background font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-foreground/90 transition shadow-lg shadow-foreground/10 flex items-center gap-2"
                >
                  {updating && <Loader2 className="h-3 w-3 animate-spin" />}
                  Save Changes
                </button>
              </form>
            </TabsContent>

            {/* SECURITY TAB */}
            <TabsContent value="account" className="m-0 outline-none space-y-8">
              <div>
                <h3 className="text-xl font-display font-semibold">Password & Security</h3>
                <p className="text-sm text-muted-foreground mt-1">Keep your credentials updated and sessions tracked.</p>
              </div>

              <div className="glass rounded-2xl p-6 border border-border/50 space-y-4 max-w-xl">
                <h4 className="text-sm font-semibold">Change Password</h4>
                <input type="password" placeholder="Current password" className="w-full bg-background border border-border/60 rounded-xl px-4 py-2 text-sm" />
                <input type="password" placeholder="New password" className="w-full bg-background border border-border/60 rounded-xl px-4 py-2 text-sm" />
                <button 
                   onClick={() => toast.success("Password changed (simulation).")}
                   className="bg-foreground text-background text-xs font-semibold px-4 py-2 rounded-lg hover:bg-foreground/90 transition">
                  Update Password
                </button>
              </div>

              <div className="pt-6 border-t border-border/40">
                <h3 className="text-lg font-display font-semibold text-red-500">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">Irreversible actions concerning your workspace.</p>
                <button 
                  onClick={() => toast.error("Confirm identity before deleting.")}
                  className="border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Trash2 className="h-4 w-4" /> Delete Account
                </button>
              </div>
            </TabsContent>

            {/* NOTIFICATIONS TAB */}
            <TabsContent value="notifications" className="m-0 outline-none space-y-8">
              <div>
                <h3 className="text-xl font-display font-semibold">Notification Center</h3>
                <p className="text-sm text-muted-foreground mt-1">Manage alerts, system notifications, and emails.</p>
              </div>

              <div className="space-y-4 max-w-md">
                {[
                  { title: "Push Notifications", desc: "Enabled in-browser alerts." },
                  { title: "Task Reminders", desc: "Remind before active windows close." },
                  { title: "Weekly Wrap-up", desc: "Receive productivity recap via email." }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-muted/10 border border-border/40 rounded-2xl">
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="h-5 w-10 rounded-full bg-primary/90 relative cursor-pointer">
                      <div className="absolute right-0.5 top-0.5 h-4 w-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

          </div>
        </Tabs>
      </div>
    </div>
  );
}

