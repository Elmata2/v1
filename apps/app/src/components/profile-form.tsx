import { useState } from "react";
import { createClient } from "@v1/supabase/client";
import { Button } from "@v1/ui/button";
import { Input } from "@v1/ui/input";
import React from "react";

interface User {
  id: string;
  user_metadata: {
    full_name: string;
  };
}

export function ProfileForm({ user }: { user: User }) {
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || "");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const supabase = createClient();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      // Use updateUser to update the user's full_name and metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          bio,
          interests,
        },
      });

      if (error) throw error;
      // Handle successful profile update (e.g., show a success message)
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
        <Input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
        <Input
          id="bio"
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="interests" className="block text-sm font-medium text-gray-700">Interests (comma-separated)</label>
        <Input
          id="interests"
          type="text"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />
      </div>
      <Button type="submit">Update Profile</Button>
    </form>
  );
}
