import { useEffect, useState } from "react";
import { createClient } from "@v1/supabase/client";
import { ProfileForm } from "@/components/profile-form";
import { User } from "@supabase/supabase-js"; // Ensure this is the correct import for the User type

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null); // Specify the type explicitly
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } else {
        setUser(data?.user ?? null); // Ensure data.user is correctly handled
      }
    };
    fetchUser();
  }, [supabase]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Profile</h1>
      <ProfileForm user={user as any} />
    </div>
  );
}
